import { Badge, Flex } from '@chakra-ui/react';

import { Category } from '~/types/apiTypes';

import { CategoryBadge } from '../CategoryBadge/CategoryBadge';
type CategoryBadgesProps = {
    categories: Category[];
};

export const CategoryBadges = ({ categories }: CategoryBadgesProps) => (
    <Flex gap={2} align='center' wrap='wrap'>
        {[...new Set(categories)].map((item) => (
            <Badge key={item._id} variant='lime50'>
                <CategoryBadge categoryTitle={item.title} categoryIcon={item.icon} />
            </Badge>
        ))}
    </Flex>
);
