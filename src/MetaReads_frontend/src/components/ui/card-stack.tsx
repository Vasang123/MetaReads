"use client";
import { useState } from "react";
import { motion } from "framer-motion";

type Card = {
    id: number;
    name: string;
    designation: string;
    content: React.ReactNode;
};

export const CardStack = ({
    items,
    offset,
    scaleFactor,
}: {
    items: Card[];
    offset?: number;
    scaleFactor?: number;
}) => {
    const CARD_OFFSET = offset || 10;
    const SCALE_FACTOR = scaleFactor || 0.06;
    const [cards, setCards] = useState<Card[]>(items);

    const handleNext = () => {
        setCards((prevCards: Card[]) => {
            const newArray = [...prevCards];
            newArray.unshift(newArray.pop()!); // Move the last element to the front
            return newArray;
        });
    };

    const handlePrev = () => {
        setCards((prevCards: Card[]) => {
            const newArray = [...prevCards];
            newArray.push(newArray.shift()!); // Move the first element to the back
            return newArray;
        });
    };

    return (
      <div className="relative">
        <div className="relative h-80 w-60 md:h-60 md:w-96">
          {cards
            .slice()
            .reverse()
            .map((card, index) => {
              return (
                <motion.div
                  key={card.id}
                  className="absolute flex h-60 w-60 flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-4 shadow-xl shadow-black/[0.1] dark:border-white/[0.1] dark:bg-black dark:shadow-white/[0.05] md:h-60 md:w-96"
                  style={{
                    transformOrigin: "top center",
                  }}
                  animate={{
                    top: index * -CARD_OFFSET,
                    scale: 1 - index * SCALE_FACTOR, // Decrease scale for cards that are behind
                    zIndex: cards.length - index, // Decrease z-index for the cards that are behind
                  }}
                >
                  <div className="max-h-70 overflow-y-auto font-normal text-neutral-700 dark:text-neutral-200">
                    {card.content}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-500 dark:text-white">
                      {card.name}
                    </p>
                    <p className="font-normal text-neutral-400 dark:text-neutral-200">
                      {card.designation}
                    </p>
                  </div>
                </motion.div>
              );
            })}
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            className="rounded-md px-4 py-2 text-white dark:bg-black"
            onClick={handlePrev}
          >
            Prev
          </button>
          <button
            className="rounded-md px-4 py-2 text-white dark:bg-black"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    );
};
