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
    Stack,
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
        <Box>
            <Box pt={6} mb={{ base: 10, sm: 10, md: 10, lg: 8, xl: 8 }}>
                <Flex
                    flexDirection={{ base: 'column', sm: 'column', md: 'row' }}
                    gap={{ sm: 4, md: 4, lg: 6, xl: 6 }}
                >
                    <Image
                        src={recipe?.image}
                        alt={recipe?.title}
                        objectFit='cover'
                        borderRadius='medium'
                        width={{ base: '100%', sm: '100%', md: '232px', lg: '353px', xl: '553px' }}
                        height={{ base: 'auto', sm: 'auto', md: '224px', lg: '410px', xl: '410px' }}
                    />
                    <Flex flex='1' flexDirection='column'>
                        <HStack spacing={3} justify='space-between' align='flex-start' mb={10}>
                            <Flex gap={2} align='center' wrap='wrap'>
                                {recipe?.category.map((catUrl, index) => (
                                    <Badge key={index} variant='lime50'>
                                        <CategoryBadge categoryUrl={catUrl} />
                                    </Badge>
                                ))}
                            </Flex>
                            <LikesInfo
                                likes={recipe?.likes}
                                comments={recipe?.bookmarks}
                                size='limeMd'
                            />
                        </HStack>
                        <Box maxW={{ sm: '100%', md: '503px', lg: '503px', xl: '528px' }}>
                            <Heading variant='pageTitle' textAlign='left' mb={6}>
                                {recipe?.title}
                            </Heading>
                            <Text textAlign='left' mt={2} mb={4}>
                                {recipe?.description}
                            </Text>
                        </Box>
                        <HStack
                            spacing={4}
                            mt='auto'
                            justify='space-between'
                            alignItems='flex-end'
                            wrap='wrap'
                        >
                            <Badge variant='gray06'>
                                <HStack
                                    gap={{ base: 0.5, md: 0.5, lg: 2 }}
                                    py='2px'
                                    px={{ sm: 1, md: 1, lg: 2, xl: 2 }}
                                >
                                    <Image src='/icons/BsAlarm.svg' alt='alarm' boxSize='16px' />
                                    <Text textTransform='lowercase'>{recipe?.time}</Text>
                                </HStack>
                            </Badge>
                            <HStack spacing={4}>
                                <Button
                                    leftIcon={
                                        <Image
                                            src='/icons/BsEmojiHeartEyes.svg'
                                            boxSize={{ base: '14px', lg: '14px', xl: '16px' }}
                                        />
                                    }
                                    variant='outline'
                                    colorScheme='black'
                                    py={{ base: '6px', lg: '6px', xl: '4' }}
                                    px={{ base: '3', lg: '3', xl: '6' }}
                                    height={{ sm: '24px', md: '24px', lg: '32px', xl: '48px' }}
                                >
                                    <Text
                                        fontWeight='500'
                                        fontSize={{
                                            base: '12px',
                                            md: '12px',
                                            lg: '14px',
                                            xl: '18px',
                                        }}
                                        lineHeight={{
                                            base: '16px',
                                            md: '16px',
                                            lg: '20px',
                                            xl: '28px',
                                        }}
                                    >
                                        Оценить рецепт
                                    </Text>
                                </Button>
                                <Button
                                    leftIcon={
                                        <Image
                                            src='/icons/BsBookmarkHeart.svg'
                                            boxSize={{ base: '14px', lg: '14px', xl: '16px' }}
                                        />
                                    }
                                    variant='limeSolid'
                                    py={{ base: '6px', lg: '6px', xl: '4' }}
                                    px={{ base: '3', lg: '3', xl: '6' }}
                                    height={{ sm: '24px', md: '24px', lg: '32px', xl: '48px' }}
                                >
                                    <Text
                                        fontWeight='500'
                                        fontSize={{
                                            base: '12px',
                                            md: '12px',
                                            lg: '14px',
                                            xl: '18px',
                                        }}
                                        lineHeight={{
                                            base: '16px',
                                            md: '16px',
                                            lg: '20px',
                                            xl: '28px',
                                        }}
                                    >
                                        Сохранить в закладки
                                    </Text>
                                </Button>
                            </HStack>
                        </HStack>
                    </Flex>
                </Flex>
                <VStack
                    maxW={{ sm: '100%', md: '100%', lg: '668px', xl: '668px' }}
                    mx='auto'
                    pt={{ sm: 6, md: 6, lg: 10, xl: 10 }}
                    alignItems='left'
                >
                    <Text color='darkText' mb='12px'>
                        * Калорийность на 1 порцию
                    </Text>
                    <Flex
                        flexDirection={{ sm: 'column', md: 'row' }}
                        justify='space-between'
                        gap={4}
                        mb={{ sm: '6', md: '10', lg: '10', xl: '10' }}
                    >
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
                            <Stack
                                key={index}
                                p={4}
                                flexDirection={{ sm: 'row', md: 'column' }}
                                spacing={3}
                                borderWidth='1px'
                                borderColor='rgba(0, 0, 0, 0.08)'
                                borderRadius='xlarge'
                                align='center'
                                flex='1'
                                width={{ sm: '100%', md: '117px' }}
                            >
                                <Text color='secondaryText' mr={{ sm: 'auto' }}>
                                    {item.label}
                                </Text>
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
                            </Stack>
                        ))}
                    </Flex>

                    <Box w={{ sm: '100%', md: '604px' }} mb={8} mx='auto'>
                        <Heading size='md' mb={2}>
                            <HStack justify='space-between'>
                                <Text
                                    textStyle='limeSmall'
                                    textTransform='uppercase'
                                    px={{ md: '6' }}
                                >
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

                    <Box w={{ md: '604px' }} mb={8} mx='auto'>
                        <Heading variant='pageTitle' textAlign='left' mb={5} fontWeight='500'>
                            Шаги приготовления
                        </Heading>
                        <VStack spacing='18px'>
                            {recipe?.steps.map((step, index) => (
                                <Card key={index} w='100%'>
                                    <HStack gap={{ sm: 0, md: 2, lg: 4, xl: 4 }}>
                                        {step.image && (
                                            <Image
                                                src={step.image}
                                                alt={`Шаг ${step.stepNumber}`}
                                                w={{
                                                    base: '158px',
                                                    md: '158px',
                                                    lg: '346px',
                                                    xl: '346px',
                                                }}
                                                h={{
                                                    base: '128px',
                                                    md: '128px',
                                                    lg: '244px',
                                                    xl: '244px',
                                                }}
                                                objectFit='cover'
                                            />
                                        )}
                                        <Box
                                            py={{ sm: '2px', md: '8px', lg: '22px', xl: '22px' }}
                                            pl={
                                                step.image
                                                    ? '8px'
                                                    : {
                                                          base: '8px',
                                                          md: '8px',
                                                          lg: '24px',
                                                          xl: '24px',
                                                      }
                                            }
                                            pr='24px'
                                            flex={step.image ? 'auto' : 1}
                                        >
                                            <Badge
                                                variant={
                                                    index === recipe.steps.length - 1
                                                        ? 'lime50'
                                                        : 'gray06'
                                                }
                                                mb='18px'
                                                textTransform='capitalize'
                                            >
                                                Шаг {step.stepNumber}
                                            </Badge>
                                            <Text
                                                textStyle='cutText'
                                                sx={{
                                                    WebkitLineClamp: { sm: 4 },
                                                }}
                                            >
                                                {step.description}
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Card>
                            ))}
                        </VStack>
                    </Box>

                    <Box
                        w={{ sm: '100%', md: '604px' }}
                        p={{ sm: '3', md: '6', lg: '6', xl: '6' }}
                        bg='customLime.300'
                        borderRadius='xl'
                        mx='auto'
                    >
                        <HStack
                            spacing={{ sm: '1', md: '4', lg: '4', xl: '4' }}
                            alignItems='stretch'
                        >
                            <Avatar src={author.imageUrl} name={author.name} w='96px' h='96px' />
                            <Box w={{ sm: '150px' }} mr={{ sm: '-40px' }}>
                                <Heading variant='nameTitle' mb={1} pt={{ sm: '14px' }}>
                                    {author.name}
                                </Heading>
                                <Text mb={{ sm: '2', md: '4' }}>{author.username}</Text>
                                <Button
                                    bg='#000000'
                                    color='white'
                                    h='24px'
                                    fontSize='12px'
                                    lineHeight='16px'
                                    px={2}
                                    leftIcon={
                                        <Image
                                            src='/icons/followIcon.svg'
                                            alt='Подписаться'
                                            boxSize='12px'
                                        />
                                    }
                                >
                                    Подписаться
                                </Button>
                            </Box>
                            <VStack
                                justify='space-between'
                                alignItems='flex-end'
                                ml={{ sm: '-20px', md: 'auto', lg: 'auto', xl: 'auto' }}
                            >
                                <Text>Автор рецепта</Text>
                                <HStack py={1} px={1.5}>
                                    <Image src='/icons/people.svg' alt='numbers' boxSize='12px' />
                                    <Text textStyle='limeSmall'>{author.numbers}</Text>
                                </HStack>
                            </VStack>
                        </HStack>
                    </Box>
                </VStack>
            </Box>
            <SliderList />
        </Box>
    );
};

export default RecipePage;
