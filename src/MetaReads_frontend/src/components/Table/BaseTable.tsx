import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  Skeleton,
} from "@mui/material";

export default function BaseTable({
  headers,
  rows,
  handleOpenUpdate,
  handleOpenDelete,
}: any) {
  return (
    <>
      {rows == undefined ? (
        <div className="flex h-[400px] w-full items-center justify-center text-white">
          No Data Found
        </div>
      ) : (
        <>
          {rows ? (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      {headers.map((header: any, index: number) => {
                        // Skip rendering the "Id" header
                        if (header === "Id") return null;

                        return <HeaderCell key={index}>{header}</HeaderCell>;
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row: any, rowIndex: number) => (
                      <TableRow
                        key={rowIndex}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        {Object.entries(row).map(
                          ([key, cell]: any, cellIndex) => {
                            // Skip rendering the "id" field
                            if (key === "id") return null;

                            if (key === "option") {
                              return (
                                <DataCell key={cellIndex}>
                                  <div className="flex gap-3">
                                    <AiFillEdit
                                      fontSize="18px"
                                      className="cursor-pointer text-green-600"
                                      onClick={() => handleOpenUpdate(row)}
                                    />
                                    <AiFillDelete
                                      fontSize={"18px"}
                                      onClick={() => handleOpenDelete(row)}
                                      className="cursor-pointer text-red-600"
                                    />
                                  </div>
                                </DataCell>
                              );
                            }

                            return (
                              <DataCell key={cellIndex}>
                                {cellIndex === 0 ? (
                                  <img
                                    src={cell as string}
                                    className="min-h-[200px] min-w-[150px]"
                                    alt="Book Cover"
                                  />
                                ) : (
                                  cell.toString()
                                )}
                              </DataCell>
                            );
                          },
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Skeleton height={200} />
          )}
        </>
      )}
    </>
  );
}

const HeaderCell = ({ children }: any) => <TableCell>{children}</TableCell>;

const DataCell = ({ children }: any) => <TableCell>{children}</TableCell>;
