import { useState } from "react";
import { AuthorModel, GenreModel } from "../../Props/model";

export const useQuery = (rows: { name: string }[]) => {
  const [query, setQuery] = useState<string>("");

  const handleQueryChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setQuery(e.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return row.name.toLowerCase().includes(query.toLowerCase());
  });

  return {
    query,
    setQuery,
    handleQueryChange,
    filteredRows,
  };
};

export const useQueryBook = (
  rows: {
    title: string;
    author: AuthorModel;
    plan: string;
    genre: GenreModel;
    description: string;
    cover_image: string;
    views: number;
    page_count: number;
  }[],
) => {
  const [query, setQuery] = useState<string>("");

  const handleQueryChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setQuery(e.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return row.title.toLowerCase().includes(query.toLowerCase());
  });

  return {
    query,
    setQuery,
    handleQueryChange,
    filteredRows,
  };
};
