import { createFileRoute } from '@tanstack/react-router'
import { Typography } from '@mui/material'
import React from "react"

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <React.Fragment>
        <Typography variant="h2">About</Typography>
        <Typography>This is the About page.</Typography>
        {/* Add more content as needed */}
      </React.Fragment>
  )
}
