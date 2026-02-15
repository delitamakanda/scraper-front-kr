/// <reference types="vite/client" />
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CacheProvider } from '@emotion/react'
import { Container, CssBaseline, ThemeProvider } from '@mui/material'
import createCache from '@emotion/cache'
import fontsourceVariableRobotoCss from '@fontsource-variable/roboto?url'
import React from 'react'
import { theme } from '~/setup/theme'
import { Header } from '~/components/Header'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
        },
      },
})

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: 'stylesheet', href: fontsourceVariableRobotoCss }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function Providers({ children }: { children: React.ReactNode }) {
  const emotionCache = createCache({ key: 'css' })

  return (
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers>
          <Header />

          <Container component="main" sx={{ paddingBlock: 4 }}>
            {children}
          </Container>
        </Providers>

        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
