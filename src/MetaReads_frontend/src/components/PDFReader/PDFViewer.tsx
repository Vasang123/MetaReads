import React, { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { highlightPlugin, Trigger } from "@react-pdf-viewer/highlight";
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen";
import { searchPlugin } from "@react-pdf-viewer/search";
import { CircularProgress } from "@mui/material";
import { CardStack } from "../ui/card-stack";

interface PDFViewerProps {
  fileUrl: string;
  onDocumentLoad: () => void;
  cards: any;
  setCards: React.Dispatch<React.SetStateAction<any[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedText: string | undefined;
  setSelectedText: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  fileUrl,
  onDocumentLoad,
  cards,
  setCards,
  loading,
  setLoading,
  selectedText,
  setSelectedText,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [pageInput, setPageInput] = useState<number>(1);
  const searchPluginInstance = searchPlugin();
  const fullScreenPluginInstance = fullScreenPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const zoomPluginInstance = zoomPlugin({ enableShortcuts: false });
  const highlightPluginInstance = highlightPlugin({
    trigger: Trigger.TextSelection,
    renderHighlightTarget: ({ toggle, selectedText }) => {
      setSelectedText(selectedText);
      return (
        <div
          style={{
            position: "fixed",
            top: 60,
            right: 20,
            zIndex: 9999,
          }}
          onClick={toggle}
        >
          <span style={{ color: "black" }}>
            <button
              onClick={() => {
                if (selectedText && !loading) {
                  // Call summarize function passed from props
                }
              }}
            >
              {loading ? "Summarizing..." : "Summarize"}
            </button>
          </span>
        </div>
      );
    },
  });

  const handleZoom = (scale: number) => {
    setZoomLevel(scale);
    zoomPluginInstance.zoomTo(scale);
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const pageNumber = parseInt(value, 10);
    setPageInput(pageNumber);
  };

  useEffect(() => {
    if (pageInput !== undefined) {
      pageNavigationPluginInstance.jumpToPage(pageInput);
    }
  }, [pageInput]);

  return (
    <div className="flex-grow overflow-auto">
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
      >
        <Viewer
          theme={"dark"}
          fileUrl={fileUrl}
          onDocumentLoad={onDocumentLoad}
          plugins={[
            pageNavigationPluginInstance,
            zoomPluginInstance,
            highlightPluginInstance,
            fullScreenPluginInstance,
            searchPluginInstance,
          ]}
        />
      </Worker>
      {cards.length > 0 && (
        <div className="fixed bottom-2 right-4 z-10 flex items-center justify-center">
          {loading ? <CircularProgress /> : <CardStack items={cards} />}
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
