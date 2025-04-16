import { Badge, Card, CardBody, Heading, Hide, HStack, Image, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import { Recipe } from '~/types/typeRecipe';

import CategoryBadge from '../CategoryBadge/CategoryBadge';
import LikesInfo from '../LikesInfo/LikesInfo';

interface SliderCardProps {
    recipe: Recipe;
}

const SliderCard = ({ recipe }: SliderCardProps) => (
    <Link
        as={RouterLink}
        to={`/${recipe.category[0]}/${recipe.subcategory[0]}/${recipe.id}`}
        _hover={{ textDecoration: 'none' }}
    >
        <Card
            variant='basic'
            position={{ base: 'static', sm: 'relative', md: 'relative', lg: 'static' }}
        >
            <Image
                src={recipe.image}
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
                        WebkitLineClamp: { base: 2, md: 2, lg: 1 },
                    }}
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
                    >
                        {recipe.description}
                    </Text>
                </Hide>
                <HStack spacing={3} justify='space-between' align='center'>
                    {recipe.category.map((catUrl) => (
                        <Badge
                            variant='lime150'
                            position={{
                                base: 'static',
                                sm: 'absolute',
                                md: 'absolute',
                                lg: 'static',
                            }}
                            top={{ sm: 2, md: 2 }}
                            left={{ sm: 2, md: 2 }}
                            p={{ sm: '0', md: '0' }}
                        >
                            <CategoryBadge key={catUrl} categoryUrl={catUrl} />
                        </Badge>
                    ))}
                    <LikesInfo likes={recipe.likes} comments={recipe.bookmarks} />
                </HStack>
            </CardBody>
        </Card>
    </Link>
);

export default SliderCard;
