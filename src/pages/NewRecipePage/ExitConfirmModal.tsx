import {
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

import modalBreakfast from '~/assets/images/modal-breakfast.png';
import { TEST_IDS } from '~/constants/test-ids';

interface ExitConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onExit: () => void;
    onSaveDraft: () => void;
}

export function ExitConfirmModal({ isOpen, onClose, onExit, onSaveDraft }: ExitConfirmModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent data-test-id='recipe-preventive-modal'>
                {/* <ModalCloseButton data-test-id={TEST_IDS.CLOSE_BUTTON} /> */}
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

                <ModalHeader>Выйти без сохранения?</ModalHeader>
                <ModalBody>
                    <Text>
                        У вас есть несохранённые изменения. Вы действительно хотите покинуть
                        страницу?
                    </Text>
                    <Text mt={2} fontSize='sm' color='gray.500'>
                        Чтобы сохранить изменения, нажмите «Сохранить черновик».
                    </Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='gray' mr={3} onClick={onExit}>
                        Выйти без сохранения
                    </Button>
                    <Button colorScheme='green' onClick={onSaveDraft}>
                        Сохранить черновик
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
