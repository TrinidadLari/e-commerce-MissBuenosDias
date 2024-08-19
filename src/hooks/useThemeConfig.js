import { useMemo } from 'react';
import { grey } from '@mui/material/colors';

const createThemeConfig = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        primary: {
      main: '#F5DD61',
    },
    secondary: {
      main: '#FF7D29',
    },
    background: {
      default: '#fbfdf7',
      paper: '#f9f5e3',
    },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
           primary: {
      main: '#2E236C',
    },
          secondary: {
      main: '#C8ACD6',
    },
    background: {
      default: '#32234e',
      paper: '#7770cb',
    },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
});

export const useThemeConfig = (mode) => {
  return useMemo(() => createThemeConfig(mode), [mode]);
};