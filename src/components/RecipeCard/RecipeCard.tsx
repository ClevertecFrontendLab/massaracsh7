import {
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    Heading,
    Hide,
    HStack,
    IconButton,
    Image,
    Show,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { BookmarkHeart } from '~/assets/icons/icons';
import { ApplicationState } from '~/store/configure-store';
import { Recipe } from '~/types/typeRecipe';
import { highlightText } from '~/utils/highlightText';

import CategoryBadge from '../CategoryBadge/CategoryBadge';
import LikesInfo from '../LikesInfo/LikesInfo';
interface RecipeCardProps {
    recipe: Recipe;
    index: number;
}

const RecipeCard = ({ recipe, index }: RecipeCardProps) => {
    const searchTerm = useSelector((state: ApplicationState) => state.filters.searchTerm);
    const navigate = useNavigate();
    return (
        <Card
            direction='row'
            variant='basic'
            h={{ base: '128px', lg: '244px', xl: '244px' }}
            position='relative'
            data-test-id={`food-card-${index}`}
        >
            <Image
                src={recipe.image}
                alt={recipe.title}
                w='100%'
                h='100%'
                maxW={{ base: '158px', mid: '346px', lg: '346px', xl: '346px' }}
                objectFit='cover'
                loading='lazy'
            />
            <CardBody
                display='flex'
                flexDirection='column'
                px={{ sm: '2', md: '2', lg: '6', xl: '6' }}
                pt={{ sm: '3.5', md: '2', lg: '5', xl: '5' }}
                pb={{ sm: '1', md: '1', lg: '5', xl: '5' }}
            >
                <HStack
                    spacing={3}
                    alignItems='center'
                    justify='right'
                    mb={{ md: '1', lg: '7', xl: '7' }}
                >
                    <VStack
                        position={{
                            base: 'static',
                            sm: 'absolute',
                            md: 'absolute',
                            lg: 'absolute',
                            xl: 'absolute',
                        }}
                        top={{ sm: '8px', md: '8px', lg: '16px', xl: '16px' }}
                        left={{ sm: '8px', md: '8px' }}
                        align='flex-start'
                    >
                        {[...new Set(recipe.category)].map((catUrl, index) => (
                            <Badge key={catUrl + index} variant='lime50' p={{ sm: '0', md: '0' }}>
                                <CategoryBadge categoryUrl={catUrl} />
                            </Badge>
                        ))}
                    </VStack>
                    <Box px={1}>
                        <LikesInfo likes={recipe.likes} comments={recipe.bookmarks} />
                    </Box>
                </HStack>
                <Heading
                    pb={2}
                    textStyle='cutText'
                    sx={{
                        WebkitLineClamp: {
                            base: 1,
                            md: 2,
                            sm: 2,
                            lg: 1,
                            xl: 1,
                        },
                    }}
                    variant='cardTitle'
                >
                    {/* {recipe.title} */}
                    {highlightText(recipe.title, searchTerm)}
                </Heading>
                <Hide below='mid'>
                    <Text
                        mb={{ lg: '12', xl: '7' }}
                        textStyle='cutText'
                        sx={{
                            WebkitLineClamp: { base: 2, mid: 3, lg: 3, xl: 3 },
                        }}
                    >
                        {recipe.description}
                    </Text>
                </Hide>
                <HStack
                    justify='flex-end'
                    gap={2}
                    mt={{ sm: 'auto', md: 'auto', lg: 'auto', xl: '0' }}
                >
                    <Hide below='md'>
                        <Button variant='whiteOutline' leftIcon={<BookmarkHeart />}>
                            Сохранить
                        </Button>
                    </Hide>
                    <Show below='md'>
                        <IconButton
                            aria-label='Сохранить'
                            icon={<BookmarkHeart />}
                            variant='outline'
                            boxSize='24px'
                            minWidth='0'
                            p={0}
                            colorScheme='black'
                            fontSize='12px'
                        />
                    </Show>
                    <Button
                        variant='blackSolid'
                        data-test-id={`card-link-${index}`}
                        onClick={() =>
                            navigate(`/${recipe.category[0]}/${recipe.subcategory[0]}/${recipe.id}`)
                        }
                    >
                        Готовить
                    </Button>
                </HStack>
            </CardBody>
        </Card>
    );
};

export default RecipeCard;
