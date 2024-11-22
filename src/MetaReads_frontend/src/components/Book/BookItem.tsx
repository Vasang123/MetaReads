import React, { useEffect, useRef, useState } from "react";
import { Typography, Tooltip } from "@mui/material";
import { BookModel } from "../Props/model";

interface BookItemProps {
  book: BookModel;
  isSelected: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  sidebarRef: React.RefObject<HTMLDivElement>
}

const BookItem: React.FC<BookItemProps> = ({
  book,
  isSelected,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  sidebarRef
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (sidebarRef.current) {
      const { clientWidth } = sidebarRef.current;
      setShowTooltip(clientWidth < 250);
    }
  }, [sidebarRef.current?.clientWidth]);

  return (
    <Tooltip title={showTooltip ? book.title : ""} placement="top" arrow>
      <Typography
        className="cursor-pointer py-1 pl-4"
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          backgroundColor: isSelected || isHovered ? "rgba(63, 87, 110, 0.5)" : "transparent",
          transition: "background-color 0.3s",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <div>
          <img
            src={book.cover_image}
            alt={book.title}
            style={{ height: "30px", width: "20px", objectFit: "cover" }}
          />
        </div>
        <div

          className="flex items-center text-sm"
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            flex: 1,
          }}
        >
          {book.title}
        </div>
      </Typography>
    </Tooltip>
  );
};

export default BookItem;
