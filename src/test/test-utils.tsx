import React, { ReactElement } from "react";
import { render, RenderOptions} from "@testing-library/react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme()

const providers = ({children}: { children: ReactElement }) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
)

const customRender = (ui: ReactElement, options?: RenderOptions) => {
    return render(providers({ children: ui }), options)
}
export * from "@testing-library/react";
export { customRender as render };