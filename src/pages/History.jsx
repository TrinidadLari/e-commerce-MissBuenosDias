import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@mui/material';
import { Link } from 'react-router-dom';


export const History = () => {


  return (
    <>
      <Box sx={{ padding: 2, backgroundColor: 'background.paper', }}>
        <Typography variant="h4" gutterBottom sx={{
          padding: 2, textAlign: 'center'
        }}>
          Historial de Compras
        </Typography>


        return (
        <Box
          sx={{
            marginBottom: 2,
            padding: 2,
            border: '1px solid #ddd',
            borderRadius: '2px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Fecha: { }
          </Typography>
          <List>

            <ListItem divider>
              <ListItemAvatar>
                <Avatar src={""} />
              </ListItemAvatar>
              <ListItemText
                primary={""}
                secondary={`Cantidad: ${""} - Precio: $${""}`}
              />
            </ListItem>
            )
          </List>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Total de la compra: ${""}
          </Typography>
        </Box>


        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            my: 4
          }}
        >
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/gridcards`}
            sx={{ px: 10 }}
          >
            Volver a galería
          </Button>
        </Box>
      </Box>

    </>

  );

}
