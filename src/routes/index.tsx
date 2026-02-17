import { createFileRoute } from '@tanstack/react-router'
import { Stack } from '@mui/material'
import z from 'zod'
import { BrandSelector } from '~/components/core/ui/Selector/Selector'
import {brands} from "~/components/core/ui/Selector/helper";
import React from "react";
import {CookieBanner} from "~/components/cookieBanner/CookieBanner";
import {ModalNewsletter} from "~/components/modalNewsletter/ModalNewsletter";
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import CircularProgress from '@mui/material/CircularProgress'
import { useProducts } from '~/hooks/useProducts';
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import Alert from '@mui/material/Alert'

export const Route = createFileRoute('/')({
  validateSearch: z.object({
    count: z.number().optional(),
  }),
  component: RouteComponent,
})

export function RouteComponent() {
    const [selectedBrand, handleSelectedBrand] = React.useState(brands[0]);
    const { isFetching, isError, error, products, hasNextPage, setSearchValue, setPage } = useProducts();
    const columns: GridColDef[] = [
        {
            field: 'image_url',
            headerName: 'Image',
            width: 100,
            renderCell: (params) => (
                <Box component="img" src={params.value} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover'}} />
            ),
        }
    ];
    const rows = products.map((product: any, _: number) => ({...product, id: _ }));
  return (
    <main role="main">
      <Stack alignItems="center">
          <CookieBanner />
          <ModalNewsletter />
          <BrandSelector selectedBrand={selectedBrand} onChange={(brand) => handleSelectedBrand(brand)} />
          {isError && <Alert severity="error">{error?.message}</Alert>}

          {isFetching && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>}

          <Box sx={{ width: '100%', p: 3 }}>
              <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSizeOptions={[5, 10, 20]}
                  initialState={{
                      pagination: {
                          paginationModel: { pageSize: 10, page: 0 }
                      }
                  }}
                  disableRowSelectionOnClick
                  sx={{
                      '& .MuiDataGrid-cell': {
                          display: 'flex',
                          alignItems: 'center',
                      }
                  }}
                  loading={isFetching}
              />
          </Box>
      </Stack>
    </main>
  )
}
