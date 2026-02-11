import { describe, it, expect } from "vitest";
import { render, screen } from '~/test/test-utils'
import { RouteComponent } from './index'
import { RouterProvider, createMemoryHistory, createRootRoute, createRoute, createRouter } from '@tanstack/react-router'


describe('Index Route', () => {
    it('should render the Index Page', () => {
        const rootRoute = createRootRoute({
            component: () => <RouteComponent />
        })
        const router = createRouter({
            routeTree: rootRoute,
            history: createMemoryHistory({
                initialEntries: ['/'],
            }),
        })
        render(
            <RouterProvider router={router} />
        )
        expect(screen.getByRole('main')).toBeInTheDocument()
    })
})