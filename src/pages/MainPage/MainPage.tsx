import { Box, Button, Heading, HStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { ArrowBlackRight } from '~/assets/icons/icons';
import BlogList from '~/components/BlogList/BlogList';
import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import SliderList from '~/components/SliderList/SliderList';
import { tryDishes, veganDishes } from '~/data/cardsData';
import { dishes } from '~/data/dishes';

const Main = () => {
    const navigate = useNavigate();
    const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
    const [excludeAllergens, setExcludeAllergens] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredPopular = useMemo(
        () =>
            dishes.filter((recipe) => {
                const ingredients = recipe.ingredients?.map((i) => i.title.toLowerCase()) || [];
                const titleMatch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
                const passesAllergens =
                    !excludeAllergens ||
                    !selectedAllergens.some((a) => ingredients.includes(a.toLowerCase()));

                return passesAllergens && (!searchTerm || titleMatch);
            }),
        [selectedAllergens, excludeAllergens, searchTerm],
    );

    const handleRecipeSearch = (query: string) => {
        setSearchTerm(query);
    };

    return (
        <Box>
            <Heading variant='pageTitle' mb={{ sm: '14px', md: '14px', lg: '8', xl: '8' }}>
                Приятного аппетита!
            </Heading>
            <SearchBar
                selectedAllergens={selectedAllergens}
                onChangeSelectedAllergens={setSelectedAllergens}
                excludeAllergens={excludeAllergens}
                onToggleExcludeAllergens={() => setExcludeAllergens((prev) => !prev)}
                onSearch={handleRecipeSearch}
            />
            {searchTerm.length < 3 && <SliderList />}

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
                            onClick={() => navigate('/juicy')}
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
                onClick={() => navigate('/juicy')}
            >
                Вся подборка
            </Button>

            <BlogList />
            <KitchenSection
                title='Веганская кухня'
                description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.'
                veganDishes={veganDishes}
                tryDishes={tryDishes}
            />
        </Box>
    );
};

export default Main;
