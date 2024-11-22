import React from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { pdfjs } from "react-pdf";
import { CurrentPageLabelProps } from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";
import {
  EnterFullScreenProps,
  FullScreenIcon,
  RenderEnterFullScreenProps,
} from "@react-pdf-viewer/full-screen";
import "@react-pdf-viewer/full-screen/lib/styles/index.css";
import {
  RenderShowSearchPopoverProps,
  ShowSearchPopoverProps,
} from "@react-pdf-viewer/search";
import { SearchIcon } from "@react-pdf-viewer/search";
import "@react-pdf-viewer/search/lib/styles/index.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import InputField from "../Form/Input/TextField/InputField";
import { useNavigate } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

const Zoom = ({
  zoomLevel,
  handleZoom,
}: {
  zoomLevel: number;
  handleZoom: (scale: number) => void;
}) => (
  <div className="mx-2 flex items-center">
    <div className="flex items-center">
      <FormControl size="small">
        <InputLabel id="demo-simple-select-helper-label">Zoom</InputLabel>
        <Select
          value={zoomLevel}
          onChange={(e: any) => handleZoom(Number(e.target.value))}
        >
          {[0.5, 1, 1.5, 2, 2.5, 3].map((scale) => (
            <MenuItem key={scale} value={scale}>
              {scale === 1 ? "100%" : `${scale * 100}%`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  </div>
);

const Navigation = ({
  jumpToNextPage,
  jumpToPreviousPage,
  CurrentPageLabel,
  handlePageInputChange,
}: {
  jumpToNextPage: () => void;
  jumpToPreviousPage: () => void;
  CurrentPageLabel: (props: CurrentPageLabelProps) => React.ReactElement;
  handlePageInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}) => (
  <div className="my-2 flex justify-center gap-2">
    <button
      onClick={jumpToPreviousPage}
      className="w-[80px] rounded bg-gray-800 p-2 text-white hover:bg-gray-600"
    >
      Previous
    </button>

    <div className="flex items-center">
      <CurrentPageLabel>
        {({ currentPage, numberOfPages }) => (
          <span className="flex justify-center gap-2">
            <div className="flex w-[80px]">
              <InputField
                label={"Page"}
                value={currentPage.toString()}
                onChange={handlePageInputChange}
                type="number"
              />
            </div>
            <div className="flex items-center">/ {numberOfPages}</div>
          </span>
        )}
      </CurrentPageLabel>
    </div>
    <button
      onClick={jumpToNextPage}
      className="w-[80px] rounded bg-gray-800 p-2 text-white hover:bg-gray-600"
    >
      Next
    </button>
  </div>
);

const EnterFullScreenButton = ({
  EnterFullScreen,
}: {
  EnterFullScreen: (props: EnterFullScreenProps) => React.ReactElement;
}) => (
  <div className="flex items-center justify-center rounded-md bg-gray-800 p-3 px-3 hover:bg-gray-600">
    <EnterFullScreen>
      {(props: RenderEnterFullScreenProps) => (
        <button onClick={props.onClick} className="text-white">
          <FullScreenIcon />
        </button>
      )}
    </EnterFullScreen>
  </div>
);

export const Header = ({
  jumpToNextPage,
  jumpToPreviousPage,
  CurrentPageLabel,
  handlePageInputChange,
  zoomLevel,
  handleZoom,
  ShowSearchPopover,
  EnterFullScreen,
  UpdateRead
}: {
  jumpToNextPage: () => void;
  jumpToPreviousPage: () => void;
  CurrentPageLabel: (props: CurrentPageLabelProps) => React.ReactElement;
  handlePageInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  zoomLevel: number;
  handleZoom: (scale: number) => void;
  ShowSearchPopover: (props: ShowSearchPopoverProps) => React.ReactElement;
  EnterFullScreen: (props: EnterFullScreenProps) => React.ReactElement;
  UpdateRead: () => Promise<void>;
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between px-4">
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={async () => {
            await UpdateRead()
            navigate(-1);
          }}
          className="  rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-600"
        >
          Back
        </button>
        <EnterFullScreenButton EnterFullScreen={EnterFullScreen} />
        <div className="flex items-center justify-center rounded-md bg-gray-800 p-2 px-3 hover:bg-gray-600">
          <ShowSearchPopover>
            {(props: RenderShowSearchPopoverProps) => (
              <button onClick={props.onClick} className="text-white">
                <SearchIcon />
              </button>
            )}
          </ShowSearchPopover>
        </div>
      </div>
      <Navigation
        jumpToNextPage={jumpToNextPage}
        jumpToPreviousPage={jumpToPreviousPage}
        CurrentPageLabel={CurrentPageLabel}
        handlePageInputChange={handlePageInputChange}
      />
      <Zoom zoomLevel={zoomLevel} handleZoom={handleZoom} />
    </div>
  );
};
