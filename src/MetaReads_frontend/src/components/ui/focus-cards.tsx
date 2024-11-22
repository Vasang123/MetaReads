import { FaCrown } from "react-icons/fa";
("use client");
import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { FaBookmark } from "react-icons/fa";
import PrimaryButton from "../Form/Button/PrimaryButton";
import { BookDataProps, BookModel, BookModelProps } from "../Props/model";
import { Link } from "react-router-dom";
import TagIconPlan from "../Subscriptions/TagIconPlan";
import { BaseTableColumnBooksProps } from "../Props/tabeProps";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    handleBookSelect,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    handleBookSelect?: (book: BookModel | null) => void;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => {
        console.log("test");

        handleBookSelect!(card);
      }}
      className={cn(
        "relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 ease-out dark:bg-neutral-900",
        hovered !== null && hovered !== index && "scale-[0.98] blur-sm",
      )}
    >
      <TagIconPlan plan={card.plan} />
      <img
        src={card.cover_image}
        alt={card.title}
        className="absolute inset-0 object-cover object-fill"
      />
      <div
        className={cn(
          "absolute inset-0 flex items-end bg-black/50 px-4 py-8 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="bg-gradient-to-b from-neutral-50 to-neutral-200 bg-clip-text text-xl font-medium text-transparent md:text-2xl">
          {card.title}
        </div>
      </div>
    </div>
  ),
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
};

interface FocusCardsProps {
  books: BookModel[];
  handleBookSelect?: (book: BookModel | null) => void;
}

export function FocusCards({ books, handleBookSelect }: FocusCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-10 pb-8 md:grid-cols-3 lg:grid-cols-6">
      {books.map((book: BookModel, index) => (
        <Link to={`/book/${book.id}`} key={index}>
          <Card
            card={book}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
            handleBookSelect={handleBookSelect}
          />
        </Link>
      ))}
    </div>
  );
}
