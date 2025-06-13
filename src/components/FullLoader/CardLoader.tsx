import { Box } from '@chakra-ui/react';

import { TEST_IDS } from '~/constants/test-ids';

import { CustomLoader } from '../CustomLoader/CustomLoader';

export const CardLoader = () => (
    <Box
        position='absolute'
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={10}
        bg='rgba(255,255,255,0.1)'
        backdropFilter='blur(2px)'
        display='flex'
        alignItems='center'
        justifyContent='center'
        borderRadius='xl'
    >
        <CustomLoader size='small' dataTestId={TEST_IDS.MOBILE_LOADER} />
    </Box>
);
