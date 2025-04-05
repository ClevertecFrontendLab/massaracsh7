import { Box, Heading } from '@chakra-ui/react';

import BlogList from '~/components/BlogList/BlogList';
import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import SliderList from '~/components/SliderList/SliderList';
import { tryDishes, veganDishes } from '~/data/cardsData';

const Main = () => (
    <Box>
        <Heading variant='pageTitle' mb={8} pt={1.5} pr='44px'>
            Приятного аппетита!
        </Heading>
        <SearchBar />
        <SliderList />
        <Heading variant='sectionTitle' mt={8}>
            Самое сочное
        </Heading>
        <RecipeList />
        <BlogList />
        <KitchenSection
            title='Веганская кухня'
            description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.'
            veganDishes={veganDishes}
            tryDishes={tryDishes}
        />
    </Box>
);

export default Main;
