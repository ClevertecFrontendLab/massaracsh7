import './index.css';

import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from '~/app/App.tsx';
import { store } from '~/store/configure-store.ts';

import theme from './theme';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <CSSReset />
                <App />
            </ChakraProvider>
        </Provider>
    </StrictMode>,
);
