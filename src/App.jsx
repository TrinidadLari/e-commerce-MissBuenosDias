import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useThemeConfig } from './hooks/useThemeConfig';
import { Navbar } from './components/Navbar.jsx'
import { Cover } from './components/Cover.jsx';
import { FilterSharp } from '@mui/icons-material';
import { FiltersSelect } from './components/FiltersSelect.jsx';
// import { ThemeToggleBtn } from './components/ThemeToggleBtn.jsx';
import { GridCards } from './components/GridCards.jsx'


function App() {
  const [mode, setMode] = useState('light');
  const themeConfig = useThemeConfig(mode);
  const theme = createTheme(themeConfig);


  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar mode={mode} setMode={setMode} />
      <Cover />
      <FiltersSelect />
      <GridCards sx={{ backgroundColor: "background.default" }} />
      {/* <ThemeToggleBtn currentMode={mode} setMode={setMode} /> */}
    </ThemeProvider>

  );
}

export default App;


