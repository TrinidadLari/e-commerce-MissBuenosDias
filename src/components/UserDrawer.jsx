import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { GoToLogin } from './GoToLogin';
import { Link } from 'react-router-dom';
import { Fav } from './Fav';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';

export const UserDrawer = ({ open, onClose, onCartOpen }) => {
  const { user, nickname, signOut } = useContext(AuthContext);
  const [favOpen, setFavOpen] = useState(false);

  const handleSignOutClick = async () => {
    await signOut();
    onClose();
  };

  const handleCartClick = () => {
    onClose();
    onCartOpen();
  };

  const handleFavClick = () => {
    onClose();
    setFavOpen(true);
  };

  const handleFavClose = () => {
    setFavOpen(false);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleCartClick}>
            <ListItemText primary="Compras Pendientes" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleFavClick}>
            <ListItemText primary="Favoritos" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <Link to="/history" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
              <ListItemText primary="Historial" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
              <ListItemText primary={`Perfil de ${nickname}`} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleSignOutClick}>
            <ListItemText primary="Cerrar sesión" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={onClose}
        onOpen={() => { }}
      >
        <Box p={2}>
          {user ? (
            <>
              {list()}
            </>
          ) : (
            <GoToLogin />
          )}
        </Box>
      </SwipeableDrawer>
      <Fav open={favOpen} onClose={handleFavClose} />
    </>
  );
}
