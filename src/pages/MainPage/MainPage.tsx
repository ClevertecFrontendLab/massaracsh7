import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { ArrowBlackRight } from '~/assets/icons/icons';
import BlogList from '~/components/BlogList/BlogList';
import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import SliderList from '~/components/SliderList/SliderList';
import useRandomCategory from '~/hooks/useRandomCategory';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { ApplicationState } from '~/store/configure-store';
import { setHasResults } from '~/store/filter-slice';
import { buildQuery } from '~/utils/buildQuery';

const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        selectedAllergens,
        excludeAllergens,
        selectedCategories,
        selectedMeat,
        selectedSide,
        searchTerm,
    } = useSelector((state: ApplicationState) => state.filters);

    const sliderParams = buildQuery({
        selectedAllergens,
        selectedCategories,
        selectedMeat,
        selectedSide,
        searchTerm,
        sortBy: 'createdAt',
        sortOrder: 'asc',
        limit: 10,
    });

    const {
        data: sliderRecipes,
        isLoading,
        isError,
    } = useGetRecipesQuery(sliderParams, {
        refetchOnMountOrArgChange: true,
    });

    const juiciestParams = buildQuery({
        selectedCategories,
        selectedMeat,
        selectedSide,
        selectedAllergens,
        searchTerm,
        sortBy: 'likes',
        sortOrder: 'desc',
        limit: 4,
        page: 1,
    });

    const { data: juiciestRecipes } = useGetRecipesQuery(juiciestParams, {
        refetchOnMountOrArgChange: true,
    });

    console.log(juiciestRecipes);
    const { randomRecipes, randomTitle, randomDescription } = useRandomCategory(null);

    // const filteredPopular = useMemo(
    //     () =>
    //         dishes.filter((recipe) => {
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
    //     ],
    // );

    useEffect(() => {
        dispatch(
            setHasResults(
                searchTerm.length < 2 ? null : juiciestRecipes?.data?.length ? true : false,
            ),
        );
    }, [dispatch, searchTerm, juiciestRecipes?.data.length]);

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
            {searchTerm.length < 2 && sliderRecipes && <SliderList recipes={sliderRecipes?.data} />}

            {searchTerm.length < 2 && (
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
                    gridVariant={searchTerm.length >= 2 ? 'low' : 'wide'}
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
            {searchTerm.length < 3 && randomRecipes && (
                <KitchenSection
                    title={randomTitle}
                    description={randomDescription}
                    relevantRecipes={randomRecipes}
                />
            )}
        </Box>
    );
};

export default Main;
