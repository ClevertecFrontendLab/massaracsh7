import {
    Box,
    Button,
    CloseButton,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';

import { clearModal } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export const CustomModal = () => {
    const modal = useAppSelector((state) => state.app.modal);
    const dispatch = useAppDispatch();

    if (!modal) return null;

    const {
        title,
        description,
        imageSrc,
        onPrimaryAction,
        primaryActionText = 'Повторить',
        footerNote,
    } = modal;

    return (
        <Modal isOpen={true} onClose={() => dispatch(clearModal())} isCentered>
            <ModalOverlay />
            <ModalContent maxW='sm' p={6} textAlign='center' position='relative'>
                <CloseButton
                    position='absolute'
                    right='1rem'
                    top='1rem'
                    onClick={() => dispatch(clearModal())}
                />

                {imageSrc && (
                    <Box mb={4}>
                        <Image src={imageSrc} alt='Modal illustration' mx='auto' />
                    </Box>
                )}

                <ModalHeader p={0} fontSize='lg' fontWeight='bold'>
                    {title}
                </ModalHeader>

                <ModalBody p={0} mt={2}>
                    <Text fontSize='md'>{description}</Text>
                </ModalBody>

                <ModalFooter p={0} mt={6} display='flex' justifyContent='center'>
                    {onPrimaryAction ? (
                        <Button colorScheme='green' onClick={onPrimaryAction}>
                            {primaryActionText}
                        </Button>
                    ) : (
                        <Text fontSize='sm' color='gray.500'>
                            {footerNote}
                        </Text>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
