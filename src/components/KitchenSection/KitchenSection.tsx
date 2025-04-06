import { Heading, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import { KitchenDish, TryDish } from '~/types/typesData';

import DishCard from '../DishCard/DishCard';
import TryDishCard from '../TryDishCard/TryDishCard';

interface KitchenSectionProps {
    title: string;
    description: string;
    veganDishes: KitchenDish[];
    tryDishes: TryDish[];
}

const KitchenSection = ({ title, description, veganDishes, tryDishes }: KitchenSectionProps) => (
    <SimpleGrid columns={2} spacing={6} gap={6} borderTop='card' pt={6}>
        <Heading variant='sectionTitle'>{title}</Heading>
        <Text fontWeight={500} fontSize='16px' lineHeight='24px'>
            {description}
        </Text>
        <HStack spacing={6} align='flex-start'>
            {veganDishes.map((dish, index) => (
                <DishCard key={index} {...dish} />
            ))}
        </HStack>
        <VStack spacing={3} align='flex-start'>
            {tryDishes.map((item, index) => (
                <TryDishCard key={index} {...item} />
            ))}
        </VStack>
    </SimpleGrid>
);

export default KitchenSection;
