import { DeleteIcon } from '@chakra-ui/icons';
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
    IconButton,
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
import { FetchBaseQueryError, skipToken } from '@reduxjs/toolkit/query';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import BsAlarm from '~/assets/icons/BsAlarm.svg';
import BsBookmarkHeart from '~/assets/icons/BsBookmarkHeart.svg';
import BsEmojiHeartEyes from '~/assets/icons/BsEmojiHeartEyes.svg';
import followIcon from '~/assets/icons/followIcon.svg';
import { LeftPen } from '~/assets/icons/icons';
import people from '~/assets/icons/people.svg';
import { CategoryBadge } from '~/components/CategoryBadge/CategoryBadge';
import { CustomLoader } from '~/components/CustomLoader/CustomLoader';
import { LikesInfo } from '~/components/LikesInfo/LikesInfo';
import { SliderList } from '~/components/SliderList/SliderList';
import { BASE_IMG_URL, BASE_LIMIT_SLIDER, ERROR_APP_MESSAGE } from '~/constants/constants';
import { TEST_IDS } from '~/constants/test-ids';
import { authors } from '~/data/authors';
import { useGetCategory } from '~/hooks/useGetCategory';
import {
    useDeleteRecipeMutation,
    useGetRecipeByIdQuery,
    useGetRecipesQuery,
    useToggleBookmarkRecipeMutation,
    useToggleLikeRecipeMutation,
} from '~/query/services/recipes';
import { setAppAlert, setAppError } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export const RecipePage = () => {
    const { category, subcategory, id } = useParams();
    const navigate = useNavigate();
    const { data: recipe, isLoading, isError } = useGetRecipeByIdQuery(id ?? skipToken);
    const categoryIds = recipe?.categoriesIds ?? [];
    const rootCategories = useGetCategory(categoryIds);
    const author = authors[0];
    const dispatch = useAppDispatch();
    const [portions, setPortions] = useState<number>(1);
    const [initialPortions, setInitialPortions] = useState<number>(1);
    useEffect(() => {
        if (recipe?.portions) {
            setPortions(recipe.portions);
            setInitialPortions(recipe.portions);
        }
    }, [recipe?.portions]);
    const getNewCount = (ingredientCount: number) => (ingredientCount * portions) / initialPortions;

    const handlePortionsChange = (value: string) => {
        setPortions(Number(value));
    };
    const [deleteRecipe] = useDeleteRecipeMutation();
    const [toggleBookmark] = useToggleBookmarkRecipeMutation();
    const [toggleLike] = useToggleLikeRecipeMutation();

    const userId = localStorage.getItem('userId');
    const isAuthor = userId === recipe?.authorId;

    const handleDelete = async () => {
        if (!id) return;
        try {
            await deleteRecipe(id).unwrap();
            navigate('/');
            dispatch(
                setAppAlert({
                    type: 'success',
                    title: 'Рецепт успешно удален',
                    sourse: 'global',
                }),
            );
        } catch (err) {
            if (typeof err === 'object' && err !== null && 'status' in err) {
                const fetchErr = err as FetchBaseQueryError;
                const status = fetchErr.status;
                if (String(status).startsWith('5')) {
                    dispatch(
                        setAppAlert({
                            type: 'error',
                            title: 'Ошибка сервера',
                            message: 'Не удалось удалить рецепт',
                            sourse: 'global',
                        }),
                    );
                }
            }
        }
    };
    const handleBookmark = async () => {
        if (!id) return;
        try {
            await toggleBookmark(id).unwrap();
        } catch (err) {
            if (typeof err === 'object' && err !== null && 'status' in err) {
                const fetchErr = err as FetchBaseQueryError;
                const status = fetchErr.status;
                if (String(status).startsWith('5')) {
                    dispatch(
                        setAppAlert({
                            type: 'error',
                            title: 'Ошибка сервера',
                            sourse: 'global',
                            message: 'Попробуйте немного позже',
                        }),
                    );
                }
            }
        }
    };

    const handleLike = async () => {
        if (!id) return;
        try {
            await toggleLike(id).unwrap();
        } catch (err) {
            if (typeof err === 'object' && err !== null && 'status' in err) {
                const fetchErr = err as FetchBaseQueryError;
                const status = fetchErr.status;
                if (String(status).startsWith('5')) {
                    dispatch(
                        setAppAlert({
                            type: 'error',
                            title: 'Ошибка сервера',
                            sourse: 'global',
                            message: 'Попробуйте немного позже',
                        }),
                    );
                }
            }
        }
    };

    const { data: sliderRecipes } = useGetRecipesQuery(
        id
            ? {
                  sortBy: 'createdAt',
                  sortOrder: 'desc',
                  limit: BASE_LIMIT_SLIDER,
              }
            : skipToken,
    );
    useEffect(() => {
        if (isError) {
            navigate(-1);
            dispatch(setAppError(ERROR_APP_MESSAGE));
        }
    }, [isError, navigate, dispatch]);

    if (isLoading) {
        return <CustomLoader size='large' />;
    }

    return (
        <Box>
            <Box pt={6} mb={{ base: 10, sm: 10, md: 10, lg: 8, xl: 8 }}>
                <Flex
                    flexDirection={{ base: 'column', sm: 'column', md: 'row' }}
                    gap={{ sm: 4, md: 4, lg: 6, xl: 6 }}
                >
                    <Image
                        src={`${BASE_IMG_URL}${recipe?.image}`}
                        alt={recipe?.title}
                        objectFit='cover'
                        borderRadius='medium'
                        width={{ base: '100%', sm: '100%', md: '232px', lg: '353px', xl: '553px' }}
                        height={{ base: 'auto', sm: 'auto', md: '224px', lg: '410px', xl: '410px' }}
                    />
                    <Flex flex='1' flexDirection='column'>
                        <HStack spacing={3} justify='space-between' align='flex-start' mb={10}>
                            <Flex gap={2} align='center' wrap='wrap'>
                                {[...new Set(rootCategories)].map((item) => (
                                    <Badge key={item._id} variant='lime50'>
                                        <CategoryBadge
                                            categoryTitle={item.title}
                                            categoryIcon={item.icon}
                                        />
                                    </Badge>
                                ))}
                            </Flex>

                            <LikesInfo
                                likes={recipe?.likes}
                                bookmarks={recipe?.bookmarks}
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
                                    <Image src={BsAlarm} alt='alarm' boxSize='16px' />
                                    <Text textTransform='lowercase'>{recipe?.time}</Text>
                                </HStack>
                            </Badge>
                            <HStack spacing={4}>
                                {isAuthor ? (
                                    <HStack spacing={2}>
                                        <IconButton
                                            aria-label='Удалить рецепт'
                                            icon={<DeleteIcon />}
                                            colorScheme='black'
                                            variant='ghost'
                                            w='48px'
                                            h='48px'
                                            onClick={handleDelete}
                                            data-test-id='recipe-delete-button'
                                        />
                                        <Button
                                            variant='blackOutline'
                                            type='button'
                                            leftIcon={<LeftPen w='16px' h='16px' />}
                                            onClick={() =>
                                                navigate(
                                                    `/edit-recipe/${category}/${subcategory}/${id}`,
                                                )
                                            }
                                        >
                                            Редактировать рецепт
                                        </Button>
                                    </HStack>
                                ) : (
                                    <HStack spacing={2}>
                                        <Button
                                            leftIcon={
                                                <Image
                                                    src={BsEmojiHeartEyes}
                                                    boxSize={{
                                                        base: '14px',
                                                        lg: '14px',
                                                        xl: '16px',
                                                    }}
                                                />
                                            }
                                            variant='outline'
                                            colorScheme='black'
                                            py={{ base: '6px', lg: '6px', xl: '4' }}
                                            px={{ base: '3', lg: '3', xl: '6' }}
                                            height={{
                                                sm: '24px',
                                                md: '24px',
                                                lg: '32px',
                                                xl: '48px',
                                            }}
                                            onClick={handleLike}
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
                                                    src={BsBookmarkHeart}
                                                    boxSize={{
                                                        base: '14px',
                                                        lg: '14px',
                                                        xl: '16px',
                                                    }}
                                                />
                                            }
                                            variant='limeSolid'
                                            py={{ base: '6px', lg: '6px', xl: '4' }}
                                            px={{ base: '3', lg: '3', xl: '6' }}
                                            height={{
                                                sm: '24px',
                                                md: '24px',
                                                lg: '32px',
                                                xl: '48px',
                                            }}
                                            onClick={handleBookmark}
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
                                )}
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
                                value: recipe?.nutritionValue.protein,
                                unit: 'ГРАММ',
                            },
                            { label: 'жиры', value: recipe?.nutritionValue.fats, unit: 'ГРАММ' },
                            {
                                label: 'углеводы',
                                value: recipe?.nutritionValue.carbohydrates,
                                unit: 'ГРАММ',
                            },
                        ].map((item) => (
                            <Stack
                                key={item.label}
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
                                <Text color='secondaryText' flex={{ sm: 2, md: 1 }}>
                                    {item.label}
                                </Text>
                                <Heading
                                    variant='sectionBlogTitle'
                                    fontWeight='600'
                                    color='customLime.800'
                                    fontSize={{
                                        base: '36px',
                                        sm: '24px',
                                        smPlus: '24px',
                                        md: '36px',
                                    }}
                                    lineHeight={{
                                        base: '40px',
                                        sm: '32px',
                                        smPlus: '32px',
                                        md: '40px',
                                    }}
                                    flex={{ sm: 2, md: 1 }}
                                    textAlign={{ sm: 'center', md: 'left' }}
                                >
                                    {item.value}
                                </Heading>
                                <Text
                                    fontWeight='bold'
                                    color='rgba(0, 0, 0, 0.92)'
                                    flex={{ sm: 1, md: 1 }}
                                >
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
                                            <NumberIncrementStepper
                                                data-test-id={TEST_IDS.INCREMENT_STEPPER}
                                            />
                                            <NumberDecrementStepper
                                                data-test-id={TEST_IDS.DECREMENT_STEPPER}
                                            />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </HStack>
                            </HStack>
                        </Heading>
                        <Grid templateColumns='1fr 1fr'>
                            {recipe?.ingredients.map((ingredient, index) => {
                                const newCount = getNewCount(Number(ingredient.count));

                                return (
                                    <React.Fragment key={ingredient.title + index}>
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
                                                <span
                                                    data-test-id={`${TEST_IDS.INGREDIENT_QUANTITY}-${index}`}
                                                    style={{ marginRight: '4px' }}
                                                >
                                                    {ingredient.measureUnit === 'по вкусу'
                                                        ? ''
                                                        : newCount}
                                                </span>
                                                {ingredient.measureUnit}
                                            </Text>
                                        </Box>
                                    </React.Fragment>
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
                                <Card key={step.stepNumber} w='100%'>
                                    <HStack gap={{ sm: 0, md: 2, lg: 4, xl: 4 }}>
                                        {step.image && (
                                            <Image
                                                src={`${BASE_IMG_URL}${step.image}`}
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
                                        <Image src={followIcon} alt='Подписаться' boxSize='12px' />
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
                                    <Image src={people} alt='numbers' boxSize='12px' />
                                    <Text textStyle='limeSmall'>{author.numbers}</Text>
                                </HStack>
                            </VStack>
                        </HStack>
                    </Box>
                </VStack>
            </Box>
            {sliderRecipes && <SliderList recipes={sliderRecipes.data} />}
        </Box>
    );
};
