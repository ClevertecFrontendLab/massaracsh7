import { Box } from '@chakra-ui/react';

const Content = ({ children }: { children: React.ReactNode }) => (
    <Box
        as='main'
        pl={{ base: '20px', sm: '20px', md: '20px', lg: '24px', xl: '24px', '2xl': '24px' }}
        pr={{ base: '20px', sm: '20px', md: '20px', lg: '72px', xl: '72px', '2xl': '72px' }}
        maxW={{
            base: '100%',
            sm: '328px',
            md: '728px',
            lg: '1160px',
            xl: '1360px',
            '2xl': '1360px',
        }}
        w='100%'
    >
        {children}
    </Box>
);

export default Content;
