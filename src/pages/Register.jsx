import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '@mui/material';
import { Container, TextField, InputAdornment, IconButton, Button, Box, Typography, Grid } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export const Register = () => {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerNickname, setRegisterNickname] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const { register, signIn, error } = useContext(AuthContext);
  const theme = useTheme();
  const navigate = useNavigate();


  const togglePasswordVisibility = (setter) => {
    setter(prev => !prev);
  };


  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signIn(signInEmail, signInPassword);
      navigate('/gridcards');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      await register(registerEmail, registerPassword, registerNickname);
      navigate('/gridcards');
    } catch (err) {
      console.error('Error durante el registro:', err);
      alert('Error durante el registro. Por favor, intenta nuevamente.');
    }
  };

  return (
    <Container maxWidth="100vw" sx={{ backgroundColor: "background.paper" }}>
      <Typography variant="h5" align="center">
        Iniciar sesión
      </Typography>
      <Typography sx={{ fontSize: '12px' }} align="center" gutterBottom>
        (para poder concretar tu compra)
      </Typography>
      <Box component="form" maxWidth="80vw" m="auto" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSignIn}>
        <TextField
          label="E-mail*"
          type="email"
          variant="outlined"
          value={signInEmail}
          onChange={(e) => setSignInEmail(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Contraseña"
          type={showSignInPassword ? "text" : "password"}
          variant="outlined"
          value={signInPassword}
          onChange={(e) => setSignInPassword(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => togglePasswordVisibility(setShowSignInPassword)}>
                  {showSignInPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" type="submit" sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary, my: 3 }}>
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
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Apodo*"
          type="text"
          variant="outlined"
          value={registerNickname}
          onChange={(e) => setRegisterNickname(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Contraseña"
          type={showRegisterPassword ? "text" : "password"}
          variant="outlined"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => togglePasswordVisibility(setShowRegisterPassword)}>
                  {showRegisterPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Repetir contraseña"
          type={showRegisterPassword ? "text" : "password"}
          variant="outlined"
          value={registerConfirmPassword}
          onChange={(e) => setRegisterConfirmPassword(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => togglePasswordVisibility(setShowRegisterPassword)}>
                  {showRegisterPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
