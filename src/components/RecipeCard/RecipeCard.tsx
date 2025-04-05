import { Badge, Card, CardBody, Heading, HStack, Image, Text } from '@chakra-ui/react';

import { CardData } from '~/types/typesData';

const RecipeCard = ({ title, description, category, likes, comments, imageUrl }: CardData) => (
    <Card borderRadius='md' border='1px solid' borderColor='gray.200' overflow='hidden' bg='white'>
        <Image src={imageUrl} alt={title} w='100%' h='150px' objectFit='cover' />
        <CardBody>
            <Heading size='md' mb={2}>
                {title}
            </Heading>
            <Text fontSize='sm' mb={2}>
                {description}
            </Text>
            <HStack spacing={3}>
                <Badge
                    fontSize='md'
                    lineHeight='middle'
                    fontWeight='400'
                    background='customLime.150'
                    mb={2}
                >
                    {category}
                </Badge>
                <HStack fontSize='xs' color='customLime.600'>
                    <Image src='/icons/BsBookmarkHeart.svg' boxSize='12px' /> <Text>{likes}</Text>
                </HStack>
                <HStack fontSize='xs' color='customLime.600'>
                    <Image src='/icons/BsEmojiHeartEyes.svg' boxSize='12px' />{' '}
                    <Text>{comments}</Text>
                </HStack>
            </HStack>
        </CardBody>
    </Card>
);

export default RecipeCard;
