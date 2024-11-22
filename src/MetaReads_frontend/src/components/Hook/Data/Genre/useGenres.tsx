import { useEffect, useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";
import { BaseTableColumnProps } from "../../../Props/tabeProps";
import { GenreModel } from "../../../Props/model";

function createData({ id, name, option }: BaseTableColumnProps) {
  return { id, name, option };
}

const useGenres = () => {
  const [rows, setRows] = useState<BaseTableColumnProps[]>([]);

  const fetchData = async () => {
    try {
      const genresResponse: GenreModel[] = await MetaReads_backend.get_all_genre();
      const genreRows = genresResponse.map((genre: GenreModel) =>
        createData({ id: genre.id, name: genre.name, option: "Options" }),
      );
      setRows(genreRows);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return [rows, fetchData] as const;
};

export default useGenres;
