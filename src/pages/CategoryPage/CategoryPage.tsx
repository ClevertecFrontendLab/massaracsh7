import { Box, Button, Center, Heading, Text } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import TabsCategory from '~/components/TabsCategory/TabsCategory';
import useRandomCategory from '~/hooks/useRandomCategory';
import { useGetRecipesByCategoryQuery } from '~/query/services/recipes';
import { setAppError } from '~/store/app-slice';
import { ApplicationState } from '~/store/configure-store';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { Category, SubCategory } from '~/types/apiTypes';

const CategoryPage = () => {
    const { category, subcategory } = useParams();
    const dispatch = useAppDispatch();

    const { categories, subCategories } = useAppSelector(
        (state: ApplicationState) => state.categories,
    );

    const cat = categories.find((item: Category) => item.category === category);
    const subCat = subCategories.find((item: SubCategory) => item.category === subcategory);

    const { randomRecipes, randomTitle, randomDescription } = useRandomCategory(cat?._id ?? null);

    const selectedAllergens = useSelector(
        (state: ApplicationState) => state.filters.selectedAllergens,
    );
    const excludeAllergens = useSelector(
        (state: ApplicationState) => state.filters.excludeAllergens,
    );
    // const selectedAuthors = useSelector((state: ApplicationState) => state.filters.selectedAuthors);
    // const selectedCategories = useSelector(
    //     (state: ApplicationState) => state.filters.selectedCategories,
    // );
    // const selectedMeat = useSelector((state: ApplicationState) => state.filters.selectedMeat);
    // const selectedSide = useSelector((state: ApplicationState) => state.filters.selectedSide);
    const searchTerm = useSelector((state: ApplicationState) => state.filters.searchTerm);
    const queryArgs = subCat?._id
        ? {
              id: subCat._id,
          }
        : skipToken;

    const {
        data,
        isError,
        // isLoading,
        // isSuccess,
    } = useGetRecipesByCategoryQuery(queryArgs, {
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (isError) {
            dispatch(setAppError('Попробуйти поискать снова попозже.'));
        }
    }, [isError, dispatch]);

    // const filteredPopular = useMemo(
    //     () =>
    //         recipesCategories.filter((recipe) => {
    //             const ingredients = recipe.ingredients?.map((i) => i.title.toLowerCase()) || [];
    //             const recipeTitle = recipe.title.toLowerCase();
    //             const lowerSearch = searchTerm.toLowerCase();

    //             const passesAllergens =
    //                 !excludeAllergens ||
    //                 !selectedAllergens.length ||
    //                 !ingredients.some((ingredient) => {
    //                     const lowerIngredient = ingredient.toLowerCase();
    //                     return selectedAllergens.some((allergen) => {
    //                         const allergenParts = allergen
    //                             .toLowerCase()
    //                             .replace(/[()]/g, '')
    //                             .split(/[,\s]+/);
    //                         return allergenParts.some(
    //                             (part) => part && lowerIngredient.includes(part),
    //                         );
    //                     });
    //                 });
    //             const passesAuthors =
    //                 !selectedAuthors.length ||
    //                 authors.some(
    //                     (author) =>
    //                         selectedAuthors.includes(author.name) &&
    //                         author.recipesId.includes(recipe.id),
    //                 );

    //             const catUrl = categories
    //                 .filter((item) => selectedCategories.includes(item.title))
    //                 .map((item) => item.url);

    //             const passesCategories =
    //                 !selectedCategories.length ||
    //                 catUrl?.some((item: string) => recipe.category?.includes(item));

    //             const passesMeat = !selectedMeat.length || selectedMeat.includes(recipe.meat || '');

    //             const passesSide = !selectedSide.length || selectedSide.includes(recipe.side || '');

    //             const titleMatch = !searchTerm || recipeTitle.includes(lowerSearch);

    //             return (
    //                 passesAllergens &&
    //                 passesAuthors &&
    //                 passesCategories &&
    //                 passesMeat &&
    //                 passesSide &&
    //                 titleMatch
    //             );
    //         }),
    //     [
    //         selectedAllergens,
    //         excludeAllergens,
    //         selectedAuthors,
    //         selectedCategories,
    //         selectedMeat,
    //         selectedSide,
    //         searchTerm,
    //         recipesCategories,
    //     ],
    // );
    // dispatch(
    //     setHasResults(searchTerm.length < 3 ? null : categoryRecipes.length > 0 ? true : false),
    // );
    return (
        <Box>
            <Box
                boxShadow={
                    searchTerm || selectedAllergens.length > 0 || excludeAllergens ? 'main' : 'none'
                }
                pb={8}
                mb={6}
                borderRadius='0 0 8px 8px'
                width={{ base: '100%', sm: '100%', md: '480px', lg: '578px', xl: '898px' }}
                mx='auto'
                px={{ base: '16px', sm: '16px', md: '16px', lg: '30px', xl: '190px' }}
            >
                <Heading
                    variant='pageTitle'
                    mb={{ sm: '14px', md: '14px', lg: '12px', xl: '12px' }}
                >
                    {cat?.title}
                </Heading>
                <Box
                    width='100%'
                    maxW='700px'
                    mx='auto'
                    mb={{ sm: '4', md: '4', lg: '8', xl: '8' }}
                >
                    <Text textAlign='center' textStyle='descriptionText'>
                        {cat?.description}
                    </Text>
                </Box>
                <SearchBar />
            </Box>
            <TabsCategory subcategories={cat?.subCategories ?? []} />
            {data?.data && <RecipeList recipes={data?.data} gridVariant='low' />}
            <Center mb={{ sm: '8', md: '8', lg: '10', xl: '9' }}>
                <Button variant='limeSolid' size='medium'>
                    Загрузить ещё
                </Button>
            </Center>
            <KitchenSection
                title={randomTitle}
                description={randomDescription}
                relevantRecipes={randomRecipes}
            />
        </Box>
    );
};

export default CategoryPage;
