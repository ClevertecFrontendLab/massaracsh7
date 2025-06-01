import { Box, Heading, Text } from '@chakra-ui/react';

type RecipeImageProps = {
    title: string;
    description: string;
};

export const RecipeTitleDescription = ({ title, description }: RecipeImageProps) => (
    <Box maxW={{ sm: '100%', md: '503px', lg: '503px', xl: '528px' }}>
        <Heading variant='pageTitle' textAlign='left' mb={6}>
            {title}
        </Heading>
        <Text textAlign='left' mt={2} mb={4}>
            {description}
        </Text>
    </Box>
);
