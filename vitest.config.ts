import { defineConfig } from 'vitest/config'
import viteReact from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [viteReact()],
    test: {
        globals: true,
        environment: 'jsdom',
        css: true,
        setupFiles: ['./src/test/setup.ts'],
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname,'src'),
        },
    },
})