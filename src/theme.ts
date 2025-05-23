import { cardAnatomy } from '@chakra-ui/anatomy';
import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyleConfig, extendTheme } from '@chakra-ui/react';
const {
    definePartsStyle: defineCardPartsStyle,
    defineMultiStyleConfig: defineCardMultiStyleConfig,
} = createMultiStyleConfigHelpers(cardAnatomy.keys);

const {
    definePartsStyle: defineModalPartsStyle,
    defineMultiStyleConfig: defineModalMultiStyleConfig,
} = createMultiStyleConfigHelpers(parts.keys);

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

        sectionBlogTitle: {
            fontWeight: 400,
            fontSize: {
                base: '24px',
                sm: '24px',
                md: '24px',
                lg: '30px',
                xl: '36px',
            },
            lineHeight: {
                base: '32px',
                sm: '32px',
                md: '32px',
                lg: '36px',
                xl: '40px',
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
                lg: '30px',
                xl: '28px',
            },
        },
        nameTitle: {
            fontWeight: 700,
            fontSize: {
                base: '16px',
                sm: '16px',
                md: '16px',
                lg: '24px',
                xl: '24px',
            },
            lineHeight: {
                base: '24px',
                sm: '24px',
                md: '24px',
                lg: '32px',
                xl: '32px',
            },
        },
    },
});

const Input = defineStyleConfig({
    variants: {
        sign: {
            field: {
                bgColor: 'white',
                border: '1px solid',
                borderColor: 'customLime.150',
                color: 'customLime.800',
                fontSize: '18px',
                lineHeight: '18px',
                height: '48px',
                _focus: {
                    borderColor: 'customLime.700',
                },
                _placeholder: {
                    color: 'customLime.800',
                },
                _invalid: {
                    borderColor: 'red.500',
                    boxShadow: '0 0 0 1px red.500',
                },
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
        },
        limeLightSolid: {
            bg: 'customLime.300',
            color: 'black',
        },
        limeOutline: {
            bg: 'transparent',
            border: '1px solid',
            borderColor: 'customLime.600',
            color: 'customLime.600',
            fontSize: { base: '12px', md: '12px', lg: '12px', xl: '14px' },
            lineHeight: { base: '16px', md: '16px', lg: '16px', xl: '20px' },
            px: { base: '2', md: '2', lg: '2', xl: '3' },
            py: { base: '1', md: '1', lg: '2', xl: '6px' },
            minW: { base: '70px', md: '70px', lg: '70px', xl: '87px' },
            h: { base: '8', sm: '8', md: '8', lg: '8', xl: '8' },
        },
        darkWhite: {
            bg: 'blackAlpha.900',
            color: 'white',
            fontSize: '18px',
            lineHeight: '28px',
            height: '48px',
            _hover: {
                bgColor: 'blackAlpha.800',
            },
            _disabled: {
                opacity: 0.8,
                bgColor: 'blackAlpha.800',
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
            pr: { base: '8px', sm: '8px', md: '8px', lg: '12px' },
            pl: { base: '8px', sm: '8px', md: '8px', lg: '12px' },
            py: { base: '4px', sm: '4px', md: '4px', lg: '6px' },
            height: { base: '24px', sm: '24px', md: '24px', lg: '32px', xl: '32px' },
        },
        radial: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            height: '100%',
            borderRadius: '50%',
            bg: 'transparent',
            _hover: {
                bg: 'radial-gradient(50% 50% at 50% 50%, rgba(196, 255, 97, 0.5) 0%, rgba(255, 255, 255, 0) 100%)',
                color: 'text',
            },
            _active: {
                bg: 'radial-gradient(50% 50% at 50% 50%, rgba(196, 255, 97, 0.5) 0%, rgba(255, 255, 255, 0) 100%)',
                color: 'text',
            },
        },
    },
    sizes: {
        medium: {
            fontSize: '16px',
            lineHeight: '24px',
            px: { base: '16px', md: '16px', lg: '24px', xl: '24px' },
            py: { base: '8px', md: '8px', lg: '10px', xl: '10px' },
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
        gray06: {
            bg: 'rgba(0, 0, 0, 0.06)',
        },
    },
});

const baseStyle = defineModalPartsStyle({
    dialog: {
        textAlign: 'center',
        position: 'relative',
        w: { base: '316px', mid: '396px', lg: '396px', xl: '396px' },
        borderRadius: '16px',
        py: 8,
        px: 2,
    },
    overlay: {
        backdropFilter: 'blur(2px)',
    },
    header: {
        textAlign: 'center',
        flexDirection: 'column',
    },
    footer: {
        justifyContent: 'center',
        color: 'blackAlpha.600',
        fontSize: '12px',
        lineHeight: '16px',
    },
});

export const modalTheme = defineModalMultiStyleConfig({
    baseStyle,
});

const cardBaseStyle = defineCardPartsStyle({
    container: {
        borderRadius: 'medium',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
        bg: 'white',
        position: 'relative',
    },
    header: {},
    body: {},
    footer: {},
});

const cardVariants = {
    basic: defineCardPartsStyle({
        container: {
            boxShadow: 'none',
            _hover: {
                cursor: `url('/icons/cursor.svg'), auto`,
                boxShadow:
                    '0px 4px 6px -1px rgba(32, 126, 0, 0.1), 0px 2px 4px -1px rgba(32, 126, 0, 0.06)',
            },
        },
    }),
};

const cardTheme = defineCardMultiStyleConfig({
    baseStyle: cardBaseStyle,
    variants: cardVariants,
    defaultProps: {
        variant: 'basic',
    },
});

const theme = extendTheme({
    breakpoints: {
        base: '0px',
        sm: '360px',
        smPlus: '480px',
        md: '768px',
        mid: '1200px',
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
        xlarge: '16px',
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
                position: 'relative',
            },
        },
    },
    colors: {
        background: '#fff',
        text: '#000',
        secondaryText: 'rgba(0, 0, 0, 0.64)',
        grayText: 'rgba(0, 0, 0, 0.48)',
        lightText: 'rgba(0, 0, 0, 0.24)',
        darkText: 'rgba(0, 0, 0, 0.8)',
        colorBlack: 'rgba(0, 0, 0, 0.92)',

        customLime: {
            50: '#FFFFD3',
            100: '#EAFFC7',
            150: '#D7FF94',
            300: '#C4FF61',
            400: '#B1FF2E',
            500: '#B1FF2E',
            600: '#2DB100',
            700: '#207E00',
            800: '#134B00',
        },
    },
    shadows: {
        base: '0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)',
        menu: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
        main: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    borders: {
        card: '1px solid rgba(0, 0, 0, 0.08)',
        green: '1px solid #2db100',
    },
    textStyles: {
        nav: {
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: '400',
            color: 'text',
        },
        navActive: {
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: '700',
            color: 'text',
        },
        navInactive: {
            fontSize: '16px',
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
        limeMd: {
            fontWeight: 600,
            fontSize: 'md',
            lineHeight: '20px',
            color: 'customLime.600',
        },
        limeLg: {
            fontWeight: 600,
            fontSize: 'lg',
            lineHeight: '24px',
            color: 'customLime.600',
        },
        nameText: {
            fontWeight: 500,
            fontSize: { base: '16px', md: '16px', lg: '18px', xl: '18px' },
            lineHeight: { base: '24px', md: '24px', lg: '28px', xl: '28px' },
        },
        miniText: {
            color: 'secondaryText',
            fontSize: { base: '12px', md: '12px', mid: '12px', lg: '14px', xl: '14px' },
            lineHeight: { base: '16px', md: '16px', mid: '16px', lg: '20px', xl: '20px' },
        },
        descriptionText: {
            color: 'grayText',
            fontWeight: 500,
            fontSize: { base: '14px', sm: '14px', md: '14px', lg: '16px', xl: '16px' },
            lineHeight: { base: '20px', sm: '20px', md: '20px', lg: '24px', xl: '24px' },
        },
        cutText: {
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            overfloWrap: 'anywhere',
            textOverflow: 'ellipsis',
            webkitHyphens: 'auto',
            hyphens: 'auto',
        },
        helperText: {
            textAlign: 'left',
            color: 'secondaryText',
            fontSize: '12px',
            fontWeight: '16px',
        },
    },

    components: {
        Heading,
        Button,
        Badge,
        Card: cardTheme,
        Modal: modalTheme,
        Input,
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
        Switch: {
            baseStyle: {
                track: {
                    bg: 'blackAlpha.400',
                    _checked: {
                        bg: 'customLime.400',
                    },
                },
                thumb: {
                    bg: 'white',
                },
            },
        },
        Checkbox: {
            baseStyle: {
                control: {
                    borderColor: 'customLime.150',
                    outlineColor: 'transparent',
                    _hover: {
                        backgroundColor: 'customLime.400',
                        borderColor: 'customLime.400',
                    },
                    _checked: {
                        backgroundColor: 'customLime.400',
                        borderColor: 'customLime.400',
                        _hover: {
                            backgroundColor: 'customLime.400',
                            borderColor: 'customLime.400',
                        },
                    },
                },
                icon: {
                    color: 'black',
                },
            },
        },
    },
});

export default theme;
