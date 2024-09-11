import React from 'react';
import { useTheme } from '@emotion/react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const SelectSmall = ({ value, onFilterChange }) => {
  const theme = useTheme();
  const handleChange = (event) => {
    const newValue = event.target.value === "true" ? true : event.target.value === "false" ? false : "";
    onFilterChange(newValue);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120, maxHeight: 50 }}>
      <Select
        value={value === true ? "true" : value === false ? "false" : ""}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.primary,

        }}
      >
        <MenuItem value="">
          <em>Todos</em>
        </MenuItem>
        <MenuItem value="true">Cat Lovers</MenuItem>
        <MenuItem value="false">Not Cat</MenuItem>
      </Select>
    </FormControl>
  );
};
