import {
    Box,
    Button,
    CloseButton,
    Heading,
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
        dataId,
    } = modal;

    return (
        <Modal isOpen={true} onClose={() => dispatch(clearModal())} isCentered>
            <ModalOverlay />
            <ModalContent data-test-id={dataId}>
                <CloseButton
                    position='absolute'
                    right='1rem'
                    top='1rem'
                    onClick={() => dispatch(clearModal())}
                    data-test-id='close-button'
                    border='1px solid black'
                    borderRadius='50%'
                    w={6}
                    h={6}
                />

                {imageSrc && (
                    <Box mb={4}>
                        <Image
                            src={imageSrc}
                            alt='Modal illustration'
                            mx='auto'
                            boxSize={{ base: '108px', md: '206px' }}
                        />
                    </Box>
                )}

                <ModalHeader>
                    <Heading fontSize='24px' lineHeight='32px' fontWeight='700' mb={2}>
                        {title}
                    </Heading>
                </ModalHeader>

                <ModalBody p={0} mt={2}>
                    <Text fontSize='md'>{description}</Text>
                </ModalBody>

                <ModalFooter p={0} mt={6} display='flex' justifyContent='center'>
                    {onPrimaryAction && (
                        <Button
                            variant='darkWhite'
                            onClick={onPrimaryAction}
                            data-test-id='repeat-button'
                        >
                            {primaryActionText}
                        </Button>
                    )}
                    {footerNote && (
                        <Text fontSize='12px' lineHeight='16px'>
                            {footerNote}
                        </Text>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
