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

import { useUploadFileMutation } from '~/query/services/recipes';

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
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [uploadFile, { isLoading }] = useUploadFileMutation();

    useEffect(() => {
        setPreview(initialImage);
    }, [initialImage]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleSave = async () => {
        if (!file) return;

        try {
            const res = await uploadFile(file).unwrap();
            onSave(res.url);
            onClose();
        } catch (err) {
            console.error(err);
        }
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
                        overflow='hidden'
                    >
                        {preview ? (
                            <Image
                                src={preview}
                                alt='Выбранное изображение'
                                objectFit='cover'
                                w='100%'
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
                        <Button
                            mt={4}
                            colorScheme='green'
                            w='full'
                            onClick={handleSave}
                            isLoading={isLoading}
                            loadingText='Загрузка...'
                        >
                            Сохранить изображение
                        </Button>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
