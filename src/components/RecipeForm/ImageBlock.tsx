import { Box, FormControl, Image } from '@chakra-ui/react';

import { ImagePlaceholder } from '~/assets/icons/icons';
import { BASE_IMG_URL } from '~/constants/constants';

interface ImageBlockProps {
    image: string | null | undefined;
    error: boolean | undefined;
    onClick: () => void;
}

export const ImageBlock: React.FC<ImageBlockProps> = ({ image, error, onClick }) => (
    <FormControl isInvalid={!!error} w='auto'>
        <Box
            h={{ sm: '224px', md: '224px', lg: '410px', xl: '410px' }}
            w={{ sm: '232px', md: '328px', lg: '553px', xl: '553px' }}
            bg='gray.100'
            borderRadius='md'
            display='flex'
            alignItems='center'
            justifyContent='center'
            overflow='hidden'
            cursor='pointer'
            onClick={onClick}
            _hover={{ bg: 'gray.200' }}
            border={error ? '1px solid' : '1px solid transparent'}
            borderColor={error ? 'red.500' : 'transparent'}
            data-test-id='recipe-image-block'
        >
            {image ? (
                <Image
                    src={`${BASE_IMG_URL}${image}`}
                    alt='Изображение рецепта'
                    objectFit='cover'
                    w='100%'
                    h='100%'
                    data-test-id='recipe-image-block-preview-image'
                />
            ) : (
                <ImagePlaceholder w='32px' h='32px' />
            )}
        </Box>
    </FormControl>
);
