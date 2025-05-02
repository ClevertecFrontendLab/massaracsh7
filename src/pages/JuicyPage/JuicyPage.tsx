import { Box, Button, Center, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
// import { authors } from '~/data/authors';
// import { tryDishes, veganDishes } from '~/data/cardsData';
// import categories from '~/data/categories';
// import { dishes } from '~/data/dishes';
import useRandomCategory from '~/hooks/useRandomCategory';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { ApplicationState } from '~/store/configure-store';
import { Recipe } from '~/types/apiTypes';

const JuicyPage = () => {
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
    const { randomRecipes, randomTitle, randomDescription } = useRandomCategory(null);
    const [page, setPage] = useState(1);
    const [juiciestRecipes, setJuiciestRecipes] = useState<Recipe[]>([]);

    // const filteredPopular = useMemo(
    //     () =>
    //         dishes
    //             .filter((recipe) => {
    //                 const ingredients = recipe.ingredients?.map((i) => i.title.toLowerCase()) || [];
    //                 const recipeTitle = recipe.title.toLowerCase();
    //                 const lowerSearch = searchTerm.toLowerCase();

    //                 const passesAllergens =
    //                     !excludeAllergens ||
    //                     !selectedAllergens.length ||
    //                     !ingredients.some((ingredient) => {
    //                         const lowerIngredient = ingredient.toLowerCase();
    //                         return selectedAllergens.some((allergen) => {
    //                             const allergenParts = allergen
    //                                 .toLowerCase()
    //                                 .replace(/[()]/g, '')
    //                                 .split(/[,\s]+/);
    //                             return allergenParts.some(
    //                                 (part) => part && lowerIngredient.includes(part),
    //                             );
    //                         });
    //                     });

    //                 const passesAuthors =
    //                     !selectedAuthors.length ||
    //                     authors.some(
    //                         (author) =>
    //                             selectedAuthors.includes(author.name) &&
    //                             author.recipesId.includes(recipe.id),
    //                     );

    //                 const catUrl = categories
    //                     .filter((item) => selectedCategories.includes(item.title))
    //                     .map((item) => item.url);

    //                 const passesCategories =
    //                     !selectedCategories.length ||
    //                     catUrl?.some((item: string) => recipe.category?.includes(item));

    //                 const passesMeat =
    //                     !selectedMeat.length || selectedMeat.includes(recipe.meat || '');

    //                 const passesSide =
    //                     !selectedSide.length || selectedSide.includes(recipe.side || '');

    //                 const titleMatch = !searchTerm || recipeTitle.includes(lowerSearch);

    //                 return (
    //                     passesAllergens &&
    //                     passesAuthors &&
    //                     passesCategories &&
    //                     passesMeat &&
    //                     passesSide &&
    //                     titleMatch
    //                 );
    //             })
    //             .sort((a, b) => (b.likes || 0) - (a.likes || 0)),
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

    const {
        data,
        isLoading: isLoading,
        isSuccess,
    } = useGetRecipesQuery(
        {
            sortBy: 'likes',
            sortOrder: 'desc',
            limit: 8,
            page,
        },
        {
            refetchOnMountOrArgChange: true,
        },
    );

    useEffect(() => {
        if (isSuccess) {
            setJuiciestRecipes((prev) => [...prev, ...(data?.data || [])]);
        }
    }, [isSuccess, data]);

    const loadMoreRecipes = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const isLastPage = data && data?.meta.page >= data?.meta.totalPages;

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
                <Heading variant='pageTitle' mb={8}>
                    Самое сочное
                </Heading>
                <SearchBar />
            </Box>
            {juiciestRecipes && <RecipeList recipes={juiciestRecipes} gridVariant='low' />}
            <Center mb={{ sm: '8', md: '8', lg: '9', xl: '9' }}>
                {!isLastPage && !isLoading && (
                    <Button variant='limeSolid' size='medium' onClick={loadMoreRecipes}>
                        Загрузить ещё
                    </Button>
                )}
            </Center>
            {randomRecipes && (
                <KitchenSection
                    title={randomTitle}
                    description={randomDescription}
                    relevantRecipes={randomRecipes}
                />
            )}
        </Box>
    );
};

export default JuicyPage;
