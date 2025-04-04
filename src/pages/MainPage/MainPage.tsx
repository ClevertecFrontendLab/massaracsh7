import {
    Avatar,
    Badge,
    Box,
    Card,
    CardBody,
    CardHeader,
    Heading,
    HStack,
    Image,
    Link,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react';

import { blogs, newRecipes, popularRecipes, veganDishes } from '~/data/cardsData';
import { BlogData, CardData, VeganDish } from '~/types/typesData';

const RecipeCard = ({ title, description, category, likes, comments, imageUrl }: CardData) => (
    <Card borderRadius='md' border='1px solid' borderColor='gray.200' overflow='hidden' bg='white'>
        <Image src={imageUrl} alt={title} w='100%' h='150px' objectFit='cover' />
        <CardBody>
            <Heading size='md' mb={2}>
                {title}
            </Heading>
            <Text fontSize='sm' mb={2}>
                {description}
            </Text>
            <HStack spacing={3}>
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
        </CardBody>
    </Card>
);

const BlogCard = ({ name, handle, description, imageUrl }: BlogData) => (
    <Card p={4} borderRadius='md'>
        <CardBody>
            <HStack spacing={4}>
                <Avatar src={imageUrl} name={name} />
                <VStack align='start' spacing={1}>
                    <Text fontWeight='bold'>{name}</Text>
                    <Text fontSize='sm' color='gray.600'>
                        {handle}
                    </Text>
                    <Text fontSize='sm'>{description}</Text>
                </VStack>
            </HStack>
        </CardBody>
    </Card>
);

const VeganDishCard = ({ title, category }: VeganDish) => (
    <Card variant='outline' maxW='sm' w='100%'>
        <CardHeader>
            <Heading size='md'>{title}</Heading>
        </CardHeader>
        <CardBody>
            <HStack spacing={2}>
                <Text>Category:</Text>
                <Badge colorScheme='green'>{category}</Badge>
            </HStack>
        </CardBody>
    </Card>
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

            <Box as='section' bg='customLime.300' p={6} borderRadius='md'>
                <HStack justify='space-between' align='center'>
                    <Heading size='lg' mt={8}>
                        Кулинарные блоги
                    </Heading>
                    <Link>Все авторы</Link>
                </HStack>
                <SimpleGrid bg='customLime.300' columns={{ base: 1, md: 3 }} spacing={4}>
                    {blogs.map((blog, index) => (
                        <BlogCard key={index} {...blog} />
                    ))}
                </SimpleGrid>
            </Box>
            <Heading size='lg' mt={8}>
                Веганская кухня
            </Heading>
            <VStack spacing={2}>
                {veganDishes.map((dish, index) => (
                    <VeganDishCard key={index} {...dish} />
                ))}
            </VStack>
        </VStack>
    </Box>
);

export default Main;
