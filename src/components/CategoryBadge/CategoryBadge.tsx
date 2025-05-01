import { HStack, Image, Text } from '@chakra-ui/react';

import { BASE_IMG_URL } from '~/constants';

interface CategoryBadgeProps {
    categoryTitle: string;
    categoryIcon: string;
}

const CategoryBadge = ({ categoryTitle, categoryIcon }: CategoryBadgeProps) => (
    <HStack gap={{ base: 0.5, md: 0.5, lg: 2 }} px={{ sm: 1, md: 1, lg: 2, xl: 2 }}>
        <Image src={`${BASE_IMG_URL}${categoryIcon}`} alt={categoryTitle} boxSize='16px' />
        <Text textTransform='none'>{categoryTitle}</Text>
    </HStack>
);

export default CategoryBadge;
