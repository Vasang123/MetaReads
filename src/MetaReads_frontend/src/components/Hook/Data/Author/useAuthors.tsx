import { useEffect, useState } from "react";
import { MetaReads_backend } from "../../../../../../declarations/MetaReads_backend";
import { BaseTableColumnProps } from "../../../Props/tabeProps";
import { AuthorModel } from "../../../Props/model";
import { Principal } from "@dfinity/principal";

function createData(data: BaseTableColumnProps) {
  const { id, name, option } = data;
  return { id, name, option };
}

const useAuthors = () => {
  const [rows, setRows] = useState<BaseTableColumnProps[]>([]);

  const fetchData = async () => {
    try {
      const authorResponse = await MetaReads_backend.get_all_author();

      const authorRows: BaseTableColumnProps[] = authorResponse.map(
        (authorData) =>
          createData({
            id: Principal.fromText(authorData.id.toString()),
            name: authorData.name,
            option: "Options",
          }),
      );

      setRows(authorRows);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [rows, fetchData] as const;
};

export default useAuthors;
