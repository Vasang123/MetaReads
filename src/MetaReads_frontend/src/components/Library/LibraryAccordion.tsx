import { RiArrowDownSFill } from "react-icons/ri";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { BookModel, LibraryModel } from "../Props/model";
import BookItem from "../Book/BookItem";

interface LibraryAccordionProps {
  library: LibraryModel;
  selectedLibrary: LibraryModel | null;
  bookList: BookModel[];
  onLibrarySelect: (library: LibraryModel) => void;
  count: number;
  handleBookSelect: (book: BookModel | null) => void;
  selectedBook: BookModel | null;
  sidebarRef: React.RefObject<HTMLDivElement>
}

export default function LibraryAccordion({
  library,
  selectedLibrary,
  bookList,
  onLibrarySelect,
  count,
  handleBookSelect,
  selectedBook,
  sidebarRef
}: LibraryAccordionProps) {
  const [expanded, setExpanded] = React.useState(true);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const handleIconClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setExpanded(!expanded);
  };

  const handleAccordionClick = () => {
    handleBookSelect(null);
    onLibrarySelect(library);
  };

  const handleBookClick = (book: BookModel, event: React.MouseEvent) => {
    event.stopPropagation();
    handleBookSelect(book);
    onLibrarySelect(library);
  };
  return (
    <div>
      <Accordion expanded={expanded} onClick={handleAccordionClick}>
        <AccordionSummary
          sx={{
            backgroundColor:
              (selectedLibrary && selectedLibrary.name) === library.name ? "#484f5a" : "#1E2732",
            color: "white",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          className="inject-accordion"
          expandIcon={<RiArrowDownSFill onClick={handleIconClick} />}
        >
          <div className="flex flex-grow gap-2 ">
            <Typography className="custom-font-size flex items-center" >{library.name}</Typography>
            <Typography className="text-gray-400 ">( {count} )</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "#0e1115", padding: 0 }}>
          {bookList.length > 0 ? (
            bookList.map((book, index) => (
              <BookItem
                key={index}
                book={book}
                isSelected={selectedBook?.id === book.id}
                isHovered={hoveredIndex === index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={(event) => handleBookClick(book, event)}
                sidebarRef={sidebarRef}
              />
            ))
          ) : (
            <></>
          )}

        </AccordionDetails>
      </Accordion>
    </div>
  );
}
