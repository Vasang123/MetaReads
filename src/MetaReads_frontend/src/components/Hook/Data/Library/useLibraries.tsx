import { useEffect, useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";
import { Principal } from "@dfinity/principal";
import { getCookie } from "../../../Utility/IdentityUtility";
import { LibraryModel, BookModel } from "../../../Props/model";
import {
  Library,
  Book,
} from "../../../../../../declarations/MetaReads_backend/MetaReads_backend.did";

const useLibraries = () => {
  const [data, setDatas] = useState<LibraryModel[]>([]);

  const mapBookToBookModel = (book: Book): BookModel => ({
    id: book.id,
    title: book.title,
    author: {
      id: book.author.id,
      name: book.author.name,
    },
    plan: book.plan,
    genre: {
      id: book.genre.id,
      name: book.genre.name,
    },
    description: book.description,
    cover_image: book.cover_image,
    views: Number(book.views),
    page_count: Number(book.page_count),
    book_url: book.book_url,
  });

  const fetchData = async () => {
    try {
      const identityCookie = getCookie("identity");
      if (identityCookie) {
        const user_id: Principal = Principal.fromText(identityCookie);
        const librariesResponse: Library[] =
          await MetaReads_backend.get_library_by_user(user_id);

        const mappedLibraries: LibraryModel[] = librariesResponse.map(
          (library) => ({
            id: library.id,
            name: library.name,
            bookList: library.books.map(mapBookToBookModel),
          }),
        );

        setDatas(mappedLibraries);
      }
    } catch (error) {
      console.error("Error fetching libraries:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [data, fetchData] as const;
};

export default useLibraries;
