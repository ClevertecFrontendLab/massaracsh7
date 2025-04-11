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
                  gap: { base: '12px', sm: '12px', md: '16px', lg: '16px', xl: '24px' },
                  marginBottom: { base: '12px', sm: '12px', md: '12px', lg: '36px', xl: '36px' },
              }
            : {
                  columnGap: { base: '12px', sm: '12px', md: '16px', lg: '16px', xl: '24px' },
                  rowGap: { base: '12px', sm: '12px', md: '16px', lg: '16px', xl: '16px' },
                  marginBottom: { base: '12px', sm: '16px', md: '16px', lg: '14px', xl: '14px' },
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
