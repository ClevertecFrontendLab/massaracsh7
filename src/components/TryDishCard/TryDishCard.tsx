import { Button, Card, Heading, HStack, Image } from '@chakra-ui/react';

import { BASE_IMG_URL } from '~/constants/constants';
import { useGetCategory } from '~/hooks/useGetCategory';
import { useGetSubcategory } from '~/hooks/useGetSubcategory';
import { Recipe } from '~/types/apiTypes';

interface TryDishProps {
    recipe: Recipe;
}

export const TryDishCard = ({ recipe }: TryDishProps) => {
    const category = useGetSubcategory(recipe.categoriesIds);
    const categoryUrl = useGetCategory(recipe.categoriesIds);
    return (
        <Card
            w='100%'
            pt={2}
            pl={{ sm: 3, md: 1.5, lg: 3.5, xl: 8 }}
            pb={{ sm: 2, md: 2, lg: 2, xl: 3 }}
            pr={{ sm: 3, md: 1.5, lg: 2, xl: 6 }}
            border='card'
            borderRadius='medium'
            boxShadow='none'
        >
            <HStack justify='space-between' align='center' lineHeight='28px'>
                <HStack>
                    <Image
                        src={`${BASE_IMG_URL}${categoryUrl[0].icon}`}
                        alt={category[0]?.title ?? ''}
                        boxSize='24px'
                    />
                    <Heading
                        variant='sliderTitle'
                        textStyle='cutText'
                        sx={{
                            WebkitLineClamp: {
                                md: 1,
                                sm: 1,
                            },
                        }}
                    >
                        {recipe.title}
                    </Heading>
                </HStack>
                <Button variant='limeOutline'>Готовить</Button>
            </HStack>
        </Card>
    );
};
