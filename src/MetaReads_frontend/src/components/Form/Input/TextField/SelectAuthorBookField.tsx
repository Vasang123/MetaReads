import { Box, TextField } from "@mui/material";
import React from "react";
import { MenuItem } from "@mui/material"; // Adjusted import for MenuItem
import useGenres from "../../../Hook/Data/Genre/useGenres"; // Adjusted import for useGenres
import useAuthors from "../../../Hook/Data/Author/useAuthors";

interface SelectGenreBookFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add the onChange prop type
  author: any;
}

export default function SelectAuthorBookField({
  onChange,
  author,
}: SelectGenreBookFieldProps) {
  const [rows, fetchData] = useAuthors();

  return (
    <div className="my-4">
      <Box component="form" noValidate autoComplete="off" className="w-full">
        <TextField
          id="outlined-select-genre"
          select
          label="author"
          name="author"
          value={author}
          onChange={onChange} // Use the passed onChange prop
          className="w-full"
        >
          {rows.map((row) => (
            <MenuItem key={row.id.toString()} value={row.id.toString()}>
              {row.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </div>
  );
}
