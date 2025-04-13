import { Badge, Card, CardBody, CardHeader, Heading, HStack, Image, Text } from '@chakra-ui/react';

import { KitchenDish } from '~/types/typesData';

import LikesInfo from '../LikesInfo/LikesInfo';

const DishCard = ({ title, category, likes, comments, description }: KitchenDish) => (
    <Card variant='basic'>
        <CardHeader
            pt={{ base: 3, md: 3, lg: 4, xl: 5 }}
            pb={{ base: 2, md: 2, lg: 2, xl: 2 }}
            px={{ base: 3, md: 3, lg: 4, xl: 6 }}
        >
            <Heading
                variant='cardTitle'
                textStyle='cutText'
                sx={{
                    WebkitLineClamp: 1,
                }}
            >
                {title}
            </Heading>
        </CardHeader>
        <CardBody
            pt={0}
            pb={{ base: 3, md: 3, lg: 5, xl: 5 }}
            px={{ base: 3, md: 3, lg: 4, xl: 6 }}
        >
            <Text
                mb={{ sm: '30px', md: '30px', lg: '30px', xl: '7' }}
                color='text'
                textStyle='cutText'
                sx={{
                    WebkitLineClamp: 3,
                }}
            >
                {description}
            </Text>
            <HStack alignItems='center' justify='space-between'>
                <Badge variant='lime50'>
                    <HStack gap={2} px={1}>
                        <Image src={category.icon} alt={category.title} boxSize='16px' />
                        <Text textTransform='none'>{category.title}</Text>
                    </HStack>
                </Badge>
                <LikesInfo likes={likes} comments={comments} />
            </HStack>
        </CardBody>
    </Card>
);

export default DishCard;
