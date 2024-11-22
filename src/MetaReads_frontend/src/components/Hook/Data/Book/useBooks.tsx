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

export const useBooks = () => {
  const [rows, setRows] = useState<BookModel[]>([]);

  const fetchData = async () => {
    try {
      const booksResponse: any = await MetaReads_backend.get_all_book({
        query: "",
      });

      console.log(booksResponse);

      const { books } = booksResponse.Ok;

      const bookRows: BookModel[] = books.map((book: any) =>
        createData({
          id: Principal.fromText(book.id.toString()),
          cover_image: book.cover_image,
          title: book.title,
          book_url: book.book_url,
          plan: book.plan,
          page_count: book.page_count,
          option: "Options",
        }),
      );

      setRows(bookRows);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [rows, fetchData] as const;
};

export const useBook = (bookId: string) => {
  const [book, setBook] = useState<BookModel>();
  const fetchData = async () => {
    try {
      const response = await MetaReads_backend.get_book_detail(
        Principal.fromText(bookId),
      );

      if ("Ok" in response) {
        const bookRes = response.Ok;
        const book: BookModel = {
          ...bookRes,
          page_count: Number(bookRes.page_count),
          views: Number(bookRes.views),
        };

        setBook(book);
      }
    } catch (error) {
      console.error("Error fetching book detail:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return [book, fetchData] as const;
};
