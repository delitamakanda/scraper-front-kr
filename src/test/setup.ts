import '@testing-library/jest-dom'

import {afterEach, vi } from "vitest";

import { cleanup } from "@testing-library/react";

afterEach(() => {
    cleanup();
});

vi.stubGlobal('import', () => ({
    meta: {
        env: {
            VITE_BASE_API_URL: 'https://kf.applikuapp.com/api'
        }
    }
}))

vi.mock('@tanstack/react-router', async () => {
    const actualRouter = await vi.importActual('@tanstack/react-router')
    return {
        ...actualRouter,
        useRouter: () => ({
            isServer: false,
            state:{
                location: {
                    pathname: '/',
                }
            },
        }),
        useRouterState: () => ({
            location: {
                pathname: '/',
            }
        })

    }
})