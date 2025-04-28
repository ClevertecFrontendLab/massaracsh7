import { Box, Button, Center, Heading, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import TabsCategory from '~/components/TabsCategory/TabsCategory';
import { authors } from '~/data/authors';
import { desertDishes, tryDesertDishes } from '~/data/cardsData';
import categories from '~/data/categories';
import { dishes } from '~/data/dishes';
import { ApplicationState } from '~/store/configure-store';

const CategoryPage = () => {
    const { category, subcategory } = useParams();

    const cat = categories.find((item) => item.url === category);
    const recipesCategories = useMemo(() => {
        if (category && subcategory) {
            return dishes.filter((dish) =>
                dish.category.some(
                    (cat, index) => cat === category && dish.subcategory[index] === subcategory,
                ),
            );
        } else if (category) {
            return dishes.filter((dish) => dish.category.includes(category));
        }
        return dishes;
    }, [category, subcategory]);

    const selectedAllergens = useSelector(
        (state: ApplicationState) => state.filters.selectedAllergens,
    );
    const excludeAllergens = useSelector(
        (state: ApplicationState) => state.filters.excludeAllergens,
    );
    const selectedAuthors = useSelector((state: ApplicationState) => state.filters.selectedAuthors);
    const selectedCategories = useSelector(
        (state: ApplicationState) => state.filters.selectedCategories,
    );
    const selectedMeat = useSelector((state: ApplicationState) => state.filters.selectedMeat);
    const selectedSide = useSelector((state: ApplicationState) => state.filters.selectedSide);
    const searchTerm = useSelector((state: ApplicationState) => state.filters.searchTerm);

    const filteredPopular = useMemo(
        () =>
            recipesCategories.filter((recipe) => {
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
            recipesCategories,
        ],
    );

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
                    width={{ sm: '100%', md: '100%', lg: '700px', xl: '700px' }}
                    mx='auto'
                    mb={{ sm: '4', md: '4', lg: '8', xl: '8' }}
                >
                    <Text textAlign='center' textStyle='descriptionText'>
                        Интересны не только убеждённым вегетарианцам, но и тем, кто хочет
                        попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.
                    </Text>
                </Box>
                <SearchBar />
            </Box>
            <TabsCategory subcategories={cat?.items ?? []} />
            <RecipeList recipes={filteredPopular} gridVariant='low' />
            <Center mb={{ sm: '8', md: '8', lg: '10', xl: '9' }}>
                <Button variant='limeSolid' size='medium'>
                    Загрузить ещё
                </Button>
            </Center>
            <KitchenSection
                title='Десерты, выпечка'
                description='Без них невозможно представить себе ни современную, ни традиционную  кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб - рецепты изделий из теста многообразны и невероятно популярны.'
                veganDishes={desertDishes}
                tryDishes={tryDesertDishes}
            />
        </Box>
    );
};

export default CategoryPage;
