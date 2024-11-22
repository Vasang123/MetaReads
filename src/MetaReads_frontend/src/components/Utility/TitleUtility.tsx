import React from "react";

interface TitleProps {
  text: string;
}

export const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <div className="flex w-full justify-center text-center text-2xl font-bold text-white">
      {text}
    </div>
  );
};
