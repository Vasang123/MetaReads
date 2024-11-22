import { useEffect, useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";
import {
  BaseTableColumnBooksProps,
  BaseTableColumnProps,
} from "../../../Props/tabeProps";
import { BookModel, BookModelProps, GenreModel } from "../../../Props/model";
import { Principal } from "@dfinity/principal";
const useRecommendBooks = () => {
  const [recommend, setRecommend] = useState<BookModel[]>([]);

  const fetchRecommendData = async () => {
    try {
      const booksResponse: any = await MetaReads_backend.get_recommended_book();

      // console.log("tesiting", booksResponse);

      // const { books } = booksResponse.Ok;

      const bookRows: BookModel[] = booksResponse.map((book: any) => {
        return {
          id: Principal.fromText(book.id.toString()),
          title: book.title,
          author: book.author,
          plan: book.plan,
          genre: book.genre,
          description: book.description,
          cover_image: book.cover_image,
          views: book.views,
          page_count: book.page_count,
          book_url: book.book_url,
        };
      });

      console.log(bookRows);

      setRecommend(bookRows);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchRecommendData();
  }, []);

  return [recommend, fetchRecommendData] as const;
};

export default useRecommendBooks;
