import { HStack, Image, Text } from '@chakra-ui/react';
import { FC } from 'react';

import categories from '~/data/categories';

interface CategoryBadgeProps {
    categoryUrl: string;
}

const CategoryBadge: FC<CategoryBadgeProps> = ({ categoryUrl }) => {
    const matchedCategory = categories.find((cat) => cat.url === categoryUrl);

    if (!matchedCategory) return null;

    return (
        <HStack gap={{ base: 0.5, md: 0.5, lg: 2 }} px={{ sm: 1, md: 1, lg: 2, xl: 2 }}>
            <Image src={matchedCategory.icon} alt={matchedCategory.title} boxSize='16px' />
            <Text textTransform='none'>{matchedCategory.title}</Text>
        </HStack>
    );
};

export default CategoryBadge;
