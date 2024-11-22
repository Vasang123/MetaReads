import { useState } from "react";

interface Pagination {
  page: number;
  rowsPerPage: number;
}

export const useCustomPagination = (defaultRowsPerPage = 10) => {
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    rowsPerPage: defaultRowsPerPage,
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPagination((prevState) => ({ ...prevState, page: newPage }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<any>) => {
    setPagination({
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  return {
    pagination,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};
