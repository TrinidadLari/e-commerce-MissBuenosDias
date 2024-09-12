import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { ProductsContext } from '../context/ProductsContext';
import { NotFound } from '../components/NotFound';

import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const ProductDetails = () => {
  const { id } = useParams(); // Obtén el id del producto desde la URL
  const { products } = useContext(ProductsContext);

  const product = products.find((p) => p.id === id);
  if (!product) {
    return <NotFound />;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        my: 5,
      }}
    >
      <Card sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }}>
        <CardContent>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              minWidth: 200,
              paddingTop: '56.25%',
              overflow: 'hidden',
              borderRadius: 1,
              boxShadow: 2,
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
            />
          </Box>
        </CardContent>
        <CardContent>
          <Typography sx={{ fontSize: '20px' }}>{product.name}</Typography>
          <Typography sx={{ fontSize: '12px' }}>{product.description}</Typography>
          <Typography
            sx={{ mt: 1, fontWeight: 'xl' }}
          >
            ${product.price}
          </Typography>
          <Typography sx={{ fontSize: '12px' }}>
            (Quedan solo <b>{product.stock}</b> en stock!)
          </Typography>
        </CardContent>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" sx={{ fontSize: '12px' }}>
            Volver
          </Button>
          <Button variant="contained" sx={{ fontSize: '12px' }}>
            Agregar al carrito
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}
