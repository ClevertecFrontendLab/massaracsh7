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
    Text,
} from '@chakra-ui/react';

import { LeftPenWhite } from '~/assets/icons/icons';
import modalBreakfast from '~/assets/images/modal-breakfast.png';
import { CONFIRM_MODAL, CONFIRM_MODAL_TITLE } from '~/constants/constants';
import { TEST_IDS } from '~/constants/test-ids';

type ExitConfirmModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onExit: () => void;
    onSaveDraft: () => void;
};

export function ExitConfirmModal({ isOpen, onClose, onExit, onSaveDraft }: ExitConfirmModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent data-test-id={TEST_IDS.RECIPE_PREVENTIVE_MODAL} p={8}>
                <CloseButton
                    position='absolute'
                    right={6}
                    top={6}
                    onClick={onClose}
                    data-test-id={TEST_IDS.CLOSE_BUTTON}
                    border='1px solid black'
                    borderRadius='50%'
                    w={6}
                    h={6}
                />
                <Image
                    src={modalBreakfast}
                    alt='Modal illustration'
                    mx='auto'
                    boxSize={{
                        sm: '108px',
                        md: '108px',
                        mid: '206px',
                        lg: '206px',
                        xl: '206px',
                    }}
                    objectFit='contain'
                />

                <ModalHeader px='0' pb={4}>
                    <Heading variant='nameTitle'>{CONFIRM_MODAL_TITLE}</Heading>
                </ModalHeader>
                <ModalBody px='0' pb={8}>
                    <Text fontSize='16px' lineHeight='24px' color='blackAlpha.700'>
                        {CONFIRM_MODAL}
                    </Text>
                </ModalBody>
                <ModalFooter flexDirection='column' gap='4' p='0'>
                    <Button
                        variant='darkWhite'
                        leftIcon={<LeftPenWhite w='16px' h='16px' />}
                        onClick={onSaveDraft}
                        w='full'
                    >
                        Сохранить черновик
                    </Button>
                    <Button variant='darkOutline' onClick={onExit} w='full'>
                        Выйти без сохранения
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
