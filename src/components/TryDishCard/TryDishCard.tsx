import { Button, Card, Heading, HStack } from '@chakra-ui/react';

import { Recipe } from '~/types/apiTypes';

interface TryDishProps {
    recipe: Recipe;
}

const TryDishCard = ({ recipe }: TryDishProps) => (
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
                {/* <Image src={icon} boxSize='24px' /> */}
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

export default TryDishCard;
