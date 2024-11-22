import React, { useEffect, useState } from "react";
import { BookDataProps, BookModel, LibraryModel } from "../Props/model";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import LibraryHeader from "./LibraryHeader";
import { Tooltip } from "@mui/material";
import { AiFillClockCircle } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { DirectionAwareHover } from "../ui/direction-aware-hover";
interface LibraryContentProps {
  selectedLibrary: LibraryModel;
  handleBookSelect: (book: BookModel | null) => void;
  handleLibrarySelect: (library: LibraryModel | null) => void;
  fetchData: () => void;
}

const BookDisplay: React.FC<{ coverImage: string }> = ({ coverImage }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
    style={{
      backgroundImage: `url(${coverImage})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>

  </div>
);
const BookDescription: React.FC<{ data: BookModel }> = ({ data }) => {
  return (
    <div>
      <Tooltip title="Total Reading Time" arrow >
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
    </div>
  );
};

export default function LibraryContent({
  selectedLibrary,
  handleBookSelect,
  fetchData,
  handleLibrarySelect,
}: LibraryContentProps
) {
  const onBookSelected = ({ data }: BookDataProps) => {
    handleBookSelect(data)
  }
  const [libraryName, setLibraryName] = useState<string>("")
  const updateDisplayName = (name: string) => {
    setLibraryName(name)
  }
  useEffect(() => {
    updateDisplayName(selectedLibrary.name)
  }, [selectedLibrary])

  return (
    <div className="max-h-[100vh] overflow-y-auto overflow-x-hidden">
      <div className="p-5">
        <LibraryHeader
          updateDisplayName={updateDisplayName}
          libraryName={libraryName}
          selectedItem={selectedLibrary}
          count={selectedLibrary.bookList.length}
          fetchData={fetchData}
          handleLibrarySelect={handleLibrarySelect}
        />
      </div>
      {/* Old Display */}
      {/* <BentoGrid className="mt-8 max-w-5xl cursor-pointer">
        {selectedLibrary.bookList.map((book: BookModel, i: number) => (
          <BentoGridItem
            onClick={() => onBookSelected({ data: book })}
            key={i}
            title={book.title}
            description={<BookDescription data={book} />}
            header={<BookDisplay coverImage={book.coverImage} />}
          // icon={item.icon}
          // className={i % 4 === 1 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid> */}

      {/* New Display */}
      <div className=" relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5">
        {selectedLibrary.bookList.map((book: BookModel, i: number) => (
          <DirectionAwareHover key={i} imageUrl={book.cover_image} onClick={() => onBookSelected({ data: book })}>
            <p className="font-bold text-xl">{book.title}</p>
            <BookDescription data={book} />
          </DirectionAwareHover>
        ))}
      </div>

    </div>
  );
}

