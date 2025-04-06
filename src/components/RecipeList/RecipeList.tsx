import { SimpleGrid } from '@chakra-ui/react';

import { CardData } from '~/types/typesData';

import RecipeCard from '../RecipeCard/RecipeCard';

interface RecipeListProps {
    recipes: CardData[];
    space: [number, number];
}

const RecipeList = ({ recipes, space }: RecipeListProps) => (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacingX={space[0]} spacingY={space[1]} mb={10}>
        {recipes.map((recipe, index) => (
            <RecipeCard key={index} {...recipe} />
        ))}
    </SimpleGrid>
);

export default RecipeList;
