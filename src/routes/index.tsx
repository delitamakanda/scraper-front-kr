import { createFileRoute } from '@tanstack/react-router'
import {IconButton, Stack} from '@mui/material'
import z from 'zod'
import { BrandSelector } from '~/components/core/ui/Selector/Selector'
import {brands} from "~/components/core/ui/Selector/helper";
import React from "react";
import {CookieBanner} from "~/components/cookieBanner/CookieBanner";
import {ModalNewsletter} from "~/components/modalNewsletter/ModalNewsletter";
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from '@mui/material/CircularProgress'
import { useProducts } from '~/hooks/useProducts';
import Alert from '@mui/material/Alert'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Pagination from "@mui/material/Pagination";

export const Route = createFileRoute('/')({
  validateSearch: z.object({
    count: z.number().optional(),
  }),
  component: RouteComponent,
})

interface ProductData {
    id: number;
    name: string;
    image_url: string;
    available: boolean;
    description: string;
    external_link: string;
    image: string;
    is_liked: boolean;
    next_item: {id: number; name: string} | null;
    previous_item: {id: number, name:string } | null;
    price: string;
    source: string;
    stock: number;
}

export function RouteComponent() {
    const [selectedBrand, handleSelectedBrand] = React.useState(brands[0]);
    const { isFetching, isError, error, products, hasNextPage, setSearchValue, page, setPage } = useProducts();

  return (
    <main role="main">
      <Stack alignItems="center">
          <CookieBanner />
          <ModalNewsletter />
          <BrandSelector selectedBrand={selectedBrand} onChange={(brand) => {
              handleSelectedBrand(brand)
              setSearchValue(brand)
              setPage(1)
          }} />
          {isError && <Alert severity="error">{error?.message}</Alert>}

          {isFetching && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>}

          <Box sx={{ width: '100%', p: 3 }}>
              <Grid2 container spacing={3}>
                  {products.map((product: Partial<ProductData>, _: number) => (
                      <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={_}>
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
                          <CardMedia
                              component="img"
                              alt={product.name}
                              image={product.image_url}
                              sx={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                          />
                          <CardContent sx={{ flexGrow: 1}}>
                              <Typography variant="body2" color="text.secondary">
                                  {product.name}
                              </Typography>
                              <IconButton size="small" color="primary">
                                  {product.is_liked? <FavoriteIcon /> : <FavoriteBorderIcon />}
                              </IconButton>
                          </CardContent>
                      </Card>
                      </Grid2>
                  ))}
              </Grid2>
              {hasNextPage && (
                  <Pagination
                      count={Math.ceil(products.length)}
                      page={page}
                      onChange={(_, page) => setPage(page)}
                      sx={{ mt: 3, mb: 3, display: 'flex', justifyContent: 'center' }}
                      />)}
          </Box>
      </Stack>
    </main>
  )
}
