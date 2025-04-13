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
} from '@chakra-ui/react';

import { BookmarkHeart } from '~/assets/icons/icons';
import { CardData } from '~/types/typesData';

import LikesInfo from '../LikesInfo/LikesInfo';
interface RecipeCardProps {
    recipe: CardData;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
    const { title, description, category, likes, comments, imageUrl, recomended } = recipe;
    return (
        <Card
            direction='row'
            variant='basic'
            h={{ base: '128px', lg: '244px', xl: '244px' }}
            position='relative'
        >
            <Image
                src={imageUrl}
                alt={title}
                w='100%'
                h='100%'
                maxW={{ base: '158px', mid: '346px', lg: '346px', xl: '346px' }}
                objectFit='cover'
                loading='lazy'
            />
            <Hide below='mid'>
                {recomended && (
                    <Badge variant='lime150' position='absolute' bottom={5} left={6} py={1} px={2}>
                        <HStack spacing={{ base: '0.5', md: '0.5', lg: '1', xl: '1' }} px={1}>
                            <Image
                                src={recomended?.imageUrl}
                                alt={recomended?.name}
                                boxSize='16px'
                            />
                            <Text textTransform='none'>{recomended?.name} рекомендует</Text>
                        </HStack>
                    </Badge>
                )}
            </Hide>
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
                    justify='space-between'
                    mb={{ md: '1', lg: '7', xl: '7' }}
                >
                    <Badge
                        variant='lime50'
                        position={{ base: 'static', sm: 'absolute', md: 'absolute', lg: 'static' }}
                        top={{ sm: '8px', md: '8px' }}
                        left={{ sm: '8px', md: '8px' }}
                        p={{ sm: '0', md: '0' }}
                    >
                        <HStack gap={{ base: '0.5', md: '0.5', lg: '2' }} px={1}>
                            <Image src={category.icon} alt={category.title} boxSize='16px' />
                            <Text textTransform='none'>{category.title}</Text>
                        </HStack>
                    </Badge>
                    <Box px={1}>
                        <LikesInfo likes={likes} comments={comments} />
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
                    {title}
                </Heading>
                <Hide below='mid'>
                    <Text
                        mb={{ lg: '12', xl: '7' }}
                        textStyle='cutText'
                        sx={{
                            WebkitLineClamp: { base: 2, mid: 3, lg: 3, xl: 3 },
                        }}
                    >
                        {description}
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
                    <Button variant='blackSolid'>Готовить</Button>
                </HStack>
            </CardBody>
        </Card>
    );
};

export default RecipeCard;
