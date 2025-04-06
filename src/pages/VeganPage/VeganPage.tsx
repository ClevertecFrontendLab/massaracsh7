import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react';

import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import TabsCategory from '~/components/TabsCategory/TabsCategory';
import { desertDishes, tryDesertDishes, veganRecipes } from '~/data/cardsData';

const VeganPage = () => (
    <Box>
        <Heading variant='pageTitle' mb={3} pt={1.5}>
            Веганская кухня
        </Heading>
        <Box width='700px' mx='auto' mb={8}>
            <Text
                textAlign='center'
                color='grayText'
                fontWeight={500}
                fontSize='16px'
                lineHeight='24px'
            >
                Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать
                вегетарианскую диету и готовить вкусные вегетарианские блюда.
            </Text>
        </Box>
        <SearchBar />
        <TabsCategory />
        <RecipeList recipes={veganRecipes} space={[6, 4]} />
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
            title='Десерты, выпечка'
            description='Без них невозможно представить себе ни современную, ни традиционную  кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб - рецепты изделий из теста многообразны и невероятно популярны.'
            veganDishes={desertDishes}
            tryDishes={tryDesertDishes}
        />
    </Box>
);

export default VeganPage;
