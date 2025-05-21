import {
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
    Stack,
    Text,
} from '@chakra-ui/react';

import { CLOSE_BUTTON, REPEAT_BUTTON } from '~/constants/test-ids';
import { clearModal } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { userModalSelector } from '~/store/selectors/appSelectors';

export const CustomModal = () => {
    const modal = useAppSelector(userModalSelector);
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
                    right={6}
                    top={6}
                    onClick={() => dispatch(clearModal())}
                    data-test-id={CLOSE_BUTTON}
                    border='1px solid black'
                    borderRadius='50%'
                    w={6}
                    h={6}
                />
                <Stack align='center' gap={8}>
                    {imageSrc && (
                        <Image
                            src={imageSrc}
                            alt='Modal illustration'
                            mx='auto'
                            boxSize={{ base: '108px', xl: '206px' }}
                        />
                    )}

                    <ModalHeader>
                        <Heading fontSize='24px' lineHeight='32px' fontWeight='700' mb={2}>
                            {title}
                        </Heading>
                    </ModalHeader>
                </Stack>
                <ModalBody p={0} mt={2}>
                    <Text fontSize='md'>{description}</Text>
                </ModalBody>

                <ModalFooter p={0} mt={6} display='flex' justifyContent='center'>
                    {onPrimaryAction && (
                        <Button
                            variant='darkWhite'
                            onClick={onPrimaryAction}
                            data-test-id={REPEAT_BUTTON}
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
