import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { ArrowBlackRight } from '~/assets/icons/icons';
import BlogList from '~/components/BlogList/BlogList';
import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import SliderList from '~/components/SliderList/SliderList';
import { authors } from '~/data/authors';
import { tryDishes, veganDishes } from '~/data/cardsData';
import categories from '~/data/categories';
import { dishes } from '~/data/dishes';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { ApplicationState } from '~/store/configure-store';
import { setHasResults } from '~/store/filter-slice';

const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const selectedAllergens = useSelector(
    //     (state: ApplicationState) => state.filters.selectedAllergens,
    // );
    // const excludeAllergens = useSelector(
    //     (state: ApplicationState) => state.filters.excludeAllergens,
    // );
    // const selectedAuthors = useSelector((state: ApplicationState) => state.filters.selectedAuthors);
    // const selectedCategories = useSelector(
    //     (state: ApplicationState) => state.filters.selectedCategories,
    // );
    // const selectedMeat = useSelector((state: ApplicationState) => state.filters.selectedMeat);
    // const selectedSide = useSelector((state: ApplicationState) => state.filters.selectedSide);
    // const searchTerm = useSelector((state: ApplicationState) => state.filters.searchTerm);

    const {
        selectedAllergens,
        excludeAllergens,
        selectedAuthors,
        selectedCategories,
        selectedMeat,
        selectedSide,
        searchTerm,
    } = useSelector((state: ApplicationState) => state.filters);

    const {
        data: sliderRecipes,
        isLoading,
        isError,
    } = useGetRecipesQuery(
        {
            // allergens: selectedAllergens.join(','),
            // subcategoriesIds: selectedCategories.join(','),
            // meat: selectedMeat.join(','),
            // garnish: selectedSide.join(','),
            sortBy: 'createdAt',
            sortOrder: 'desc',
            limit: 10,
        },
        {
            refetchOnMountOrArgChange: true,
        },
    );

    const { data: juiciestRecipes } = useGetRecipesQuery(
        {
            // allergens: selectedAllergens.join(','),
            // subcategoriesIds: selectedCategories.join(','),
            // meat: selectedMeat.join(','),
            // garnish: selectedSide.join(','),
            sortBy: 'likes',
            sortOrder: 'desc',
            limit: 4,
        },
        {
            refetchOnMountOrArgChange: true,
        },
    );

    const filteredPopular = useMemo(
        () =>
            dishes.filter((recipe) => {
                const ingredients = recipe.ingredients?.map((i) => i.title.toLowerCase()) || [];
                const recipeTitle = recipe.title.toLowerCase();
                const lowerSearch = searchTerm.toLowerCase();

                const passesAllergens =
                    !excludeAllergens ||
                    !selectedAllergens.length ||
                    !ingredients.some((ingredient) => {
                        const lowerIngredient = ingredient.toLowerCase();
                        return selectedAllergens.some((allergen) => {
                            const allergenParts = allergen
                                .toLowerCase()
                                .replace(/[()]/g, '')
                                .split(/[,\s]+/);
                            return allergenParts.some(
                                (part) => part && lowerIngredient.includes(part),
                            );
                        });
                    });
                const passesAuthors =
                    !selectedAuthors.length ||
                    authors.some(
                        (author) =>
                            selectedAuthors.includes(author.name) &&
                            author.recipesId.includes(recipe.id),
                    );

                const catUrl = categories
                    .filter((item) => selectedCategories.includes(item.title))
                    .map((item) => item.url);

                const passesCategories =
                    !selectedCategories.length ||
                    catUrl?.some((item: string) => recipe.category?.includes(item));

                const passesMeat = !selectedMeat.length || selectedMeat.includes(recipe.meat || '');

                const passesSide = !selectedSide.length || selectedSide.includes(recipe.side || '');

                const titleMatch = !searchTerm || recipeTitle.includes(lowerSearch);

                return (
                    passesAllergens &&
                    passesAuthors &&
                    passesCategories &&
                    passesMeat &&
                    passesSide &&
                    titleMatch
                );
            }),
        [
            selectedAllergens,
            excludeAllergens,
            selectedAuthors,
            selectedCategories,
            selectedMeat,
            selectedSide,
            searchTerm,
        ],
    );

    useEffect(() => {
        dispatch(
            setHasResults(searchTerm.length < 3 ? null : filteredPopular.length > 0 ? true : false),
        );
    }, [dispatch, searchTerm, filteredPopular.length]);

    if (isLoading) {
        return <Text>Загрузка...</Text>;
    }

    if (isError) {
        return <Text>Error...</Text>;
    }
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
                <Heading variant='pageTitle' mb={{ sm: '14px', md: '14px', lg: '8', xl: '8' }}>
                    Приятного аппетита!
                </Heading>
                <SearchBar />
            </Box>
            {searchTerm.length < 3 && sliderRecipes && <SliderList recipes={sliderRecipes?.data} />}

            {searchTerm.length < 3 && (
                <>
                    <HStack justify='space-between' mb={{ base: 3, sm: 3, md: 3, lg: 4, xl: 6 }}>
                        <Heading variant='sectionTitle'>Самое сочное</Heading>
                        <Button
                            display={{
                                base: 'flex',
                                sm: 'none',
                                md: 'none',
                                lg: 'flex',
                                xl: 'flex',
                            }}
                            data-test-id='juiciest-link'
                            variant='limeSolid'
                            size='large'
                            rightIcon={<ArrowBlackRight w='14px' />}
                            onClick={() => navigate('/the-juiciest')}
                        >
                            Вся подборка
                        </Button>
                    </HStack>
                </>
            )}
            {juiciestRecipes && (
                <RecipeList
                    recipes={juiciestRecipes.data}
                    gridVariant={searchTerm.length >= 3 ? 'low' : 'wide'}
                />
            )}

            <Button
                display={{ base: 'none', sm: 'block', md: 'block', lg: 'none', xl: 'none' }}
                data-test-id='juiciest-link-mobile'
                variant='limeSolid'
                size='large'
                mb={8}
                mx='auto'
                rightIcon={<ArrowBlackRight w='14px' />}
                onClick={() => navigate('/the-juiciest')}
            >
                Вся подборка
            </Button>

            {searchTerm.length < 3 && <BlogList />}
            {searchTerm.length < 3 && (
                <KitchenSection
                    title='Веганская кухня'
                    description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.'
                    veganDishes={veganDishes}
                    tryDishes={tryDishes}
                />
            )}
        </Box>
    );
};

export default Main;
