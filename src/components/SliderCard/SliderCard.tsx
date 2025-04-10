import { Badge, Card, CardBody, Heading, Hide, HStack, Image, Text } from '@chakra-ui/react';

import { CardSliderData } from '~/types/typesData';

const SliderCard = ({
    title,
    description,
    category,
    likes,
    comments,
    imageUrl,
}: CardSliderData) => (
    <Card
        borderRadius='medium'
        border='card'
        boxShadow='none'
        overflow='hidden'
        bg='white'
        position={{ base: 'static', sm: 'relative', md: 'relative', lg: 'static' }}
    >
        <Image
            src={imageUrl}
            alt={title}
            w='100%'
            h={{ sm: '128px', md: '128px', lg: '230px', xl: '230px' }}
            objectFit='cover'
        />
        <CardBody
            display='flex'
            flexDirection='column'
            px={{ sm: '2', md: '2', lg: '6', xl: '6' }}
            py={{ sm: '2', md: '2', lg: '4', xl: '4' }}
        >
            <Heading
                variant='sliderTitle'
                mb={2}
                sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    lineClamp: { base: 2, md: 2, lg: 1 },
                    WebkitLineClamp: { base: 2, md: 2, lg: 1 },
                }}
            >
                {title}
            </Heading>
            <Hide below='md'>
                <Text mb={7} noOfLines={3}>
                    {description}
                </Text>
            </Hide>
            <HStack spacing={3} justify='space-between' align='center'>
                <Badge
                    variant='lime150'
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
                <HStack gap={2}>
                    <HStack fontSize='xs' color='customLime.600'>
                        <Image src='/icons/BsBookmarkHeart.svg' boxSize='12px' />{' '}
                        <Text>{likes}</Text>
                    </HStack>
                    <HStack fontSize='xs' color='customLime.600'>
                        <Image src='/icons/BsEmojiHeartEyes.svg' boxSize='12px' />
                        <Text>{comments}</Text>
                    </HStack>
                </HStack>
            </HStack>
        </CardBody>
    </Card>
);

export default SliderCard;
