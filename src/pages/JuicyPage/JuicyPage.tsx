import { Box, Button, Heading, HStack } from '@chakra-ui/react';

import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import { juicyRecipes, tryDishes, veganDishes } from '~/data/cardsData';

const JuicyPage = () => (
    <Box>
        <Heading variant='pageTitle' mb={8} pt={1.5}>
            Самое сочное
        </Heading>
        <SearchBar bottom={8} />
        <RecipeList recipes={juicyRecipes} space={[6, 4]} />
        <HStack justify='center' mb={10}>
            <Button
                size='md'
                background='customLime.400'
                fontSize='16px'
                fontWeight='600'
                lineHeight='24px'
            >
                Загрузить еще
            </Button>
        </HStack>
        <KitchenSection
            title='Веганская кухня'
            description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.'
            veganDishes={veganDishes}
            tryDishes={tryDishes}
        />
    </Box>
);

export default JuicyPage;
