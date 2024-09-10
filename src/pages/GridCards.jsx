import React from 'react';
import { Cover } from '../components/Cover';
import { FiltersSelect } from '../components/FiltersSelect';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ButtonBase } from '@mui/material';

export const GridCards = () => {
  const cards = [
    { title: 'Card 1', image: 'https://via.placeholder.com/150', description: 'This is the first card' },
    { title: 'Card 2', image: 'https://via.placeholder.com/150', description: 'This is the second card' },
    { title: 'Card 3', image: 'https://via.placeholder.com/150', description: 'This is the third card' },
    { title: 'Card 4', image: 'https://via.placeholder.com/150', description: 'This is the fourth card' },
    { title: 'Card 1', image: 'https://via.placeholder.com/150', description: 'This is the first card' },
    { title: 'Card 2', image: 'https://via.placeholder.com/150', description: 'This is the second card' },
    { title: 'Card 3', image: 'https://via.placeholder.com/150', description: 'This is the third card' },
    { title: 'Card 4', image: 'https://via.placeholder.com/150', description: 'This is the fourth card' },
    { title: 'Card 1', image: 'https://via.placeholder.com/150', description: 'This is the first card' },
    { title: 'Card 2', image: 'https://via.placeholder.com/150', description: 'This is the second card' },
    { title: 'Card 3', image: 'https://via.placeholder.com/150', description: 'This is the third card' },
    { title: 'Card 4', image: 'https://via.placeholder.com/150', description: 'This is the fourth card' },
    // Añade más tarjetas según sea necesario
  ];

  return (
    <>
      <Cover />
      <FiltersSelect />
      <Grid container gap={5} justifyContent="center" sx={{ backgroundColor: "background.default", py: 4, m: 0 }} >
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index} display="flex"
            justifyContent="center">
            <ButtonBase >
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="240"
                  image={card.image}
                  alt={card.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
