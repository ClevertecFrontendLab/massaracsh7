import { Avatar, Card, CardBody, HStack, Text, VStack } from '@chakra-ui/react';

import { BlogData } from '~/types/typesData';

const BlogCard = ({ name, username, description, imageUrl }: BlogData) => (
    <Card border='card' borderRadius='medium' boxShadow='none'>
        <CardBody p={6} pr={5}>
            <HStack spacing={3} mb={6}>
                <Avatar src={imageUrl} name={name} />
                <VStack align='start' spacing={1} pt='2px'>
                    <Text fontSize='18px' fontWeight='500' lineHeight='28px'>
                        {name}
                    </Text>
                    <Text fontSize='sm' color='secondaryText' lineHeight='20px'>
                        {username}
                    </Text>
                </VStack>
            </HStack>
            <Text lineHeight='20px'>{description}</Text>
        </CardBody>
    </Card>
);

export default BlogCard;
