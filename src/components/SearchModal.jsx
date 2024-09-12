import * as React from 'react';
import { useState, useCallback } from 'react';
import { Carousel } from './Carousel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled, alpha } from '@mui/material/styles';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash/debounce'; // Asegúrate de tener lodash instalado

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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

  // Utilizar debounce para manejar el texto de búsqueda
  const debouncedSetSearchText = useCallback(
    debounce((value) => setSearchText(value), 2000), // 2 segundos de espera
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


// const filteredByName = products.filter(
//   (product) =>
//     nameFilter === "" ||
//     product.name.toLowerCase().includes(nameFilter.toLowerCase())
// );

{/* <TextField
  id="filled-basic"
  label="Search"
  variant="filled"
  color="primary"
  focused
  onChange={handleNameChange}
  sx={{
    width: { xs: "100px", md: "200px" },
  }}
/> */}