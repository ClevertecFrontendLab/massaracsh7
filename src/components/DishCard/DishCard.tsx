import { Badge, Card, CardBody, CardHeader, Heading, HStack, Image, Text } from '@chakra-ui/react';

import { KitchenDish } from '~/types/typesData';

const DishCard = ({ title, category, likes, comments, description }: KitchenDish) => (
    <Card border='card' borderRadius='medium' boxShadow='none'>
        <CardHeader
            pt={{ base: '3', md: '3', lg: '4', xl: '6' }}
            pl={{ base: '3', md: '3', lg: '4', xl: '6' }}
            pb={{ base: '2', md: '2', lg: '2', xl: '2' }}
            pr={{ md: '3', lg: '1', xl: '6' }}
        >
            <Heading variant='cardTitle' noOfLines={1}>
                {title}
            </Heading>
        </CardHeader>
        <CardBody
            pt={0}
            pl={{ base: '3', md: '3', lg: '4', xl: '6' }}
            pb={{ base: '3', md: '3', lg: '5', xl: '5' }}
            pr={{ base: '3', md: '3', lg: '4', xl: '6' }}
        >
            <Text noOfLines={3} mb={{ sm: '30px', md: '30px', lg: '30px', xl: '7' }} color='text'>
                {description}
            </Text>
            <HStack alignItems='center' justify='space-between'>
                <Badge variant='lime50'>
                    <HStack gap={2} px={1}>
                        <Image src={category.icon} alt={category.title} boxSize='16px' />
                        <Text textTransform='none'>{category.title}</Text>
                    </HStack>
                </Badge>
                <HStack>
                    <HStack fontSize='xs' color='customLime.600'>
                        <Image src='/icons/BsBookmarkHeart.svg' boxSize='12px' />{' '}
                        <Text>{likes}</Text>
                    </HStack>
                    <HStack fontSize='xs' color='customLime.600'>
                        <Image src='/icons/BsEmojiHeartEyes.svg' boxSize='12px' />{' '}
                        <Text>{comments}</Text>
                    </HStack>
                </HStack>
            </HStack>
        </CardBody>
    </Card>
);

export default DishCard;
