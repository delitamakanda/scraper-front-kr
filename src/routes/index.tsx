import { createFileRoute } from '@tanstack/react-router'
import { Stack } from '@mui/material'
import z from 'zod'
import { BrandSelector } from '~/components/core/ui/Selector/Selector'
import {brands} from "~/components/core/ui/Selector/helper";
import React from "react";
import {CookieBanner} from "~/components/cookieBanner/CookieBanner";
import {ModalNewsletter} from "~/components/modalNewsletter/ModalNewsletter";

export const Route = createFileRoute('/')({
  validateSearch: z.object({
    count: z.number().optional(),
  }),
  component: RouteComponent,
})

export function RouteComponent() {
    const [selectedBrand, handleSelectedBrand] = React.useState(brands[0]);
  return (
    <main role="main">
      <Stack alignItems="center">
          <CookieBanner />
          <ModalNewsletter />
          <BrandSelector selectedBrand={selectedBrand} onChange={(brand) => handleSelectedBrand(brand)} />
      </Stack>
    </main>
  )
}
