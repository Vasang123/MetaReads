import { Box, TextField } from "@mui/material";
import React from "react";
import { MenuItem } from "@mui/material"; // Adjusted import for MenuItem
import useGenres from "../../../Hook/Data/Genre/useGenres"; // Adjusted import for useGenres

interface SelectGenreBookFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add the onChange prop type
  genre: string;
}

export default function SelectGenreBookField({
  onChange,
  genre,
}: SelectGenreBookFieldProps) {
  const [rows, fetchData] = useGenres();

  return (
    <div className="my-4">
      <Box component="form" noValidate autoComplete="off" className="w-full">
        <TextField
          id="outlined-select-genre"
          select
          label="Genre"
          name="genre"
          value={genre}
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
