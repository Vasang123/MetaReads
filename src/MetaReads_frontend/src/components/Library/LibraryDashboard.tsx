import { SiBookstack } from "react-icons/si";
import { AiOutlinePlus } from "react-icons/ai";
import { LibraryModel } from "../Props/model";
import { HoverEffect } from "../ui/card-hover-effect";
import { Title } from "../Utility/TitleUtility";
import { useModalState } from "../Hook/Ui/useModalState";
import CreateLibraryModal from "../Modal/Library/CreateLibraryModal";

interface LibraryDashboardProps {
  libraryList: LibraryModel[] | null;
  handleLibrarySelect: (library: LibraryModel | null) => void;
  fetchData: () => void
}

export default function LibraryDashboard({
  libraryList,
  handleLibrarySelect,
  fetchData
}: LibraryDashboardProps) {
  const {
    modalState,
    handleOpenCreate,
    handleCloseCreate,
  } = useModalState();

  const createNewLibrary = {
    title: "Add New Library",
    description: (
      <div className="flex w-full items-center justify-center">
        <AiOutlinePlus size={30} />
      </div>
    ),
    onClick: () => {
      handleOpenCreate();
    },
    backgroundImage: null,
  };

  const data = [
    createNewLibrary,
    ...(libraryList?.map((library) => {
      const firstBook = library.bookList[0]; // Get the first book
      return {
        title: library.name,
        description: (
          <div className="flex w-full items-center justify-center gap-2">
            {library.bookList.length}
            <SiBookstack size={18} />
          </div>
        ),
        onClick: () => {
          handleLibrarySelect(library);
        },
        backgroundImage: firstBook ? firstBook.cover_image : null,
      };
    }) || []),
  ];

  return (
    <div>
      <CreateLibraryModal open={modalState.create} handleClose={handleCloseCreate} fetchData={fetchData} />
      <div className="max-h-[100vh] overflow-y-auto">
        <div className="m-5">
          <Title text="Your Library" />
        </div>
        <div className="mx-auto max-w-5xl px-8">
          <HoverEffect items={data} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
