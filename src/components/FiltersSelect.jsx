import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { SelectSmall } from './SelectSmall';
import { Button } from '@mui/material';

export const FiltersSelect = () => {
  return (
    <Box>
      <AppBar position="static" sx={{ height: 100 }}>
        <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
          <SelectSmall />
          <Button variant='contained' >Cambiar Fondo</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
