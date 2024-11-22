import * as React from "react";
import PageLayout from "../components/Layout/PageLayout";
import { Title } from "../components/Utility/TitleUtility";
import LibrarySidebar from "../components/Library/LibrarySidebar";
import { BookModel, library1, library2, LibraryModel } from "../components/Props/model";
import LibraryContent from "../components/Library/LibraryContent";
import BookDetail from "../components/Book/BookDetail";
import LibraryDashboard from "../components/Library/LibraryDashboard";
import { useCollapsed } from "../lib/collapsed_provider";
import useLibraries from "../components/Hook/Data/Library/useLibraries";

export default function LibraryPage() {
  const { setCollapsed } = useCollapsed()
  const [data, fetchData] = useLibraries()
  const [libraryList, setLibraryList] = React.useState<LibraryModel[] | []>([]);
  React.useEffect(() => {
    setCollapsed(true)
    fetchData()
  }, [])

  React.useEffect(() => {
    if (data.length > 0) {
      const test1: LibraryModel = library1;
      const test2: LibraryModel = library2;

      const updatedLibraryList: LibraryModel[] = [
        ...data
      ];
      setLibraryList(updatedLibraryList);
    } else {
      setLibraryList([]);
    }
  }, [data]); // Run this effect when `data` changes
  const [selectedLibrary, setselectedLibrary] =
    React.useState<LibraryModel | null>(null);

  const [selectedBook, setSelectedBook] = React.useState<BookModel | null>(
    null,
  );

  const handleLibrarySelect = (library: LibraryModel | null) => {
    setselectedLibrary(library);
  };
  const handleBookSelect = (book: BookModel | null) => {
    setSelectedBook(book);
  };
  const onBookRemoved = (): {} => {
    handleLibrarySelect(null);
    handleBookSelect(null);
    fetchData();
    return {};
  }

  return (
    <PageLayout>
      <div className="relative flex h-[100vh] w-full items-center justify-center bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
        <div className="flex w-full">
          <LibrarySidebar
            libraryList={libraryList}
            selectedLibrary={selectedLibrary}
            handleLibrarySelect={handleLibrarySelect}
            handleBookSelect={handleBookSelect}
            selectedBook={selectedBook}
          />
          <div className="flex w-full flex-col">
            <div>
              {selectedBook != null && selectedLibrary != null && <BookDetail book={selectedBook} fetchData={onBookRemoved} libraryId={selectedLibrary.id.toString()} />}
              {selectedBook == null && selectedLibrary != null && (
                <div className="">
                  <LibraryContent
                    handleLibrarySelect={handleLibrarySelect}
                    selectedLibrary={selectedLibrary}
                    fetchData={fetchData}
                    handleBookSelect={handleBookSelect}
                  ></LibraryContent>
                </div>
              )}
              {selectedBook == null && selectedLibrary == null && (
                <LibraryDashboard
                  fetchData={fetchData}
                  libraryList={libraryList}
                  handleLibrarySelect={handleLibrarySelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
