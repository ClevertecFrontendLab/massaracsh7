import { Avatar, Card, CardBody, HStack, Text, VStack } from '@chakra-ui/react';

import { BlogData } from '~/types/typesData';

const BlogCard = ({ name, handle, description, imageUrl }: BlogData) => (
    <Card p={4} borderRadius='md'>
        <CardBody>
            <HStack spacing={4}>
                <Avatar src={imageUrl} name={name} />
                <VStack align='start' spacing={1}>
                    <Text fontWeight='bold'>{name}</Text>
                    <Text fontSize='sm' color='gray.600'>
                        {handle}
                    </Text>
                    <Text fontSize='sm'>{description}</Text>
                </VStack>
            </HStack>
        </CardBody>
    </Card>
);

export default BlogCard;
