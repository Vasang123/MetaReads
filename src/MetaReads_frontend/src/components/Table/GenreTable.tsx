import BaseTable from "./BaseTable";
import PrimaryButton from "../Form/Button/PrimaryButton";
import CreateGenreModal from "../Modal/Genre/CreateGenreModal";
import CustomPagination from "./CustomPagination";
import SearchBar from "../Form/Input/TextField/SearchBar";
import DeleteGenreModal from "../Modal/Genre/DeleteGenreModal";
import UpdateGenreModal from "../Modal/Genre/UpdateGenreModal";
import { useModalState } from "../Hook/Ui/useModalState";
import { useCustomPagination } from "../Hook/Ui/useCustomPagination";
import { useQuery } from "../Hook/Ui/useQuery";
import useGenres from "../Hook/Data/Genre/useGenres";

export default function GenreTable() {
  const [rows, fetchData] = useGenres();
  const headers = ["Id", "Name", "Option"];
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
  const { query, handleQueryChange, filteredRows } = useQuery(rows);

  return (
    <>
      <CreateGenreModal
        open={modalState.create}
        handleClose={handleCloseCreate}
        fetchData={fetchData}
      />
      <UpdateGenreModal
        open={modalState.update}
        handleClose={handleCloseUpdate}
        fetchData={fetchData}
        selectedItem={modalState.selectedRow}
      />
      <DeleteGenreModal
        open={modalState.delete}
        handleClose={handleCloseDelete}
        fetchData={fetchData}
        selectedItem={modalState.selectedRow}
      />
      <div className="flex flex-col gap-2 p-4">
        <div className="flex gap-4">
          <div className="flex-grow transition-all duration-300">
            <SearchBar value={query} onChange={handleQueryChange} />
          </div>
          <div className="flex items-center">
            <PrimaryButton onClick={handleOpenCreate} text={"Add Genre"} />
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
