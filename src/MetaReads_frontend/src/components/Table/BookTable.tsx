import BaseTable from "./BaseTable";
import PrimaryButton from "../Form/Button/PrimaryButton";
import CustomPagination from "./CustomPagination";
import SearchBar from "../Form/Input/TextField/SearchBar";
import { useModalState } from "../Hook/Ui/useModalState";
import { useCustomPagination } from "../Hook/Ui/useCustomPagination";
import { useQuery, useQueryBook } from "../Hook/Ui/useQuery";
import DeleteAuthorModal from "../Modal/Author/DeleteAuthorModal";
import UpdateAuthorModal from "../Modal/Author/UpdateAuthorModal";
import useAuthors from "../Hook/Data/Author/useAuthors";
import { CreateAuthorModal } from "../Modal/Author/CreateAuthorModal";
import { CreateBookModal } from "../Modal/Book/CreateBookModal";
import { useBooks } from "../Hook/Data/Book/useBooks";
import DeleteBookModal from "../Modal/Book/DeleteBookModal";
import UpdateBookModal from "../Modal/Book/UpdateBookModal";

export default function BookTable() {
  const [rows, fetchData] = useBooks();
  const headers = [
    "Cover Image",
    "Title",
    "Url",
    "Plan",
    "Pages Count",
    "Options",
  ];
  const {
    modalState,
    handleOpenCreate,
    handleOpenUpdate,
    handleOpenDelete,
    handleCloseCreate,
    handleCloseUpdate,
    handleCloseDelete,
  } = useModalState();
  const { pagination, handleChangePage, handleChangeRowsPerPage } =
    useCustomPagination();
  const { query, handleQueryChange, filteredRows } = useQueryBook(rows);

  return (
    <>
      <CreateBookModal
        open={modalState.create}
        handleClose={handleCloseCreate}
        fetchData={fetchData}
      />
      <DeleteBookModal
        open={modalState.delete}
        handleClose={handleCloseDelete}
        fetchData={fetchData}
        selectedItem={modalState.selectedRow}
      />
      <UpdateBookModal
        open={modalState.update}
        handleClose={handleCloseUpdate}
        fetchData={fetchData}
        selectedItem={modalState.selectedRow}
      />
      <div className="flex flex-col gap-2 p-4">
        <div className="flex gap-4">
          <div className="flex-grow transition-all duration-300">
            <SearchBar value={query} onChange={handleQueryChange} />
          </div>
          <div className="flex items-center">
            <PrimaryButton onClick={handleOpenCreate} text={"Add Book"} />
          </div>
        </div>
        <BaseTable
          rows={filteredRows.slice(
            pagination.page * pagination.rowsPerPage,
            pagination.page * pagination.rowsPerPage + pagination.rowsPerPage,
          )}
          headers={headers}
          handleOpenDelete={handleOpenDelete}
          handleOpenUpdate={handleOpenUpdate}
        />
        <CustomPagination
          count={filteredRows.length}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}
