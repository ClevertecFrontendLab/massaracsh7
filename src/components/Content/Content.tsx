import { Box } from '@chakra-ui/react';

const Content = ({ children }: { children: React.ReactNode }) => (
    <Box
        as='main'
        pl={{ base: '0', sm: '0', md: '20px', lg: '24px', xl: '24px', '2xl': '24px' }}
        pr={{ base: '0', sm: '0', md: '20px', lg: '72px', xl: '72px', '2xl': '72px' }}
        maxW={{
            base: '100%',
            sm: '328px',
            md: '728px',
            lg: '975px',
            xl: '1459px',
            '2xl': '1456px',
        }}
        w='100%'
    >
        {children}
    </Box>
);

export default Content;
