import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Popover from '@mui/material/Popover';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NotFound } from '../components/NotFound';

export const Profile = () => {
  const { user, nickname, signOut } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if (!user) {
    return <NotFound />;
  }

  const userData = {
    email: user.email,
    nickname: nickname,
    createdAt: user.metadata.creationTime,
  };

  return (
    <Box
      sx={{
        margin: 'auto',
        padding: 3,
        paddingBlock: 12,
        boxShadow: 3,
        backgroundColor: 'background.paper',
        textAlign: 'center',
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item>

        </Grid>
        <Grid item xs>
          <Typography variant="h2" gutterBottom>
            {userData.nickname}
          </Typography>
          <Typography variant="h5" color="textSecondary">
            {userData.email}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Miembro desde: {new Date(userData.createdAt).toLocaleDateString('es-ES')}
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={handleClick}>
          Editar Perfil
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>Este sector sigue en construcción 🛠️</Typography>
        </Popover>
        <Button variant="outlined" color="secondary" onClick={signOut}>
          Cerrar Sesión
        </Button>
      </Box>
      <Button variant="contained" color="primary" component={Link} to={`/gridcards`} sx={{ my: 2, px: 10 }} >
        Volver a galería
      </Button>
    </Box>
  );
};