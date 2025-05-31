import {
    Box,
    Button,
    CloseButton,
    Heading,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';

import { ImagePlaceholder } from '~/assets/icons/icons';
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
    const [uploadFile] = useUploadFileMutation();

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
            <ModalContent data-test-id='recipe-image-modal' p={8}>
                <ModalHeader px='0' pb={4}>
                    <Heading variant='nameTitle'>Изображение</Heading>
                </ModalHeader>
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
                <ModalBody px='0' pb={8}>
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
                            <ImagePlaceholder w='32px' h='32px' />
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
                </ModalBody>

                {preview && (
                    <ModalFooter flexDirection='column' gap='0' p='0'>
                        <Button variant='darkWhite' w='full' onClick={handleSave}>
                            Сохранить
                        </Button>

                        <Button mt={4} variant='darkOutline' w='full' onClick={handleClear}>
                            Удалить
                        </Button>
                    </ModalFooter>
                )}
            </ModalContent>
        </Modal>
    );
};
