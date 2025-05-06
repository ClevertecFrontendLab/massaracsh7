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
        <Alert
            status='error'
            borderRadius='md'
            boxShadow='md'
            mt={4}
            data-test-id='error-notification'
        >
            <AlertIcon />
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
                onClick={() => {
                    dispatch(clearAppError());
                    onClose();
                }}
            />
        </Alert>
    );
};

export default ErrorAlert;
