import * as React from 'react';
import { Button, Card, CardContent, Chip, Typography, Box, Link } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export const ProductDetails = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        my: 50, // Margin vertical of 50px
      }}
    >
      <Card sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }}>
        <CardContent>
          <Box
            sx={{
              position: 'relative',
              width: '100%', // Or specify a width if needed
              minWidth: 200,
              paddingTop: '56.25%', // 16:9 aspect ratio (height/width * 100)
              overflow: 'hidden',
              borderRadius: 1, // Optional: for rounded corners
              boxShadow: 2, // Optional: for shadow
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
              srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
              loading="lazy"
              alt=""
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
        </CardContent>
        <CardContent>
          <Typography level="body-xs">Bluetooth Headset</Typography>
          <Link
            href="#product-card"
            color='#a0a0a0'
            textColor='rgba(0, 0, 0, 0.87)'
            overlay
            endDecorator={<ArrowOutwardIcon />}
            sx={{ fontWeight: 'md' }}
          >
            Super Rockez A400
          </Link>

          <Typography
            level="title-lg"
            sx={{ mt: 1, fontWeight: 'xl' }}
            endDecorator={
              <Chip component="span" size="sm" variant="soft" color="success">
                Lowest price
              </Chip>
            }
          >
            2,900 THB
          </Typography>
          <Typography level="body-sm">
            (Only <b>7</b> left in stock!)
          </Typography>
        </CardContent>
        <CardContent>
          <Button variant="solid" color="danger" size="lg">
            Add to cart
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}
