import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useThemeConfig } from './hooks/useThemeConfig';
import { Welcome } from './pages/Welcome.jsx';
import { MainLayout } from './layout/MainLayout.jsx';
// import { Main } from './layout/Main.jsx';
// import { Header } from './layout/Header.jsx';
// import { Footer } from './layout/Footer.jsx';


function App() {
  const [mode, setMode] = useState('dark');
  const themeConfig = useThemeConfig(mode);
  const theme = createTheme(themeConfig);


  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/*" element={<MainLayout mode={mode} setMode={setMode} />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;


