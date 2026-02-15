import React, { ReactElement } from "react";
import { render, RenderOptions, screen, waitFor } from "@testing-library/react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme()

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
        },
    },
})

const providers = ({children}: { children: ReactElement }) => (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    </QueryClientProvider>
)

const customRender = (ui: ReactElement, options?: RenderOptions) => {
    return render(providers({ children: ui }), options)
}
export * from "@testing-library/react";
export { customRender as render, screen, waitFor };