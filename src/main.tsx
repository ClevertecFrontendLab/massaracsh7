import './index.css';

import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from '~/app/App.tsx';
import { store } from '~/store/configure-store.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ChakraProvider>
                <CSSReset />
                <App />
            </ChakraProvider>
        </Provider>
    </StrictMode>,
);
