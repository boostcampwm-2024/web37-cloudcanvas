import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@theme';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App.tsx';
import Root from './Root.tsx';
import { rootLoader } from './apis/loaders.ts';

const router = createBrowserRouter([
    {
        element: <Root />,
        loader: rootLoader,
        path: '/canvas',
        children: [
            {
                index: true,
                element: <App />,
            },
            {
                path: ':id',
                element: <App />,
            },
            {
                path: '*',
                element: <div>Not Found</div>,
            },
        ],
    },
]);
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme} defaultMode="light">
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    </StrictMode>,
);
