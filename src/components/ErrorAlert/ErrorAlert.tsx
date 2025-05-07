import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

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
                mb='auto'
                mx='auto'
                data-test-id='error-notification'
                w='400px'
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
                    data-test-id='close-alert-button'
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
