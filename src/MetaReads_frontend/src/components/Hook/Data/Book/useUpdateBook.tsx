import { useState } from "react";
import { Principal } from "@dfinity/principal";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";

export const useUpdateBook = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const updateBook = async (
    id: Principal,
    title: string,
    author: Principal,
    book_url: string,
    plan: string,
    genre: Principal,
    description: string,
    coverImage: string,
    page_count: number,
  ) => {
    const book_id: Principal = Principal.fromText(id.toString());
    setLoading(true);
    setError(null);
    try {
      const res = await MetaReads_backend.update_book({
        id: [book_id],
        title: title,
        book_url: book_url,
        cover_image: coverImage,
        description: description,
        plan: plan,
        author_id: author,
        genre_id: genre,
        page_count: BigInt(page_count),
      });
      console.log(res);

      return true;
    } catch (err: any) {
      setError(err);
      return false; // Indicate failure
    } finally {
      setLoading(false);
    }
  };

  return { updateBook, loading, error };
};
