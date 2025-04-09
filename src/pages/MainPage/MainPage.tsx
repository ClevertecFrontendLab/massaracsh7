import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Heading, Hide, HStack, Show } from '@chakra-ui/react';

import BlogList from '~/components/BlogList/BlogList';
import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import SliderList from '~/components/SliderList/SliderList';
import { popularRecipes, tryDishes, veganDishes } from '~/data/cardsData';

const Main = () => (
    <Box>
        <Heading variant='pageTitle' mb={8} pt={1.5}>
            Приятного аппетита!
        </Heading>
        <SearchBar />
        <SliderList />
        <HStack justify='space-between' mb={{ base: 8, lg: 4, xl: 6 }}>
            <Heading variant='sectionTitle'>Самое сочное</Heading>
            <Hide below='md'>
                <Button variant='limeSolid' size='large' rightIcon={<ArrowForwardIcon />}>
                    Вся подборка
                </Button>
            </Hide>
        </HStack>
        <RecipeList recipes={popularRecipes} gridVariant='wide' />

        <Show below='md'>
            <Center mb={10}>
                <Button variant='limeSolid' size='large' rightIcon={<ArrowForwardIcon />}>
                    Вся подборка
                </Button>
            </Center>
        </Show>

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
