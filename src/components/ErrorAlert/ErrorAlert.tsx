import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import { CLOSE_ALERT_BUTTON, ERROR_NOTIFICATION } from '~/constants/test-ids';
import { clearAppError } from '~/store/app-slice';
import { ApplicationState } from '~/store/configure-store';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

const ErrorAlert = () => {
    const error = useAppSelector((state: ApplicationState) => state.app.error);
    const dispatch = useAppDispatch();
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

    if (!error || !isOpen) return null;

    return (
        <Box position='fixed' bottom='80px' left='50%' transform='translateX(-50%)' zIndex={20}>
            <Alert
                status='error'
                borderRadius='md'
                boxShadow='md'
                mx='auto'
                data-test-id={ERROR_NOTIFICATION}
                w={{ base: '328px', md: '328px', lg: '400px', xl: '400px' }}
                bg='#E53E3E'
                color='white'
                fontSize='16px'
            >
                <AlertIcon bg='#E53E3E' color='white' />
                <Box>
                    <AlertTitle>Ошибка сервера</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Box>
                <CloseButton
                    data-test-id={CLOSE_ALERT_BUTTON}
                    alignSelf='flex-start'
                    position='relative'
                    right={-1}
                    top={-1}
                    ml='auto'
                    onClick={() => {
                        dispatch(clearAppError());
                        onClose();
                    }}
                />
            </Alert>
        </Box>
    );
};

export default ErrorAlert;
