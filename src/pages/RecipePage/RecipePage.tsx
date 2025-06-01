import { Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { CustomLoader } from '~/components/CustomLoader/CustomLoader';
import { LikesInfo } from '~/components/LikesInfo/LikesInfo';
import { AuthorCard } from '~/components/RecipeParts/AuthorCard';
import { CategoryBadges } from '~/components/RecipeParts/CategoryBadges';
import { IngredientsList } from '~/components/RecipeParts/IngredientsList';
import { NutritionInfo } from '~/components/RecipeParts/NutritionInfo';
import RecipeActions from '~/components/RecipeParts/RecipeActions';
import { RecipeImage } from '~/components/RecipeParts/RecipeImage';
import { RecipeStepsInfo } from '~/components/RecipeParts/RecipeSteps';
import { SliderList } from '~/components/SliderList/SliderList';
import { BASE_IMG_URL, BASE_LIMIT_SLIDER, ERROR_APP_MESSAGE } from '~/constants/constants';
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
import type { Category } from '~/types/apiTypes';
import { AuthorData } from '~/types/typesAuthor';
import { handleRecipePageError } from '~/utils/handleRecipePageError';

export const RecipePage: React.FC = () => {
    const { category, subcategory, id } = useParams<{
        category: string;
        subcategory: string;
        id: string;
    }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { data: recipe, isLoading, isError } = useGetRecipeByIdQuery(id ?? skipToken);
    const categoryIds = recipe?.categoriesIds ?? [];
    const rootCategories = useGetCategory(categoryIds) as Category[];
    const author = authors[0] as AuthorData;

    const [deleteRecipe] = useDeleteRecipeMutation();
    const [toggleBookmark] = useToggleBookmarkRecipeMutation();
    const [toggleLike] = useToggleLikeRecipeMutation();

    const [portions, setPortions] = useState<number>(1);
    const [initialPortions, setInitialPortions] = useState<number>(1);

    useEffect(() => {
        if (recipe?.portions) {
            setPortions(recipe.portions);
            setInitialPortions(recipe.portions);
        }
    }, [recipe?.portions]);

    const handlePortionsChange = (_valueString: string, valueNumber: number) => {
        if (valueNumber > 0) {
            setPortions(valueNumber);
        }
    };

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
            handleRecipePageError({
                err,
                dispatch,
                message: 'Не удалось удалить рецепт',
            });
        }
    };

    const handleBookmark = async () => {
        if (!id) return;
        try {
            await toggleBookmark(id).unwrap();
        } catch (err) {
            handleRecipePageError({ err, dispatch });
        }
    };

    const handleLike = async () => {
        if (!id) return;
        try {
            await toggleLike(id).unwrap();
        } catch (err) {
            handleRecipePageError({ err, dispatch });
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
                    <RecipeImage
                        src={`${BASE_IMG_URL}${recipe?.image}`}
                        alt={recipe?.title || ''}
                    />

                    <Flex flex='1' flexDirection='column'>
                        <HStack spacing={3} justify='space-between' align='flex-start' mb={10}>
                            <CategoryBadges categories={rootCategories} />
                            <LikesInfo
                                likes={recipe?.likes || 0}
                                bookmarks={recipe?.bookmarks || 0}
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

                        <RecipeActions
                            time={recipe?.time || 0}
                            isAuthor={isAuthor}
                            handleDelete={handleDelete}
                            handleLike={handleLike}
                            handleBookmark={handleBookmark}
                            navigate={navigate}
                            category={category!}
                            subcategory={subcategory!}
                            id={id!}
                        />
                    </Flex>
                </Flex>

                <VStack
                    maxW={{ sm: '100%', md: '100%', lg: '668px', xl: '668px' }}
                    mx='auto'
                    pt={{ sm: 6, md: 6, lg: 10, xl: 10 }}
                    alignItems='flex-start'
                >
                    <NutritionInfo nutritionValue={recipe!.nutritionValue!} />

                    <IngredientsList
                        ingredients={recipe!.ingredients!}
                        portions={portions}
                        initialPortions={initialPortions}
                        handlePortionsChange={handlePortionsChange}
                    />

                    {recipe && <RecipeStepsInfo steps={recipe.steps!} />}

                    <AuthorCard author={author} />
                </VStack>
            </Box>

            {sliderRecipes && <SliderList recipes={sliderRecipes.data} />}
        </Box>
    );
};
