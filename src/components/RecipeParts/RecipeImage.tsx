import { Image } from '@chakra-ui/react';

type RecipeImageProps = {
    src: string;
    alt?: string;
};

export const RecipeImage = ({ src, alt }: RecipeImageProps) => (
    <Image
        src={src}
        alt={alt}
        objectFit='cover'
        borderRadius='medium'
        width={{ base: '100%', sm: '100%', md: '232px', lg: '353px', xl: '553px' }}
        height={{ base: 'auto', sm: 'auto', md: '224px', lg: '410px', xl: '410px' }}
    />
);
