import {
    Box,
    Button,
    CloseButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import { clearModal } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export const CustomModal = () => {
    const modal = useAppSelector((state) => state.app.modal);
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');

    if (!modal) return null;

    const {
        title,
        description,
        imageSrc,
        onPrimaryAction,
        primaryActionText = 'Повторить',
        footerNote,
        withInput = false,
    }: {
        title?: string;
        description?: string;
        imageSrc?: string;
        onPrimaryAction?: (email?: string, resetInput?: () => void) => Promise<void>;
        primaryActionText?: string;
        footerNote?: string;
        withInput?: boolean;
    } = modal;

    const handlePrimaryClick = async () => {
        try {
            if (withInput && onPrimaryAction) {
                await onPrimaryAction(email, () => setEmail(''));
            } else {
                await onPrimaryAction?.();
            }
        } catch (error) {
            console.log('Ошибка в модальном действии:', error);
        }
    };

    return (
        <Modal isOpen={true} onClose={() => dispatch(clearModal())}>
            <ModalOverlay />
            <ModalContent maxW='30%' maxH='80vh' p={6} textAlign='center' position='relative'>
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

                {title && (
                    <ModalHeader p={0} fontSize='lg' fontWeight='bold'>
                        {title}
                    </ModalHeader>
                )}

                <ModalBody p={0} mt={2}>
                    {description && <Text fontSize='md'>{description}</Text>}

                    {withInput && (
                        <Box mt={4}>
                            <Input
                                type='email'
                                placeholder='Ваш e-mail'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Box>
                    )}
                </ModalBody>

                <ModalFooter p={0} mt={6} display='flex' justifyContent='center'>
                    {onPrimaryAction ? (
                        <Button colorScheme='green' onClick={handlePrimaryClick}>
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
