import {
    Badge,
    Card,
    CardBody,
    Heading,
    HStack,
    Image,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';

import { CardSliderData } from '~/types/typesData';

const SliderCard = ({
    title,
    description,
    category,
    likes,
    comments,
    imageUrl,
}: CardSliderData) => {
    const showDescription = useBreakpointValue({
        base: false,
        sm: false,
        md: false,
        lg: true,
        xl: true,
        '2xl': true,
    });

    return (
        <Card borderRadius='medium' border='card' boxShadow='none' overflow='hidden' bg='white'>
            <Image src={imageUrl} alt={title} w='100%' h='230px' objectFit='cover' />
            <CardBody px={6} py={4} boxShadow='none'>
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
                {showDescription ? (
                    <Text mb={7} noOfLines={3}>
                        {description}
                    </Text>
                ) : (
                    ''
                )}
                <HStack spacing={3} justify='space-between' align='center'>
                    <Badge background='customLime.150' color='text' borderRadius='mini'>
                        <HStack gap={2} px={1}>
                            <Image src={category.icon} alt={category.title} boxSize='16px' />
                            <Text
                                fontSize='14px'
                                lineHeight='middle'
                                fontWeight='400'
                                color='text'
                                textTransform='none'
                            >
                                {category.title}
                            </Text>
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
};

export default SliderCard;
