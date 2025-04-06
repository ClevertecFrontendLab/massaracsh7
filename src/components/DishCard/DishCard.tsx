import { Badge, Card, CardBody, CardHeader, HStack, Image, Text } from '@chakra-ui/react';

import { KitchenDish } from '~/types/typesData';

const DishCard = ({ title, category, likes, comments, description }: KitchenDish) => (
    <Card border='card' borderRadius='medium' boxShadow='none'>
        <CardHeader p='24px' pb='8px'>
            <Text noOfLines={1} fontWeight={500} fontSize='20px' lineHeight='28px'>
                {title}
            </Text>
        </CardHeader>
        <CardBody p='0px 24px 20px 24px'>
            <Text noOfLines={3} mb={7} lineHeight='20px'>
                {description}
            </Text>
            <HStack alignItems='center' justify='space-between'>
                <Badge background='customLime.50' color='text' borderRadius='mini'>
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
