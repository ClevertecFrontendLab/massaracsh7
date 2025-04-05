import { Heading, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import { TryDish, VeganDish } from '~/types/typesData';

import DishCard from '../DishCard/DishCard';
import TryDishCard from '../TryDishCard/TryDishCard';

interface KitchenSectionProps {
    title: string;
    description: string;
    veganDishes: VeganDish[];
    tryDishes: TryDish[];
}

const KitchenSection = ({ title, description, veganDishes, tryDishes }: KitchenSectionProps) => (
    <SimpleGrid columns={2} spacing={6} gap={6}>
        <Heading size='lg'>{title}</Heading>
        <Text fontWeight={500} fontSize='16px' lineHeight='24px' mt={8}>
            {description}
        </Text>
        <HStack spacing={2}>
            {veganDishes.map((dish, index) => (
                <DishCard key={index} {...dish} />
            ))}
        </HStack>
        <VStack spacing={2}>
            {tryDishes.map((item, index) => (
                <TryDishCard key={index} {...item} />
            ))}
        </VStack>
    </SimpleGrid>
);

export default KitchenSection;
