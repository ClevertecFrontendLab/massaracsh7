import { Box, Button, Center, Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router';

import KitchenSection from '~/components/KitchenSection/KitchenSection';
import RecipeList from '~/components/RecipeList/RecipeList';
import SearchBar from '~/components/SearchBar/SearchBar';
import TabsCategory from '~/components/TabsCategory/TabsCategory';
import { desertDishes, tryDesertDishes, veganRecipes } from '~/data/cardsData';
import categories from '~/data/categories';

const VeganPage = () => {
    const { category } = useParams();

    const cat = categories.find((item) => item.url === category);

    return (
        <Box>
            <Heading variant='pageTitle' mb={{ sm: '14px', md: '14px', lg: '12px', xl: '12px' }}>
                {cat?.title}
            </Heading>
            <Box
                width={{ sm: '100%', md: '100%', lg: '700px', xl: '700px' }}
                mx='auto'
                mb={{ sm: '4', md: '4', lg: '8', xl: '8' }}
            >
                <Text textAlign='center' textStyle='descriptionText'>
                    Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать
                    вегетарианскую диету и готовить вкусные вегетарианские блюда.
                </Text>
            </Box>
            <SearchBar bottom='24px' />
            <TabsCategory subcategories={cat?.items ?? []} />
            <RecipeList recipes={veganRecipes} gridVariant='low' />
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

export default VeganPage;
