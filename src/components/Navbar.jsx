import * as React from 'react';
import { useState } from 'react';
import { SearchModal } from './SearchModal';
import { ThemeToggleBtn } from './ThemeToggleBtn';
import { CartDrawer } from './CartDrawer';
import { UserDrawer } from './UserDrawer';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { Search as SearchIcon, AccountCircle, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';



export const Navbar = ({ mode, setMode }) => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);

  const handleCartDrawerToggle = () => {
    setCartDrawerOpen(!cartDrawerOpen);
  };

  const handleUserDrawerToggle = () => {
    setUserDrawerOpen(!userDrawerOpen);
  };

  const handleCartOpen = () => {
    setUserDrawerOpen(false);
    setCartDrawerOpen(true);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'start' }}>
            <ThemeToggleBtn currentMode={mode} setMode={setMode} />
          </Box>

          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconButton>
              <SearchModal />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleCartDrawerToggle}
            >
              <Badge badgeContent={17} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              color="inherit"
              onClick={handleUserDrawerToggle}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <CartDrawer open={cartDrawerOpen} onClose={handleCartDrawerToggle} />
      <UserDrawer open={userDrawerOpen} onClose={handleUserDrawerToggle} onCartOpen={handleCartOpen} />

    </Box>
  );
}