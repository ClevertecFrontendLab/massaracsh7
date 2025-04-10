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
                  marginBottom: { base: '12px', sm: '16px', md: '16px', lg: '40px', xl: '40px' },
              }
            : {
                  columnGap: { base: '12px', sm: '12px', md: '16px', lg: '16px', xl: '24px' },
                  rowGap: { base: '12px', sm: '12px', md: '16px', lg: '16px', xl: '16px' },
                  marginBottom: { base: '12px', sm: '16px', md: '16px', lg: '40px', xl: '16px' },
              };

    return (
        <SimpleGrid w='100%' columns={{ base: 1, sm: 1, md: 2, lg: 1, xl: 2 }} sx={gridStyles}>
            {recipes.map((recipe, index) => (
                <RecipeCard key={index} {...recipe} />
            ))}
        </SimpleGrid>
    );
};

export default RecipeList;
