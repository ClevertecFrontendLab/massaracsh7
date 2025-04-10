import { Box, Button, Center, Heading } from '@chakra-ui/react';

import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import { juicyRecipes, tryDishes, veganDishes } from '~/data/cardsData';

const JuicyPage = () => (
    <Box>
        <Heading variant='pageTitle' mb={3} pt={1.5}>
            Самое сочное
        </Heading>
        <SearchBar bottom='32px' />
        <RecipeList recipes={juicyRecipes} gridVariant='low' />
        <Center mb={{ sm: '8', md: '8', lg: '10', xl: '10' }}>
            <Button variant='limeSolid' size='medium'>
                Загрузить ещё
            </Button>
        </Center>
        <KitchenSection
            title='Веганская кухня'
            description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.'
            veganDishes={veganDishes}
            tryDishes={tryDishes}
        />
    </Box>
);

export default JuicyPage;
