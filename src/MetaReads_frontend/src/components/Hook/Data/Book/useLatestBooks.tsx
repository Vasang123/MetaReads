import { useEffect, useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";
import {
  BaseTableColumnBooksProps,
  BaseTableColumnProps,
} from "../../../Props/tabeProps";
import { BookModel, BookModelProps, GenreModel } from "../../../Props/model";
import { Principal } from "@dfinity/principal";

function createData(data: BaseTableColumnBooksProps) {
  const { cover_image, id, title, book_url, plan, page_count, option } = data;
  return { cover_image, id, title, book_url, plan, page_count, option };
}

const useLatestBooks = () => {
  const [latestRow, setLatestRow] = useState<BookModel[]>([]);

  const fetchLatestData = async () => {
    try {
      const booksResponse: any =
        await MetaReads_backend.get_latest_release_book();

      // const bookRows: BookModel[] = booksResponse.map((book: any) =>
      //   createData({
      //     id: Principal.fromText(book.id.toString()),
      //     cover_image: book.cover_image,
      //     title: book.title,
      //     book_url: book.book_url,
      //     plan: book.plan,
      //     pages_count: book.page_count,
      //     option: "Options",
      //   }),
      // );
      setLatestRow(booksResponse as BookModel[]);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchLatestData();
  }, []);

  return [latestRow, fetchLatestData] as const;
};

export default useLatestBooks;
