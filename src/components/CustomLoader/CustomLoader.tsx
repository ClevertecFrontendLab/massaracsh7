import { Box, Spinner } from '@chakra-ui/react';

interface CustomLoaderProps {
    size?: 'small' | 'large';
    dataTestId?: string;
}

export const CustomLoader = ({ size = 'large', dataTestId }: CustomLoaderProps) => {
    const boxSize = size === 'large' ? { base: '134px', md: '134px', lg: '206px' } : '134px';

    const spinnerSize = size === 'large' ? { base: '24px', md: '24px', lg: '37px' } : '24px';

    return (
        <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            borderRadius='50%'
            w={boxSize}
            h={boxSize}
            bgGradient='radial(50% 50% at 50% 50%, rgba(196, 255, 97, 0.5) 0%, rgba(255, 255, 255, 0) 100%)'
            mx='auto'
        >
            <Spinner
                boxSize={spinnerSize}
                thickness='1px'
                speed='0.65s'
                emptyColor='transparent'
                color='black'
                data-test-id={dataTestId}
            />
        </Box>
    );
};
