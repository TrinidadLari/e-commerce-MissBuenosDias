import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { Container, TextField, InputAdornment, IconButton, Button, Box, Typography, Grid } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const Welcome = () => {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.paper, // Use dark mode background color
          color: theme.palette.text.primary, // Use dark mode text color
          padding: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" align="center" gutterBottom>
          Hola! Que lindo verte por aqui
        </Typography>


        <Container maxWidth="sm">
          <Link to="/gridcards" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary, my: 3, width: '100%' }}>
              Ingresar
            </Button>
          </Link>
          <Typography variant="h5" align="center" gutterBottom>
            Iniciar sesión
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="E-mail*"
              type="email"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{ marginBottom: 2 }} // Adjust spacing if needed
            />
            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 2 }} // Adjust spacing if needed
            />
            <Button variant="contained" sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary, my: 3 }}>
              Iniciar sesión
            </Button>
          </Box>

          <Typography variant="h6" align="center" gutterBottom>
            ¿No tienes cuenta?
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Registrarse
          </Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="E-mail*"
              type="email"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{ marginBottom: 2 }} // Adjust spacing if needed
            />
            <TextField
              label="Apodo*"
              type="text"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 2 }} // Adjust spacing if needed
            />
            <TextField
              label="Repetir contraseña"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 2 }} // Adjust spacing if needed
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main, // Use primary color for button
                color: theme.palette.text.primary, // Use text color for button text
                my: 3
              }}
            >
              Registrarse
            </Button>

            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button variant="outlined" sx={{ width: '263px', height: '48px', borderRadius: '100px', borderColor: theme.palette.secondary.main, color: theme.palette.text.secondary, '&:hover': { backgroundColor: theme.palette.background.paper }, boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)' }}>
                  Ingresar con Google
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" sx={{ width: '263px', height: '48px', borderRadius: '100px', borderColor: theme.palette.secondary.main, color: theme.palette.text.secondary, '&:hover': { backgroundColor: theme.palette.background.paper }, boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)', mb: 8 }}>
                  Ingresar con Facebook
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>

      </Box>
    </>
  )
}