import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { WidthFull } from '@mui/icons-material';
import imageCover from '../assets/images/cover.png';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '80%',
});

export const Cover = () => {
  return (
    <Box
      sx={{
        margin: 'auto',
        maxWidth: '100%',
        flexGrow: 1,
        position: 'relative',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >

      <Box item sx={{ width: '100%', backgroundColor: 'black', position: 'relative', }}>
        {/* <ButtonBase > */}
        <Img alt="complex" src={imageCover} />
        {/* </ButtonBase> */}
      </Box>
      <Typography color="white" sx={{
        position: 'absolute', top: '60%', left: '3%', fontSize: {
          sm: 'h5.fontSize',
          md: 'h4.fontSize',
          xl: 'h3.fontSize',
        }
      }} >
        Miss Buenos días
      </Typography>
      {/* <Button variant="contained" sx={{
        position: 'absolute', top: '60%',
        left: '8%', height: {
          xs: 30,
          md: 50,
        }
      }} > Ir de Shopping</Button> */}
    </Box >
  );
}
