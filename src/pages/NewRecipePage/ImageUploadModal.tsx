import {
    Box,
    Button,
    CloseButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';

import { TEST_IDS } from '~/constants/test-ids';
import { useUploadFileMutation } from '~/query/services/recipes';

interface ImageUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialImage?: string | null;
    onSave: (imageData: string) => void;
    stepIndex?: number;
}

export const ImageUploadModal: FC<ImageUploadModalProps> = ({
    isOpen,
    onClose,
    initialImage = null,
    onSave,
    stepIndex,
}) => {
    const [preview, setPreview] = useState<string | null>(initialImage);
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    console.log(stepIndex);
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

    const handleClear = () => {
        setPreview(null);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent data-test-id='recipe-image-modal'>
                <ModalHeader>Изображение</ModalHeader>
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
                        data-test-id='recipe-image-modal-image-block'
                    >
                        {preview ? (
                            <Image
                                src={preview}
                                alt='Выбранное изображение'
                                objectFit='cover'
                                w='100%'
                                h='100%'
                                data-test-id='recipe-image-modal-preview-image'
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
                            data-test-id={
                                stepIndex !== undefined
                                    ? `recipe-steps-image-block-${stepIndex}-input-file`
                                    : 'recipe-image-block-input-file'
                            }
                        />
                    </Box>

                    {preview && (
                        <VStack>
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

                            <Button mt={4} variant='outline' w='full' onClick={handleClear}>
                                Удалить
                            </Button>
                        </VStack>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
