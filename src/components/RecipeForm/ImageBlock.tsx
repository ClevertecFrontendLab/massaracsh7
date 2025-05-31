import { Box, FormControl, Image } from '@chakra-ui/react';

import { ImagePlaceholder } from '~/assets/icons/icons';
import { BASE_IMG_URL } from '~/constants/constants';
import { TEST_IDS } from '~/constants/test-ids';

interface ImageBlockProps {
    image: string | null | undefined;
    error: boolean | undefined;
    onClick: () => void;
}

export const ImageBlock: React.FC<ImageBlockProps> = ({ image, error, onClick }) => (
    <FormControl isInvalid={!!error} w='auto'>
        <Box
            h={{ base: '224px', sm: '224px', md: '224px', lg: '410px', xl: '410px' }}
            w={{ base: '100%', sm: '100%', smPlus: '100%', md: '232px', lg: '553px', xl: '553px' }}
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
            data-test-id={TEST_IDS.RECIPE_IMAGE_BLOCK}
        >
            {image ? (
                <Image
                    src={`${BASE_IMG_URL}${image}`}
                    alt='Изображение рецепта'
                    objectFit='cover'
                    w='100%'
                    h='100%'
                    data-test-id={TEST_IDS.RECIPE_IMAGE_BLOCK_PREVIEW_IMAGE}
                />
            ) : (
                <ImagePlaceholder w='32px' h='32px' />
            )}
        </Box>
    </FormControl>
);
