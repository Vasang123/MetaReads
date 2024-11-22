import { FaBookmark } from "react-icons/fa";
import CurrencyLogo from "../../../public/assets/Currency Logo.png";
import PrimaryButton from "../Form/Button/PrimaryButton";
import { BookDataProps } from "../Props/model";

export default function BookCard({ data }: BookDataProps) {
  return (
    <div className="group relative z-10 h-[350px] w-[203px] overflow-hidden rounded-md bg-white">
      <img
        className="h-full w-full object-cover transition-transform duration-300"
        src={data.cover_image}
        alt={data.title}
      />
      <div className="absolute bottom-0 z-30 flex w-full translate-y-40 flex-col justify-between bg-black/60 px-2 py-4 text-white transition-all duration-150 ease-in group-hover:h-full group-hover:translate-y-0">
        <div className="flex w-full flex-col gap-2">
          <div className="font-bold">{data.title}</div>
          <div className="text-sm">
            <p>Author: {data.author.name}</p>
            {/* <span className="flex gap-2">
              <div className="flex items-center">
                <img src={CurrencyLogo} alt="Currency" className="w-5" />
              </div>
              <div style={{ color: "#3FF39D" }}>{data.price}</div>
            </span> */}
            <div className="flex gap-2">
              <div>Total Pages:</div> {data.page_count}{" "}
            </div>
          </div>
          <div className="transform text-sm opacity-0 transition-transform group-hover:block group-hover:opacity-100">
            <p>Genre: {data.genre.name}</p>
          </div>
          <div className="transform text-sm opacity-0 transition-transform group-hover:block group-hover:opacity-100">
            <p>Summary</p>
            <p className="line-clamp-4">{data.description}</p>
          </div>
        </div>

        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <div className="flex h-auto cursor-pointer items-center justify-center bg-neutral-700 p-3">
              <FaBookmark />
            </div>
            <div>
              <PrimaryButton
                text={"Subscribe"}
                color={"white"}
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
