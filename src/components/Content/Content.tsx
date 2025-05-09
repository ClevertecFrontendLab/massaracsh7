import { Box } from '@chakra-ui/react';

export const Content = ({ children }: { children: React.ReactNode }) => (
    <Box
        as='main'
        pl={{ base: '16px', sm: '16px', md: '20px', lg: '24px', xl: '24px', '2xl': '24px' }}
        pr={{ base: '16px', sm: '16px', md: '20px', lg: '72px', xl: '72px', '2xl': '72px' }}
        maxW={{
            base: '360px',
            sm: '360px',
            smPlus: '80%',
            md: '768px',
            mid: '90%',
            lg: '976px',
            xl: '1456px',
            '2xl': '1456px',
        }}
        mx={{ sm: 'auto', md: 'auto', mid: 'auto', lg: 'auto', xl: 'auto' }}
        w='100%'
    >
        {children}
    </Box>
);
