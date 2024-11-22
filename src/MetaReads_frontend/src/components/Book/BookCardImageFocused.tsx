import { AiFillClockCircle } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BookDataProps, BookModel } from "../Props/model";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";

export default function BookCardImageFocused({
  data,
  handleBookSelect,
}: BookDataProps & { handleBookSelect: (book: BookModel | null) => void }) {
  const [dominantColor, setDominantColor] = useState<string>("rgba(255,255,255,0.8)");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = data.cover_image;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;

      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, 1, 1).data;
        const red = imageData[0];
        const green = imageData[1];
        const blue = imageData[2];
        setDominantColor(`rgba(${red}, ${green}, ${blue}, 0.8)`);
      }
    };
  }, [data.cover_image]);

  const onCardClick = () => {
    handleBookSelect(data);
  };

  return (
    <div
      className="group relative z-10 h-[350px] w-[203px] cursor-pointer overflow-hidden rounded-md shadow-lg transition-shadow duration-300 group-hover:shadow-2xl"
      onClick={onCardClick}
      style={{ backgroundColor: dominantColor }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:blur-md"
        style={{ backgroundImage: `url(${data.cover_image})` }}
      ></div>

      <div className="relative z-10 flex h-full flex-col justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-white bg-opacity-20 rounded-md">
        <h3 className="text-lg font-bold">{data.title}</h3>
        <div className="flex flex-col gap-2">
          <Tooltip title="Total Reading Time" arrow>
            <div className="flex items-center gap-2 font-medium">
              <AiFillClockCircle />
              <div className="ml-1 text-sm">14 hours</div>
            </div>
          </Tooltip>
          <Tooltip title="Author" arrow>
            <div className="flex items-center gap-2 font-medium">
              <BsFillPersonFill className="text-gray-black" />
              <span className="ml-1 text-sm">{data.author.name}</span>
            </div>
          </Tooltip>
          <div>{data.description}</div>
        </div>
      </div>
    </div>
  );
}
