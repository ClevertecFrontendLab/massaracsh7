import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Badge,
    Button,
    Card,
    CardBody,
    Heading,
    Hide,
    HStack,
    Image,
    Text,
} from '@chakra-ui/react';

import { CardData } from '~/types/typesData';

const RecipeCard = ({ title, description, category, likes, comments, imageUrl }: CardData) => (
    <Card
        direction='row'
        borderRadius='medium'
        border='card'
        boxShadow='none'
        overflow='hidden'
        bg='white'
        h={{ base: '128px', lg: '244px', xl: '244px' }}
        position={{ base: 'static', sm: 'relative', md: 'relative', lg: 'static' }}
    >
        <Image
            src={imageUrl}
            alt={title}
            w='100%'
            h='100%'
            maxW={{ base: '158px', lg: '346px', xl: '346px' }}
            objectFit='cover'
        />
        <CardBody
            display='flex'
            flexDirection='column'
            px={{ sm: '2', md: '2', lg: '6', xl: '6' }}
            pt={{ sm: '2', md: '2', lg: '5', xl: '5' }}
            pb={{ sm: '1', md: '1', lg: '5', xl: '5' }}
        >
            <HStack
                spacing={3}
                alignItems='center'
                justify='space-between'
                mb={{ md: '0', lg: '7', xl: '7' }}
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
                <HStack>
                    <HStack>
                        <Image src='/icons/BsBookmarkHeart.svg' boxSize='12px' />{' '}
                        <Text textStyle='limeSmall'>{likes}</Text>
                    </HStack>
                    <HStack>
                        <Image src='/icons/BsEmojiHeartEyes.svg' boxSize='12px' />
                        <Text textStyle='limeSmall'>{comments}</Text>
                    </HStack>
                </HStack>
            </HStack>
            <Heading
                mb={2}
                sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    WebkitLineClamp: {
                        base: 1,
                        md: 2,
                        sm: 2,
                    },
                }}
                variant='cardTitle'
            >
                {title}
            </Heading>
            <Hide below='md'>
                <Text mb={{ lg: '12', xl: '7' }} noOfLines={3}>
                    {description}
                </Text>
            </Hide>
            <HStack justify='flex-end' gap={2} mt={{ sm: 'auto', md: 'auto', lg: 'auto', xl: '0' }}>
                <Button variant='whiteOutline' leftIcon={<ArrowForwardIcon />}>
                    <Hide below='md'>Сохранить</Hide>
                </Button>

                <Button variant='blackSolid'>Готовить</Button>
            </HStack>
        </CardBody>
    </Card>
);

export default RecipeCard;
