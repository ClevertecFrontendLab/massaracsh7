import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    fonts: {
        heading: `'Inter', sans-serif`,
        body: `'Inter', sans-serif`,
        secondary: `'Roboto', sans-serif`,
    },
    styles: {
        global: {
            body: {
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '1.42857',
                color: 'text',
                bg: 'background',
            },
        },
    },
    colors: {
        background: '#fff',
        text: '#000',
        secondaryText: 'rgba(0, 0, 0, 0.64)',
        customLime: {
            50: '#ffffd3',
            150: '#d7ff94',
            300: '#c4ff61',
            400: '#b1ff2e',
            800: '#134b00',
        },
    },
});

export default theme;
