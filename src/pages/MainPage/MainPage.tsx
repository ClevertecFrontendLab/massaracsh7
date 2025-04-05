import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, HStack } from '@chakra-ui/react';

import BlogList from '~/components/BlogList/BlogList';
import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import SliderList from '~/components/SliderList/SliderList';
import { tryDishes, veganDishes } from '~/data/cardsData';

const Main = () => (
    <Box>
        <Heading variant='pageTitle' mb={8} pt={1.5}>
            Приятного аппетита!
        </Heading>
        <SearchBar />
        <SliderList />
        <HStack justify='space-between' mb={6}>
            <Heading variant='sectionTitle'>Самое сочное</Heading>
            <Button
                background='customLime.400'
                borderRadius='small'
                py='16px'
                px={6}
                rightIcon={<ArrowForwardIcon />}
                fontWeight='600'
                fontSize='18px'
                lineHeight='28px'
            >
                Вся подборка
            </Button>
        </HStack>
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
