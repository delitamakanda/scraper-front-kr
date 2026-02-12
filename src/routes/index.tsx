import { createFileRoute } from '@tanstack/react-router'
import { Stack, Typography } from '@mui/material'
import z from 'zod'
import { Counter } from '~/components/Counter'
import { BrandSelector } from '~/components/core/ui/Selector/Selector'
import {brands} from "~/components/core/ui/Selector/helper";
import React from "react";

export const Route = createFileRoute('/')({
  validateSearch: z.object({
    count: z.number().optional(),
  }),
  component: RouteComponent,
})

export function RouteComponent() {
    const [selectedBrand, handleSelectedBrand] = React.useState(brands[0]);
  return (
    <Stack alignItems="center" role="main">
        <BrandSelector selectedBrand={selectedBrand} onChange={(brand) => handleSelectedBrand(brand)} />
      <Typography variant="h1" marginBlockEnd={4}>
        Hello world!
      </Typography>
      <Counter />
    </Stack>
  )
}
