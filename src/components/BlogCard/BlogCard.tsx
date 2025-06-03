import { Avatar, Card, CardBody, HStack, Text, VStack } from '@chakra-ui/react';

import { Blogger } from '~/types/bloggerTypes';

export const BlogCard = ({ login, firstName, lastName, notes }: Blogger) => {
    const imageUrl = undefined;
    return (
        <Card variant='basic'>
            <CardBody
                p={{ base: '4', md: '4', lg: '4', xl: '6' }}
                pr={{ base: '4', md: '4', lg: '4', xl: '5' }}
            >
                <HStack
                    spacing={{ base: 2, md: 2, lg: 3, xl: 3 }}
                    mb={{ sm: 4, md: 4, lg: 4, xl: 7 }}
                >
                    <Avatar
                        src={imageUrl}
                        name={`${firstName} ${lastName}`}
                        w={{ base: '32px', md: '32px', lg: '48px', xl: '48px' }}
                        h={{ base: '32px', md: '32px', lg: '48px', xl: '48px' }}
                    />
                    <VStack align='start' spacing={{ lg: '0', xl: '0' }} pt='2px'>
                        <Text
                            textStyle='nameText'
                            sx={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                WebkitLineClamp: 1,
                                wordBreak: 'break-all',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {firstName} {lastName}
                        </Text>
                        <Text textStyle='miniText'>@{login}</Text>
                    </VStack>
                </HStack>
                {notes?.[0]?.text && (
                    <Text
                        textStyle='cutText'
                        sx={{
                            WebkitLineClamp: {
                                sm: 3,
                                md: 3,
                                lg: 3,
                            },
                        }}
                    >
                        {notes[0].text}
                    </Text>
                )}
            </CardBody>
        </Card>
    );
};
