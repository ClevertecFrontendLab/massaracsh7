import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton } from '@chakra-ui/react';
import { useEffect } from 'react';

import { CLOSE_ALERT_BUTTON, ERROR_NOTIFICATION } from '~/constants/test-ids';
import { clearAppAlert } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export const AppAlert = () => {
    const alert = useAppSelector((state) => state.app.alert);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!alert) return;

        const timer = setTimeout(() => {
            dispatch(clearAppAlert());
        }, 30000);

        return () => clearTimeout(timer);
    }, [alert, dispatch]);

    if (!alert) return null;

    const { type, title, message } = alert;

    const bgMap: Record<typeof type, string> = {
        error: '#E53E3E',
        success: '#38A169',
        warning: '#D69E2E',
        info: '#3182CE',
    };

    return (
        <Box position='fixed' bottom='80px' left='50%' transform='translateX(-50%)' zIndex={1600}>
            <Alert
                status={type}
                borderRadius='md'
                boxShadow='md'
                mx='auto'
                data-test-id={ERROR_NOTIFICATION}
                w={{ base: '328px', md: '328px', lg: '400px', xl: '400px' }}
                bg={bgMap[type]}
                color='white'
                fontSize='16px'
            >
                <AlertIcon color='white' />
                <Box>
                    {title && <AlertTitle>{title}</AlertTitle>}
                    <AlertDescription>{message}</AlertDescription>
                </Box>
                <CloseButton
                    data-test-id={CLOSE_ALERT_BUTTON}
                    alignSelf='flex-start'
                    position='relative'
                    right={-1}
                    top={-1}
                    ml='auto'
                    onClick={() => dispatch(clearAppAlert())}
                />
            </Alert>
        </Box>
    );
};
