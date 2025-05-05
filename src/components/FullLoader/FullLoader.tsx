import { Box, Spinner } from '@chakra-ui/react';

const FullLoader = () => {
    console.log('main loader...');
    return (
        <Box
            position='fixed'
            top='0'
            left='0'
            w='100vw'
            h='100vh'
            bg='blackAlpha.800'
            display='flex'
            alignItems='center'
            justifyContent='center'
            zIndex='overlay'
        >
            <Spinner
                size='xl'
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='green.400'
            />
        </Box>
    );
};

export default FullLoader;
