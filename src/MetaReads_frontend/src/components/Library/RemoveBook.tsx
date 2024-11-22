import { useModalState } from "../Hook/Ui/useModalState";
import RemoveLibraryModal from "../Modal/Library/RemoveLibraryModal";

export default function RemoveBook({
  bookId,
  libraryId,
  fetchData,
}: {
  bookId: string;
  libraryId: string;
  fetchData: () => {};
}) {
  const { modalState, handleClose, handleOpen } = useModalState();
  return (
    <>
      <RemoveLibraryModal
        bookId={bookId}
        open={modalState.other}
        handleClose={handleClose}
        fetchData={fetchData}
        selectedItem={libraryId}
      />
      <button className="relative p-[3px]" onClick={handleOpen}>
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-700 to-red-700" />
        <div className="group relative rounded-[6px] bg-black px-8 py-2 text-white transition duration-200 hover:bg-transparent">
          Remove
        </div>
      </button>
    </>
  );
}
