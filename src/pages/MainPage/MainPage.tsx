import { Box, Button, Heading, HStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
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
import { ApplicationState } from '~/store/configure-store';

const Main = () => {
    const navigate = useNavigate();
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
    console.log(excludeAllergens, selectedAllergens);
    const selectedMeat = useSelector((state: ApplicationState) => state.filters.selectedMeat);
    const selectedSide = useSelector((state: ApplicationState) => state.filters.selectedSide);
    const searchTerm = useSelector((state: ApplicationState) => state.filters.searchTerm);

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
    console.log(filteredPopular);
    return (
        <Box>
            <Box
                boxShadow={
                    searchTerm || selectedAllergens.length > 0 || excludeAllergens ? 'main' : 'none'
                }
                pb={8}
                mb={6}
                borderRadius={6}
            >
                <Heading variant='pageTitle' mb={{ sm: '14px', md: '14px', lg: '8', xl: '8' }}>
                    Приятного аппетита!
                </Heading>
                <SearchBar />
            </Box>
            {searchTerm.length < 3 && <SliderList recipes={filteredPopular} />}

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

            <RecipeList
                recipes={filteredPopular}
                gridVariant={searchTerm.length >= 3 ? 'low' : 'wide'}
            />

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
