import { defineStyleConfig, extendTheme } from '@chakra-ui/react';

const Heading = defineStyleConfig({
    defaultProps: {
        size: '',
    },
    variants: {
        pageTitle: {
            fontWeight: 700,
            fontSize: {
                base: '24px',
                sm: '24px',
                md: '24px',
                lg: '48px',
                xl: '48px',
            },
            lineHeight: {
                base: '32px',
                sm: '32px',
                md: '32px',
                lg: '48px',
                xl: '48px',
            },
            textAlign: 'center',
        },

        sectionTitle: {
            fontWeight: 500,
            fontSize: {
                base: '24px',
                sm: '24px',
                md: '24px',
                lg: '36px',
                xl: '48px',
            },
            lineHeight: {
                base: '32px',
                sm: '32px',
                md: '32px',
                lg: '40px',
                xl: '48px',
            },
        },
        sliderTitle: {
            fontWeight: 500,
            fontSize: {
                base: '16px',
                sm: '16px',
                md: '16px',
                lg: '18px',
                xl: '20px',
            },
            lineHeight: {
                base: '24px',
                sm: '24px',
                md: '24px',
                lg: '28px',
                xl: '28px',
            },
        },
    },
});

const theme = extendTheme({
    breakpoints: {
        base: '0px',
        sm: '360px',
        md: '768px',
        lg: '1440px',
        xl: '1920px',
        '2xl': '1930px',
    },
    fonts: {
        heading: `'Inter', sans-serif`,
        body: `'Inter', sans-serif`,
        secondary: `'Roboto', sans-serif`,
    },
    radii: {
        mini: '4px',
        small: '6px',
        medium: '8px',
        large: '12px',
    },
    fontSizes: {
        sm: '12px',
        md: '14px',
        lg: '16px',
        xlg: '18px',
    },
    lineHeights: {
        short: '16px',
        middle: '20px',
        large: '22px',
    },
    styles: {
        global: {
            body: {
                fontFamily: 'Inter, sans-serif',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '20px',
                color: 'text',
                bg: 'background',
            },
        },
    },
    colors: {
        background: '#fff',
        text: '#000',
        secondaryText: 'rgba(0, 0, 0, 0.64)',
        grayText: 'rgba(0, 0, 0, 0.48)',
        lightText: 'rgba(0, 0, 0, 0.24)',

        customLime: {
            50: '#ffffd3',
            100: '#eaffc7',
            150: '#d7ff94',
            300: '#c4ff61',
            400: '#b1ff2e',
            600: '#2db100',
            800: '#134b00',
        },
    },
    shadows: {
        base: '0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)',
        menu: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    borders: {
        card: '1px solid rgba(0, 0, 0, 0.08)',
        green: '1px solid #2db100',
    },

    components: {
        Heading,
    },
});

export default theme;
