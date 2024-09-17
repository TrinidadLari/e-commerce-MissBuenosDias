import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

export const ProductDetails = () => {
  const { id } = useParams();
  const { products, toggleLike } = useContext(ProductsContext);
  const { addProduct } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    setProduct(foundProduct);
  }, [id, products]);

  const handleLikeChange = () => {
    if (product) {
      toggleLike(id, product.like);
    }
  };

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <Box display="flex" justifyContent="center" py={5} sx={{ backgroundColor: "background.default" }}>
      <Card sx={{ width: 320 }}>
        <CardContent>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%',
              overflow: 'hidden',
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
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={product.like}
            onChange={handleLikeChange}
          />
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="body2">{product.description}</Typography>
          <Typography variant="h6">${product.price}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" sx={{ fontSize: '12px' }} component={Link} to={`/gridcards`}>
              Volver
            </Button>
            <Button variant="contained" sx={{ fontSize: '12px' }} onClick={() => addProduct(product)}>
              Agregar al carrito
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
