import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import BlogList from '~/components/BlogList/BlogList';
import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import SliderList from '~/components/SliderList/SliderList';
import { popularRecipes, tryDishes, veganDishes } from '~/data/cardsData';

const Main = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Heading variant='pageTitle' mb={8} pt={1.5}>
                Приятного аппетита!
            </Heading>
            <SearchBar />
            <SliderList />
            <HStack justify='space-between' mb={{ base: 8, lg: 4, xl: 6 }}>
                <Heading variant='sectionTitle'>Самое сочное</Heading>
                <Button
                    display={{ base: 'block', sm: 'none', md: 'none', lg: 'block', xl: 'block' }}
                    data-test-id='juiciest-link'
                    variant='limeSolid'
                    size='large'
                    rightIcon={<ArrowForwardIcon />}
                    onClick={() => navigate('/juicy')}
                >
                    Вся подборка
                </Button>
            </HStack>
            <RecipeList recipes={popularRecipes} gridVariant='wide' />

            <Button
                display={{ base: 'none', sm: 'block', md: 'block', lg: 'none', xl: 'none' }}
                data-test-id='juiciest-link-mobile'
                variant='limeSolid'
                size='large'
                mb={10}
                mx='auto'
                rightIcon={<ArrowForwardIcon />}
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
