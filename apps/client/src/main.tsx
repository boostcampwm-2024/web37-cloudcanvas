import { CanvasProvider } from '@contexts/CanvasContext.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@theme';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { CanvasInstanceProvider } from '@contexts/CanvasInstanceContext.tsx';
import { initialState } from '@/src/mocks.ts';
import { CanvasDimensionProvider } from '@contexts/CanvasDimensionContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme} defaultMode="light">
            <CssBaseline />
            <CanvasDimensionProvider>
                <CanvasProvider>
                    <CanvasInstanceProvider initialState={initialState}>
                        <App />
                    </CanvasInstanceProvider>
                </CanvasProvider>
            </CanvasDimensionProvider>
        </ThemeProvider>
    </StrictMode>,
);
