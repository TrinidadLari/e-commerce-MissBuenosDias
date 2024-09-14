import React, { useState, useContext } from 'react';
import { useTheme } from '@mui/material';
import { Container, TextField, InputAdornment, IconButton, Button, Box, Typography, Grid } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { AuthContext } from '../context/AuthContext';

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const { register, error } = useContext(AuthContext);
  const theme = useTheme();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      await register(email, password);
    } catch (err) {
      console.error('Error durante el registro:', err);
    }
  };

  return (
    <Container maxWidth="100vw" sx={{ backgroundColor: "background.paper" }}>
      <Typography variant="h5" align="center" >
        Iniciar sesión
      </Typography>
      <Typography sx={{ fontSize: '12px' }} align="center" gutterBottom>
        (para poder concretar tu compra)
      </Typography>
      <Box component="form" maxWidth="80vw" m="auto" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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

      <Typography sx={{ fontSize: '12px' }} align="center">
        ¿No tienes cuenta?
      </Typography>
      <Typography variant="h5" align="center">
        Registrarse
      </Typography>
      <Box component="form" maxWidth="80vw" m="auto" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleRegister}>
        <TextField
          label="E-mail*"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Apodo*"
          type="text"
          variant="outlined"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Repetir contraseña"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          sx={{ marginBottom: 2 }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
            my: 3,
          }}
        >
          Registrarse
        </Button>
      </Box>
    </Container>
  );
};
