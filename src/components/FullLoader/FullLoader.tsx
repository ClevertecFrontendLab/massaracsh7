import { Box } from '@chakra-ui/react';

import { TEST_IDS } from '~/constants/test-ids';

import { CustomLoader } from '../CustomLoader/CustomLoader';

export const FullLoader = () => (
    <Box
        position='fixed'
        top='0'
        left='0'
        w='100vw'
        h='100vh'
        bg='rgba(0, 0, 0, 0.16)'
        backdropFilter='blur(2px)'
        display='flex'
        alignItems='center'
        justifyContent='center'
        zIndex='1500'
    >
        <CustomLoader size='large' dataTestId={TEST_IDS.APP_LOADER} />
    </Box>
);
