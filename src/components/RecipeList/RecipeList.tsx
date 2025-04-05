import { SimpleGrid } from '@chakra-ui/react';

import { popularRecipes } from '~/data/cardsData';

import RecipeCard from '../RecipeCard/RecipeCard';

const RecipeList = () => (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
        {popularRecipes.map((recipe, index) => (
            <RecipeCard key={index} {...recipe} />
        ))}
    </SimpleGrid>
);

export default RecipeList;
