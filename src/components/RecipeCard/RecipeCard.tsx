import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Badge, Button, Card, CardBody, Heading, HStack, Image, Text } from '@chakra-ui/react';

import { CardData } from '~/types/typesData';

const RecipeCard = ({ title, description, category, likes, comments, imageUrl }: CardData) => (
    <Card
        direction='row'
        borderRadius='medium'
        border='card'
        boxShadow='none'
        overflow='hidden'
        bg='white'
        h='244px'
    >
        <Image src={imageUrl} alt={title} w='100%' h='100%' maxW='346px' objectFit='cover' />

        <CardBody px={6} py={5}>
            <HStack spacing={3} alignItems='center' justify='space-between' mb='7'>
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
                <HStack fontSize='xs' color='customLime.600'>
                    <Image src='/icons/BsBookmarkHeart.svg' boxSize='12px' /> <Text>{likes}</Text>
                </HStack>
                <HStack fontSize='xs' color='customLime.600'>
                    <Image src='/icons/BsEmojiHeartEyes.svg' boxSize='12px' />{' '}
                    <Text>{comments}</Text>
                </HStack>
            </HStack>
            <Heading mb={2} noOfLines={1} fontWeight={500} fontSize='20px' lineHeight='28px'>
                {title}
            </Heading>
            <Text fontSize='14px' lineHeight='20px' mb={7} noOfLines={3}>
                {description}
            </Text>
            <HStack justify='flex-end' gap={2}>
                <Button
                    size='sm'
                    variant='outline'
                    background='white'
                    fontWeight='600'
                    lineHeight='20px'
                    fontSize='14px'
                    leftIcon={<ArrowForwardIcon />}
                >
                    Сохранить
                </Button>
                <Button
                    size='sm'
                    background='text'
                    color='white'
                    fontWeight='600'
                    lineHeight='20px'
                    fontSize='14px'
                >
                    Готовить
                </Button>
            </HStack>
        </CardBody>
    </Card>
);

export default RecipeCard;
