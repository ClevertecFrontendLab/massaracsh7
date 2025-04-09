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
        cardTitle: {
            fontWeight: 500,
            fontSize: {
                base: '16px',
                sm: '16px',
                md: '16px',
                lg: '20px',
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

export const Button = defineStyleConfig({
    baseStyle: {
        borderRadius: 'small',
        fontWeight: '600',
    },
    variants: {
        limeSolid: {
            bg: 'customLime.400',
            color: 'black',
            _hover: {
                bg: 'customLime.500',
            },
        },
        whiteOutline: {
            bg: 'white',
            border: '1px solid',
            borderColor: 'black',
            color: 'black',
            fontSize: { base: '12px', sm: '12px', md: '12px', lg: '14px', xl: '14px' },
            lineHeight: { base: '12px', sm: '12px', md: '12px', lg: '20px', xl: '20px' },
            px: { base: '6px', sm: '6px', md: '6px', lg: '12px', xl: '12px' },
            py: { base: '6px', sm: '6px', md: '6px', lg: '6px', xl: '6px' },
            height: { base: '24px', sm: '24px', md: '24px', lg: '32px', xl: '32px' },
        },
        blackSolid: {
            bg: 'black',
            color: 'white',
            fontSize: { base: '12px', sm: '12px', md: '12px', lg: '14px', xl: '14px' },
            lineHeight: { base: '16px', sm: '16px', md: '16px', lg: '20px', xl: '20px' },
            px: { base: '8px', sm: '8px', md: '26px 8px', lg: '12px' },
            py: { base: '4px', sm: '4px', md: '4px', lg: '6px' },
            height: { base: '24px', sm: '24px', md: '24px', lg: '32px', xl: '32px' },
        },
    },
    sizes: {
        medium: {
            fontSize: '16px',
            lineHeight: '24px',
            px: '24px',
            py: '10px',
        },
        large: {
            fontSize: { base: '16px', xl: '18px', '2xl': '18px' },
            lineHeight: { base: '24px', xl: '28px', '2xl': '28px' },
            px: { base: '16px', xl: '24px', '2xl': '24px' },
            py: { base: '8px', xl: '10px', '2xl': '10px' },
        },
    },
});

const Badge = defineStyleConfig({
    baseStyle: {
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: '400',
        borderRadius: 'mini',
        color: 'text',
    },
    variants: {
        lime50: {
            bg: 'customLime.50',
        },
        lime150: {
            bg: 'customLime.150',
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
    layerStyles: {
        radialBg: {
            bg: 'radial-gradient(62.5% 62.5% at 48.89% 37.5%, rgba(196, 255, 97, 0.5) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 211, 0.7)',
        },
        radialAsideBg: {
            bg: 'radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%);radial-gradient(62.5% 62.5% at 48.89% 37.5%, rgba(196, 255, 97, 0.5) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 211, 0.7)',
        },
    },

    textStyles: {
        nav: {
            fontSize: 'lg',
            lineHeight: '24px',
            fontWeight: '400',
            color: 'text',
        },
        navActive: {
            fontSize: 'lg',
            lineHeight: '24px',
            fontWeight: '700',
            color: 'text',
        },
        navInactive: {
            fontSize: 'lg',
            lineHeight: '24px',
            fontWeight: '400',
            color: 'secondaryText',
        },
        limeSmall: {
            fontWeight: 600,
            fontSize: 'sm',
            lineHeight: '16px',
            color: 'customLime.600',
        },
        limeLg: {
            fontWeight: 600,
            fontSize: 'lg',
            lineHeight: '24px',
            color: 'customLime.600',
        },
    },

    components: {
        Heading,
        Button,
        Badge,
        Link: {
            baseStyle: {
                textDecoration: 'none',
            },
            variants: {
                nav: {
                    textStyle: 'nav',
                },
                navActive: {
                    textStyle: 'navActive',
                },
                navInactive: {
                    textStyle: 'navInactive',
                },
            },
        },
        BreadcrumbLink: {
            baseStyle: {
                textDecoration: 'none',
            },
            variants: {
                nav: {
                    textStyle: 'nav',
                },
                navActive: {
                    textStyle: 'navActive',
                },
                navInactive: {
                    textStyle: 'navInactive',
                },
            },
        },
    },
});

export default theme;
