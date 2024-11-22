import { useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";
import { Principal } from "@dfinity/principal";
import { AuthorModel, GenreModel } from "../../../Props/model";

export const useCreateBook = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const createBook = async (
    title: string,
    author: Principal,
    book_url: string,
    plan: string,
    genre: Principal,
    description: string,
    coverImage: string,
    page_count: number,
  ) => {
    setLoading(true);
    setError(null);

    try {
      await MetaReads_backend.create_book({
        id: [],
        title: title,
        book_url: book_url,
        cover_image: coverImage,
        description: description,
        plan: plan,
        author_id: author,
        genre_id: genre,
        page_count: BigInt(page_count),
      });
      return true; // Indicate success
    } catch (err: any) {
      setError(err);
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { createBook, loading, error };
};
