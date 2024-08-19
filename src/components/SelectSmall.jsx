import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export const SelectSmall = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (

    <FormControl sx={{ m: 1, minWidth: 120, maxHeight: 50 }}>
      <Select
        value={age}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="">
          <em>Sin Filtro</em>
        </MenuItem>
        <MenuItem value={10}>Cat Lovers</MenuItem>
        <MenuItem value={20}>Not Cat</MenuItem>
        <MenuItem value={30}>Favoritos</MenuItem>
      </Select>
    </FormControl>

  )
}
