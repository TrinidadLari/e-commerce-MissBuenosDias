import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Button } from '@mui/material';
import { SelectSmall } from './SelectSmall';
import fondo1 from '../assets/images/fondos/fondo1.jpg';
import fondo2 from '../assets/images/fondos/fondo2.jpg';
import fondo3 from '../assets/images/fondos/fondo3.jpg';
import fondo4 from '../assets/images/fondos/fondo4.jpg';
import fondo5 from '../assets/images/fondos/fondo5.jpg';

const backgrounds = [fondo1, fondo2, fondo3, fondo4, fondo5];

export const FiltersSelect = ({ value, onFilterChange }) => {
  const [bgIndex, setBgIndex] = useState(0);

  const changeBackground = () => {
    setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 100,
        backgroundImage: `url(${backgrounds[bgIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <AppBar position="static" sx={{ height: '100%', background: 'transparent', boxShadow: 'none' }}>
        <Toolbar variant="dense" sx={{ justifyContent: 'space-between', height: '100%' }}>
          <SelectSmall value={value} onFilterChange={onFilterChange} />
          <Button variant='contained' onClick={changeBackground}>
            Cambiar Fondo
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};