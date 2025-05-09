import { Badge, Card, CardBody, CardHeader, Heading, HStack, Image, Text } from '@chakra-ui/react';

import { BASE_IMG_URL } from '~/constants/constants';
import { useGetCategory } from '~/hooks/useGetCategory';
import { useGetSubcategory } from '~/hooks/useGetSubcategory';
import { Recipe } from '~/types/apiTypes';

import { LikesInfo } from '../LikesInfo/LikesInfo';

export const DishCard = ({ recipe }: { recipe: Recipe }) => {
    const category = useGetSubcategory(recipe.categoriesIds);
    const categoryUrl = useGetCategory(recipe.categoriesIds);
    return (
        <Card variant='basic'>
            <CardHeader
                pt={{ base: 3, md: 3, lg: 4, xl: 5 }}
                pb={{ base: 2, md: 2, lg: 2, xl: 2 }}
                px={{ base: 3, md: 3, lg: 4, xl: 6 }}
            >
                <Heading
                    variant='cardTitle'
                    textStyle='cutText'
                    sx={{
                        WebkitLineClamp: 1,
                    }}
                >
                    {recipe.title}
                </Heading>
            </CardHeader>
            <CardBody
                pt={0}
                pb={{ base: 3, md: 3, lg: 5, xl: 5 }}
                px={{ base: 3, md: 3, lg: 4, xl: 6 }}
            >
                <Text
                    mb={{ sm: '30px', md: '30px', lg: '30px', xl: '7' }}
                    color='text'
                    textStyle='cutText'
                    sx={{
                        WebkitLineClamp: 3,
                    }}
                >
                    {recipe.description}
                </Text>
                <HStack alignItems='center' justify='space-between'>
                    <Badge variant='lime50'>
                        <HStack gap={2} px={1}>
                            <Image
                                src={`${BASE_IMG_URL}${categoryUrl[0].icon}`}
                                alt={category[0]?.title ?? ''}
                                boxSize='16px'
                            />
                            <Text textTransform='none'>{category[0]?.title}</Text>
                        </HStack>
                    </Badge>
                    <LikesInfo likes={recipe.likes} bookmarks={recipe.bookmarks} />
                </HStack>
            </CardBody>
        </Card>
    );
};
