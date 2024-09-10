import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import Brightness7Icon from '@mui/icons-material/Brightness5';


export const ThemeToggleBtn = ({ currentMode, setMode }) => {

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setMode(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={currentMode}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="light"><Brightness7Icon /></ToggleButton>
      <ToggleButton value="dark"><Brightness3Icon /></ToggleButton>
    </ToggleButtonGroup>
  );
};


