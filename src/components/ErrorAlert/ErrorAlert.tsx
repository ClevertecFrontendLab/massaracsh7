import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

export const ErrorAlert = () => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

    if (!isOpen) return null;

    return (
        <Alert status='error' mb={4}>
            <AlertIcon />
            <Box>
                <AlertTitle>Ошибка сервера</AlertTitle>
                <AlertDescription>Попробуйте поискать снова попозже.</AlertDescription>
            </Box>
            <CloseButton
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={onClose}
            />
        </Alert>
    );
};
