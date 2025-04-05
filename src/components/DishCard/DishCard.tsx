import { Badge, Card, CardBody, CardHeader, HStack, Image, Text } from '@chakra-ui/react';

import { VeganDish } from '~/types/typesData';

const DishCard = ({ title, category, likes, comments, description }: VeganDish) => (
    <Card p={6}>
        <CardHeader p={0} pb={1} noOfLines={1} fontWeight={500} fontSize='20px'>
            {title}
        </CardHeader>
        <CardBody p={0}>
            <Text noOfLines={3} pb={6}>
                {description}
            </Text>
            <HStack spacing={2} justify='space-between'>
                <Badge fontSize='md' background='customLime.50'>
                    {category}
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
