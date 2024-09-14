import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useThemeConfig } from './hooks/useThemeConfig';
import { Welcome } from './pages/Welcome.jsx';
import { MainLayout } from './layout/MainLayout.jsx';


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


