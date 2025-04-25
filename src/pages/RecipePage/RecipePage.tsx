import {
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    Flex,
    Grid,
    Heading,
    HStack,
    Image,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router';

import CategoryBadge from '~/components/CategoryBadge/CategoryBadge';
import LikesInfo from '~/components/LikesInfo/LikesInfo';
import SliderList from '~/components/SliderList/SliderList';
import { authors } from '~/data/authors';
import { dishes } from '~/data/dishes';

const RecipePage = () => {
    const { id } = useParams();

    const recipe = dishes.find((item) => item.id === id);
    const author = authors[0];
    const [portions, setPortions] = useState(recipe?.portions ?? 1);

    const getAdjustedCount = (ingredientCount: number, initialPortions: number) =>
        (ingredientCount * portions) / initialPortions;

    const handlePortionsChange = (value: string) => {
        setPortions(Number(value));
    };

    return (
        <>
            <Box pt={6}>
                <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
                    <Image
                        src={recipe?.image}
                        alt={recipe?.title}
                        objectFit='cover'
                        borderRadius='medium'
                        width={{ sm: '328px', md: '232px', lg: '353px', xl: '553px' }}
                        height='410px'
                    />
                    <Box flex='1' display='flex' flexDirection='column'>
                        <HStack spacing={3} justify='space-between' align='center' mb={10}>
                            <HStack spacing={1} align='center'>
                                {recipe?.category.map((catUrl, index) => (
                                    <Badge
                                        key={index}
                                        variant='lime150'
                                        position={{
                                            base: 'static',
                                            sm: 'absolute',
                                            md: 'absolute',
                                            lg: 'static',
                                        }}
                                        top={{ sm: 2, md: 2 }}
                                        left={{ sm: 2, md: 2 }}
                                        p={{ sm: '0', md: '0' }}
                                    >
                                        <CategoryBadge categoryUrl={catUrl} />
                                    </Badge>
                                ))}
                            </HStack>
                            <LikesInfo
                                likes={recipe?.likes}
                                comments={recipe?.bookmarks}
                                size='limeMd'
                            />
                        </HStack>
                        <Box maxW='528px'>
                            <Heading variant='pageTitle' textAlign='left' mb={6}>
                                {recipe?.title}
                            </Heading>
                            <Text textAlign='left' mt={2} mb={4}>
                                {recipe?.description}
                            </Text>
                        </Box>
                        <HStack spacing={4} mt='auto' justify='space-between' alignItems='flex-end'>
                            <Badge variant='gray06'>
                                <HStack
                                    gap={{ base: 0.5, md: 0.5, lg: 2 }}
                                    py='2px'
                                    px={{ sm: 1, md: 1, lg: 2, xl: 2 }}
                                >
                                    <Image src='/icons/BsAlarm.svg' alt='alarm' boxSize='16px' />
                                    <Text>{recipe?.time}</Text>
                                </HStack>
                            </Badge>
                            <HStack spacing={4}>
                                <Button
                                    leftIcon={
                                        <Image src='/icons/BsEmojiHeartEyes.svg' boxSize='16px' />
                                    }
                                    variant='outline'
                                    colorScheme='black'
                                    py={4}
                                    px={6}
                                    height='48px'
                                >
                                    <Text textStyle='nameText'>Оценить рецепт</Text>
                                </Button>
                                <Button
                                    leftIcon={
                                        <Image src='/icons/BsBookmarkHeart.svg' boxSize='16px' />
                                    }
                                    variant='limeSolid'
                                    py={4}
                                    px={6}
                                    height='48px'
                                >
                                    <Text textStyle='nameText'>Сохранить в закладки</Text>
                                </Button>
                            </HStack>
                        </HStack>
                    </Box>
                </Flex>
                <VStack maxW='668px' mx='auto' pt={10} alignItems='left'>
                    <Text color='darkText' mb='12px'>
                        * Калорийность на 1 порцию
                    </Text>
                    <Flex justify='space-between' gap={4} wrap='wrap' mb='40px'>
                        {[
                            {
                                label: 'калорийность',
                                value: recipe?.nutritionValue.calories,
                                unit: 'ККАЛ',
                            },
                            {
                                label: 'белки',
                                value: recipe?.nutritionValue.proteins,
                                unit: 'ГРАММ',
                            },
                            { label: 'жиры', value: recipe?.nutritionValue.fats, unit: 'ГРАММ' },
                            {
                                label: 'углеводы',
                                value: recipe?.nutritionValue.carbohydrates,
                                unit: 'ГРАММ',
                            },
                        ].map((item, index) => (
                            <VStack
                                key={index}
                                p={4}
                                spacing={3}
                                borderWidth='1px'
                                borderColor='rgba(0, 0, 0, 0.08)'
                                borderRadius='xlarge'
                                textAlign='center'
                                flex='1'
                                width='117px'
                            >
                                <Text color='secondaryText'>{item.label}</Text>
                                <Heading
                                    variant='sectionBlogTitle'
                                    fontWeight='600'
                                    color='customLime.800'
                                >
                                    {item.value}
                                </Heading>
                                <Text fontWeight='bold' color='rgba(0, 0, 0, 0.92)'>
                                    {item.unit}
                                </Text>
                            </VStack>
                        ))}
                    </Flex>

                    <Box mb={8}>
                        <Heading size='md' mb={2}>
                            <HStack justify='space-between'>
                                <Text textStyle='limeSmall' textTransform='uppercase' px={6}>
                                    Ингредиенты
                                </Text>
                                <HStack>
                                    <Text textStyle='limeSmall' textTransform='uppercase' px={2}>
                                        Порций
                                    </Text>
                                    <NumberInput
                                        textStyle='nav'
                                        maxW={90}
                                        min={1}
                                        value={portions}
                                        onChange={(value) => handlePortionsChange(value)}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </HStack>
                            </HStack>
                        </Heading>
                        <Grid templateColumns='1fr 1fr'>
                            {recipe?.ingredients.map((ingredient, index) => {
                                const newCount = getAdjustedCount(
                                    Number(ingredient.count),
                                    recipe?.portions ?? 1,
                                );

                                return (
                                    <>
                                        <Box
                                            py={4}
                                            px={6}
                                            bg={index % 2 === 0 ? 'blackAlpha.100' : 'white'}
                                        >
                                            <Text color='colorBlack'>{ingredient.title}</Text>
                                        </Box>

                                        <Box
                                            py={4}
                                            px={6}
                                            bg={index % 2 === 0 ? 'blackAlpha.100' : 'white'}
                                            textAlign='right'
                                        >
                                            <Text color='colorBlack'>
                                                {ingredient.measureUnit === 'по вкусу'
                                                    ? ingredient.count
                                                    : newCount.toFixed(2)}{' '}
                                                {ingredient.measureUnit}
                                            </Text>
                                        </Box>
                                    </>
                                );
                            })}
                        </Grid>
                    </Box>

                    <Box mb={8}>
                        <Heading variant='pageTitle' textAlign='left' mb={5} fontWeight='500'>
                            Шаги приготовления
                        </Heading>
                        <VStack spacing='18px'>
                            {recipe?.steps.map((step, index) => (
                                <Card key={index} w='100%'>
                                    <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
                                        {step.image && (
                                            <Image
                                                src={step.image}
                                                alt={`Шаг ${step.stepNumber}`}
                                                w={{ base: '100%', xl: '346px' }}
                                                h='244px'
                                                objectFit='cover'
                                            />
                                        )}
                                        <Box
                                            py='22px'
                                            pl={step.image ? '8px' : '24px'}
                                            pr='24px'
                                            flex={step.image ? 'auto' : 1}
                                        >
                                            <Badge
                                                variant='gray06'
                                                mb='18px'
                                                textTransform='capitalize'
                                            >
                                                Шаг {step.stepNumber}
                                            </Badge>
                                            <Text>{step.description}</Text>
                                        </Box>
                                    </Flex>
                                </Card>
                            ))}
                        </VStack>
                    </Box>

                    <Box p={6} bg='customLime.300' borderRadius='xl'>
                        <HStack spacing={4} alignItems='stretch'>
                            <Avatar
                                src={author.imageUrl}
                                name={author.name}
                                w={{ base: '32px', md: '32px', lg: '96px', xl: '96px' }}
                                h={{ base: '32px', md: '32px', lg: '96px', xl: '96px' }}
                            />
                            <Box>
                                <Heading variant='nameTitle' mb={1}>
                                    {author.name}
                                </Heading>
                                <Text mb={4}>{author.username}</Text>
                                <Button
                                    variant='limeSolid'
                                    leftIcon={
                                        <Image src='/icons/BsEmojiHeartEyes.svg' boxSize='16px' />
                                    }
                                >
                                    Оценить рецепт
                                </Button>
                            </Box>
                        </HStack>
                    </Box>
                </VStack>
            </Box>
            <SliderList />
        </>
    );
};

export default RecipePage;
