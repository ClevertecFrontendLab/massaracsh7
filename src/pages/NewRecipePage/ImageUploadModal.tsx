import {
    Box,
    Button,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';

interface ImageUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialImage?: string | null;
    onSave: (imageData: string) => void;
}

export const ImageUploadModal: FC<ImageUploadModalProps> = ({
    isOpen,
    onClose,
    initialImage = null,
    onSave,
}) => {
    const [preview, setPreview] = useState<string | null>(initialImage);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setPreview(initialImage);
    }, [initialImage]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        if (preview) {
            onSave(preview);
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalBody py={6}>
                    <Box
                        w='full'
                        h='250px'
                        bg='gray.100'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        borderRadius='md'
                        cursor='pointer'
                        onClick={() => inputRef.current?.click()}
                    >
                        {preview ? (
                            <Image
                                src={preview}
                                alt='Выбранное изображение'
                                objectFit='cover'
                                h='100%'
                            />
                        ) : (
                            <Text color='gray.500'>Нажмите, чтобы выбрать фото</Text>
                        )}
                        <Input
                            ref={inputRef}
                            type='file'
                            accept='image/*'
                            display='none'
                            onChange={handleImageChange}
                        />
                    </Box>

                    {preview && (
                        <Button mt={4} colorScheme='green' w='full' onClick={handleSave}>
                            Сохранить изображение
                        </Button>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
