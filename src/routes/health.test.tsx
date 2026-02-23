import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '~/test/test-utils'
import { RouteComponent } from './health'
import { RouterProvider, createMemoryHistory, createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import '@testing-library/jest-dom'
import { Outlet } from '@tanstack/react-router'

const mockHealthData = {
  status: 'ok',
  timestamp: '2026-01-01T00:00:00.000Z',
  uptime: 120,
}

describe('Health Route', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockHealthData,
    }))
  })

  it('should render the Health Status page', async () => {
    const rootRoute = createRootRoute({
      component: () => <Outlet />,
    })
    const healthRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/health',
      component: RouteComponent,
    })
    const routeTree = rootRoute.addChildren([healthRoute])
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ['/health'] }),
    })
    render(<RouterProvider router={router} />)
    await waitFor(() => {
      expect(screen.getByText('Health Status')).toBeInTheDocument()
    }, { timeout: 5000 })
  })
})
