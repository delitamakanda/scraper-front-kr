import { createFileRoute } from '@tanstack/react-router'
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from '@mui/material/CardActionArea';
import CircularProgress from '@mui/material/CircularProgress'
import { useProducts } from '~/hooks/useProducts';
import Alert from '@mui/material/Alert'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useFavorites} from "~/hooks/useFavorites";
import {ProductData} from "~/interfaces/products";
import React from "react";
import {IconButton} from "@mui/material";

export const Route = createFileRoute('/favorite-products')({
  component: RouteComponent,
})

function RouteComponent() {
  const { favorites, isLoading, isError, error, isProductFavorited, toggleFavoriteProduct } = useFavorites();

  const onToggleFavorite = (event: React.MouseEvent<HTMLButtonElement>, product: Partial<ProductData>) => {
    event.preventDefault();
    if (!product.id) {
      return;
    }
    toggleFavoriteProduct(product.id)
  }
  return (
      <Box sx={{ width: '100%', p: 3 }}>
        {isError && error && <Alert severity="error">{error.message}</Alert>}

        {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>}

        <Grid2 container spacing={3}>
          {favorites.map((product: Partial<ProductData>, _: number) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={_}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
                  <CardActionArea component="a" href={product.external_link} target="_blank" rel="noreferrer" tabIndex={product.id}>
                    <CardMedia
                      component="img"
                      alt={product.name}
                      image={product.image_url}
                      sx={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary" gutterBottom>{product.name}</Typography>
                      <IconButton size="small" color="primary" onClick={(event) => onToggleFavorite(event, product)}>
                        {product.is_liked || isProductFavorited(product.id)? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid2>
          ))}
        </Grid2>
      </Box>)
}
