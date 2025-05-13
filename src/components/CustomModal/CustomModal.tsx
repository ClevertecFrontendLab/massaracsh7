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

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    imageSrc?: string;
    onPrimaryAction?: () => void;
    primaryActionText?: string;
    footerNote?: string;
}

export const CustomModal = ({
    isOpen,
    onClose,
    title,
    description,
    imageSrc,
    onPrimaryAction,
    primaryActionText = 'Повторить',
    footerNote,
}: CustomModalProps) => (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW='sm' p={6} textAlign='center' position='relative'>
            <CloseButton position='absolute' right='1rem' top='1rem' onClick={onClose} />

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
