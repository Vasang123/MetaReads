import PageLayout from "../components/Layout/PageLayout";
import TopNavbar from "../components/Navbar/TopNavbar";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { BookModel } from "../components/Props/model";
import { FocusCards } from "../components/ui/focus-cards";
import StoreContent from "../components/Store/StoreContent";
import { useEffect, useState } from "react";
import useStoreBooks from "../components/Hook/Data/Book/useStoreBooks";

export default function StorePage() {
  const [selectedBook, setSelectedBook] = useState<BookModel | null>(null);

  useEffect(() => {}, [selectedBook]);
  const [rows, fetchData] = useStoreBooks();

  const handleBookSelect = (book: BookModel | null) => {
    setSelectedBook(book);
  };

  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    fetchData(search);
  }, [search]);

  return (
    <PageLayout>
      <div className="relative min-h-[100vh] w-full overflow-y-auto bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
        <TopNavbar search={search} setSearch={setSearch} />
        {/* {selectedBook != null && <BookDetail book={selectedBook} />} */}
        {search != "" ? (
          <>
            <FocusCards books={rows} />
          </>
        ) : (
          selectedBook == null && (
            <StoreContent handleBookSelect={handleBookSelect} />
          )
        )}
      </div>
    </PageLayout>
  );
}
