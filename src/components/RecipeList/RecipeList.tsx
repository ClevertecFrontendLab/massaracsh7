import { SimpleGrid } from '@chakra-ui/react';

import { CardData } from '~/types/typesData';

import RecipeCard from '../RecipeCard/RecipeCard';

interface RecipeListProps {
    recipes: CardData[];
    gridVariant?: 'wide' | 'low';
}

const RecipeList = ({ recipes, gridVariant }: RecipeListProps) => {
    const gridStyles =
        gridVariant === 'wide'
            ? {
                  gap: { base: 3, sm: 3, md: 4, lg: 4, xl: 6 },
                  marginBottom: { base: 3, sm: 3, md: 3, lg: 10, xl: 10 },
              }
            : {
                  columnGap: { base: 3, sm: 3, md: 4, lg: 4, xl: 6 },
                  rowGap: { base: 3, sm: 3, md: 4, lg: 4, xl: 4 },
                  marginBottom: { base: 3, sm: 4, md: 4, lg: 3.5, xl: 3.5 },
              };

    return (
        <SimpleGrid
            w='100%'
            templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                mid: '1fr',
                lg: '1fr',
                xl: 'repeat(2, 668px)',
            }}
            justifyContent='center'
            sx={gridStyles}
        >
            {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
            ))}
        </SimpleGrid>
    );
};

export default RecipeList;
