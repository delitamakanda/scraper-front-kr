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
