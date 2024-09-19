import React, { useContext, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { Cover } from '../components/Cover';
import { NotFound } from '../components/NotFound';
import { FiltersSelect } from '../components/FiltersSelect';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ButtonBase, Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

export const GridCards = () => {
  const { products, error } = useContext(ProductsContext);
  const [catFilter, setCatFilter] = useState("");

  if (error) return <NotFound />;

  const catFiltered = products.filter((product) =>
    catFilter === "" || product.cat === catFilter
  );

  return (
    <>
      <Cover />
      <FiltersSelect value={catFilter} onFilterChange={setCatFilter} />
      <Grid container gap={5} justifyContent="center" sx={{ backgroundColor: "background.default", py: 4, m: 0 }} >
        {catFiltered.length > 0 ? (
          catFiltered.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} display="flex" justifyContent="center">
              <ButtonBase component={Link} to={`/productdetails/${product.id}`} sx={{ width: '100%' }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={product.image}
                    alt={product.name}
                  />
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    checked={product.like}
                    disabled
                    sx={{ color: 'background.default', '&.Mui-checked': { color: '#32234e' } }} />
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography gutterBottom variant="h5" component="div">
                        {product.name} 💠
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        ${product.price}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {product.stock} Disponibles
                    </Typography>
                  </CardContent>
                </Card>
              </ButtonBase>
            </Grid>
          ))
        ) : (
          <NotFound />
        )}
      </Grid>
    </>
  );
}

