import { Badge, Box, Heading, HStack, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import { newRecipes, popularRecipes } from '~/data/cardsData';
import { CardData } from '~/types/typesData';

const RecipeCard = ({ title, description, category, likes, comments, imageUrl }: CardData) => (
    <Box borderRadius='medium' border='card' overflow='hidden' bg='white'>
        <Image src={imageUrl} alt={title} w='100%' h='150px' objectFit='cover' />
        <Box p={4}>
            <Heading size='md' mb={2}>
                {title}
            </Heading>
            <Text fontSize='sm' mb={2}>
                {description}
            </Text>
            <HStack>
                <Badge
                    fontSize='md'
                    lineHeight='middle'
                    fontWeight='400'
                    background='customLime.150'
                    mb={2}
                    textTransform='capitalize'
                >
                    {category}
                </Badge>
                <HStack fontSize='xs' color='customLime.600'>
                    <Image src='/icons/BsBookmarkHeart.svg' boxSize='12px' /> <Text>{likes}</Text>
                </HStack>
                <HStack fontSize='xs' color='customLime.600'>
                    <Image src='/icons/BsEmojiHeartEyes.svg' boxSize='12px' />{' '}
                    <Text>{comments}</Text>
                </HStack>
            </HStack>
        </Box>
    </Box>
);

const Main = () => (
    <Box p={8}>
        <Heading mb={4}>Приятного аппетита!</Heading>

        <VStack align='stretch' spacing={6}>
            <Heading size='lg'>Новые рецепты</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
                {newRecipes.map((recipe, index) => (
                    <RecipeCard key={index} {...recipe} />
                ))}
            </SimpleGrid>

            <Heading size='lg' mt={8}>
                Самое сочное
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
                {popularRecipes.map((recipe, index) => (
                    <RecipeCard key={index} {...recipe} />
                ))}
            </SimpleGrid>
        </VStack>
    </Box>
);

export default Main;
