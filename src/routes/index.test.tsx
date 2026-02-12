import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from '~/test/test-utils'
import { RouteComponent } from './index'
import { RouterProvider, createMemoryHistory, createRootRoute, createRoute, createRouter } from '@tanstack/react-router'


describe('Index Route', () => {
    it('should render the Index Page', async () => {
        const rootRoute = createRootRoute()
        const indexRoute = createRoute({
            getParentRoute: () => rootRoute,
            path: '/',
            component: RouteComponent
        })
        const routeTree = rootRoute.addChildren([indexRoute])
        const router = createRouter({
            routeTree: routeTree,
            history: createMemoryHistory({
                initialEntries: ['/'],
            }),
        })
        render(
            <RouterProvider router={router} />
        )
        await waitFor(() => {
            expect(screen.getByRole('main')).toBeInTheDocument()
        })
    })
})