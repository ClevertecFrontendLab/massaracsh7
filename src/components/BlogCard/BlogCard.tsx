import { Avatar, Card, CardBody, HStack, Text, VStack } from '@chakra-ui/react';

import { BlogData } from '~/types/typesData';

const BlogCard = ({ name, username, description, imageUrl }: BlogData) => (
    <Card border='card' borderRadius='medium' boxShadow='none'>
        <CardBody
            p={{ base: '4', md: '4', lg: '4', xl: '6' }}
            pr={{ base: '4', md: '4', lg: '4', xl: '5' }}
        >
            <HStack spacing={{ md: '2', lg: '3', xl: '3' }} mb={{ md: '2', lg: '4', xl: '6' }}>
                <Avatar src={imageUrl} name={name} w={{ md: '32px' }} h={{ md: '32px' }} />
                <VStack align='start' spacing={{ lg: '0', xl: '1' }} pt='2px'>
                    <Text
                        textStyle='nameText'
                        sx={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            WebkitLineClamp: {
                                md: 1,
                            },
                        }}
                    >
                        {name}
                    </Text>
                    <Text color='secondaryText' textStyle='miniText'>
                        {username}
                    </Text>
                </VStack>
            </HStack>
            <Text
                sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    WebkitLineClamp: {
                        md: 3,
                        lg: 3,
                    },
                }}
            >
                {description}
            </Text>
        </CardBody>
    </Card>
);

export default BlogCard;
