import { Heading, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';

import { Recipe } from '~/types/apiTypes';

import DishCard from '../DishCard/DishCard';
import TryDishCard from '../TryDishCard/TryDishCard';

interface KitchenSectionProps {
    title: string;
    description: string;
    // veganDishes: KitchenDish[];
    // tryDishes: TryDish[];
    relevantRecipes: Recipe[];
}

const KitchenSection = ({ title, description, relevantRecipes }: KitchenSectionProps) => {
    console.log(relevantRecipes);
    const veganDishes = relevantRecipes.slice(0, 2);
    const tryDishes = relevantRecipes.slice(2, 5);

    return (
        <SimpleGrid
            columns={{ base: 1, sm: 1, md: 3, lg: 3, xl: 2 }}
            borderTop='card'
            pt={{ sm: 2, md: 2, lg: 6, xl: 6 }}
            rowGap={{ sm: 3, md: 3, lg: 5, xl: 5 }}
            columnGap={{ md: 3, lg: 4, xl: 4 }}
        >
            <Heading variant='sectionTitle'>{title}</Heading>
            <Text
                textStyle='descriptionText'
                gridColumn={{
                    base: 'auto',
                    md: 'span 3',
                    lg: 'span 2',
                    xl: 'auto',
                }}
                px={{ lg: 1 }}
                pb={{ md: 1 }}
            >
                {description}
            </Text>
            <Stack
                direction={{ base: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }}
                spacing={{ base: 3, sm: 3, md: 3, lg: 4, xl: 6 }}
                align='flex-start'
                gridColumn={{ base: 'auto', md: 'span 2', lg: 'span 2', xl: 'auto' }}
            >
                {veganDishes.map((item, index) => (
                    <DishCard key={index} recipe={item} />
                ))}
            </Stack>
            <VStack spacing={{ base: 4, sm: 4, md: 1.5, lg: 3, xl: 3 }} align='flex-start'>
                {tryDishes.map((item, index) => (
                    <TryDishCard key={index} recipe={item} />
                ))}
            </VStack>
        </SimpleGrid>
    );
};

export default KitchenSection;
