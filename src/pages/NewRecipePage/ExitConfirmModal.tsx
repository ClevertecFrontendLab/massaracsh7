import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';

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
            <ModalContent>
                <ModalHeader>Выйти без сохранения?</ModalHeader>
                <ModalCloseButton />
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
