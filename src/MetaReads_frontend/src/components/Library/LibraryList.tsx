import { IoMdAddCircle } from "react-icons/io";
import { AiFillFileAdd } from "react-icons/ai";
import { useState } from "react";
import { useModalState } from "../Hook/Ui/useModalState";
import useLibraries from "../Hook/Data/Library/useLibraries";
import AddLibraryModal from "../Modal/Library/AddLibraryModal";

export default function LibraryList({
  bookId,
  text,
}: {
  bookId: string;
  text: string;
}) {
  const { modalState, handleClose, handleOpen } = useModalState();
  const [data, fetchData] = useLibraries();

  return (
    <div>
      <AddLibraryModal
        open={modalState.other}
        handleClose={handleClose}
        fetchData={fetchData}
        selectedItem={data}
        bookId={bookId}
      />
      <button
        onClick={handleOpen}
        className={`duration-400 flex h-full max-h-12 w-fit transform items-center gap-2 text-nowrap rounded-md border border-transparent bg-black p-2 text-base text-black shadow-[0_0_0_3px_#000000_inset] transition hover:-translate-y-1 dark:border-[#EFAF21] dark:text-white`}
      >
        <IoMdAddCircle color="white" size={25} />
        {text}
      </button>
    </div>
  );
}
