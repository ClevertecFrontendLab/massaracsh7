import {
    Badge,
    Card,
    CardBody,
    Heading,
    Hide,
    HStack,
    Image,
    Link,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import { BASE_IMG_URL } from '~/constants/constants';
import { useGetCategory } from '~/hooks/useGetCategory';
import { useGetSubcategory } from '~/hooks/useGetSubcategory';
import { Recipe } from '~/types/apiTypes';

import { CategoryBadge } from '../CategoryBadge/CategoryBadge';
import { LikesInfo } from '../LikesInfo/LikesInfo';

interface SliderCardProps {
    recipe: Recipe;
}

export const SliderCard = ({ recipe }: SliderCardProps) => {
    const rootCategories = useGetCategory(recipe.categoriesIds);
    const subCategories = useGetSubcategory(recipe.categoriesIds);

    return (
        <Link
            as={RouterLink}
            to={
                rootCategories?.[0]?.category && subCategories?.[0]?.category && recipe?._id
                    ? `/${rootCategories[0].category}/${subCategories[0].category}/${recipe._id}`
                    : '#'
            }
            _hover={{ textDecoration: 'none' }}
        >
            <Card
                variant='basic'
                position={{
                    base: 'static',
                    sm: 'relative',
                    md: 'relative',
                    lg: 'static',
                    xl: 'static',
                }}
            >
                <Image
                    src={`${BASE_IMG_URL}${recipe.image}`}
                    alt={recipe.title}
                    w='100%'
                    h={{ sm: '128px', md: '128px', lg: '230px', xl: '230px' }}
                    objectFit='cover'
                    loading='lazy'
                />
                <CardBody
                    display='flex'
                    flexDirection='column'
                    py={{ sm: 2, md: 2, lg: 3, xl: 4 }}
                    px={{ sm: 2, md: 2, lg: 3, xl: 6 }}
                >
                    <Heading
                        variant='sliderTitle'
                        mb={2}
                        textStyle='cutText'
                        sx={{
                            WebkitLineClamp: { base: 1, sm: 2, md: 2, lg: 1, xl: 1 },
                        }}
                        minH={{ base: '28px', sm: '48px', md: '48px', lg: '28px', xl: '28px' }}
                    >
                        {recipe.title}
                    </Heading>
                    <Hide below='md'>
                        <Text
                            mb='30px'
                            textStyle='cutText'
                            sx={{
                                WebkitLineClamp: { base: 2, mid: 3, lg: 3, xl: 3 },
                            }}
                            minH='64px'
                        >
                            {recipe.description}
                        </Text>
                    </Hide>
                    <HStack spacing={3} justify='space-between' align='center'>
                        <VStack
                            position='absolute'
                            align='flex-start'
                            top={{ base: 2, md: 2, lg: 'auto' }}
                            bottom={{ base: 'auto', lg: 4, xl: 4 }}
                            left={{ sm: 2, md: 2, lg: 5, xl: 5 }}
                        >
                            {[...new Set(rootCategories)].map((item, index) => (
                                <Badge
                                    key={item._id + index}
                                    variant='lime150'
                                    p={{ sm: '0', md: '0' }}
                                    maxW='100%'
                                >
                                    <CategoryBadge
                                        categoryTitle={item.title}
                                        categoryIcon={item.icon}
                                    />
                                </Badge>
                            ))}
                        </VStack>
                        <LikesInfo likes={recipe.likes} bookmarks={recipe.bookmarks} />
                    </HStack>
                </CardBody>
            </Card>
        </Link>
    );
};
