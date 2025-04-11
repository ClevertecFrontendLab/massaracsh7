import { Badge, Card, CardBody, Heading, Hide, HStack, Image, Text } from '@chakra-ui/react';

import { CardSliderData } from '~/types/typesData';

import LikesInfo from '../LikesInfo/LikesInfo';

const SliderCard = ({
    title,
    description,
    category,
    likes,
    comments,
    imageUrl,
}: CardSliderData) => (
    <Card
        variant='basic'
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
            pr={{ sm: '2', md: '2', lg: '3', xl: '6' }}
            pb={{ sm: '2', md: '2', lg: '3', xl: '4' }}
            pt={{ sm: '2', md: '2', lg: '3', xl: '4' }}
            pl={{ sm: '2', md: '2', lg: '3', xl: '6' }}
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
                <Text mb='30px' noOfLines={3}>
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
                    <HStack
                        gap={{ base: '0.5', md: '0.5', lg: '2' }}
                        px={{ sm: 1, md: 1, lg: 2, xl: 2 }}
                    >
                        <Image src={category.icon} alt={category.title} boxSize='16px' />
                        <Text textTransform='none'>{category.title}</Text>
                    </HStack>
                </Badge>
                <LikesInfo likes={likes} comments={comments} />
            </HStack>
        </CardBody>
    </Card>
);

export default SliderCard;
