import * as React from 'react';
import { useState, useCallback } from 'react';
import { Carousel } from './carousel/Carousel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled, alpha } from '@mui/material/styles';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BackspaceIcon from '@mui/icons-material/Backspace';
import debounce from 'lodash/debounce';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  borderRadius: '2px',
  boxShadow: 24,
  p: 2,
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export const SearchModal = () => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const debouncedSetSearchText = useCallback(
    debounce((value) => setSearchText(value), 2000),
    []
  );

  const handleSearchChange = (event) => {
    debouncedSetSearchText(event.target.value);
  };

  return (
    <div>
      <SearchIcon onClick={handleOpen} color="inherit" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-name"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <BackspaceIcon sx={{ mb: 2, cursor: 'pointer' }} onClick={handleClose} />
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange}
            />
          </Search>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Productos sugeridos:
          </Typography>
          <Carousel closeModal={handleClose} searchText={searchText} />
        </Box>
      </Modal>
    </div>
  );
};