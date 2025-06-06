import { Avatar, Button, Card, CardBody, HStack, Text, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { API_RESULTS } from '~/constants/api-results';
import { useToggleSubscriptionMutation } from '~/query/services/bloggers';
import { setAppAlert } from '~/store/app-slice';
import { BloggerByIdResponse } from '~/types/bloggerTypes';

import { LikesInfo } from '../LikesInfo/LikesInfo';

type BloggerCardProps = {
    blogger: BloggerByIdResponse;
};

export const BloggerCard = ({ blogger }: BloggerCardProps) => {
    const [toggleSubscription] = useToggleSubscriptionMutation();
    const currentUserId = localStorage.getItem('userId');
    const dispatch = useDispatch();
    const { bloggerInfo, isFavorite, totalBookmarks, totalSubscribers } = blogger;
    const { _id, login, firstName, lastName } = bloggerInfo;
    const imageUrl = undefined;
    const handleToggleSubscription = async () => {
        if (!currentUserId) {
            return;
        }
        try {
            await toggleSubscription({ fromUserId: currentUserId, toUserId: _id }).unwrap();
        } catch (err) {
            if (typeof err === 'object' && err !== null && 'status' in err) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: API_RESULTS.ERROR_SERVER_TITLE,
                        sourse: 'global',
                        message: API_RESULTS.ERROR_SERVER_MESSAGE,
                    }),
                );
            }
        }
    };
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
                <HStack mt={4}>
                    <HStack mt={3} spacing={4}>
                        <Button size='sm' variant='limeSolid' onClick={handleToggleSubscription}>
                            {isFavorite ? 'Вы подписаны' : 'Подписаться'}
                        </Button>
                    </HStack>
                    <LikesInfo
                        subscribers={totalSubscribers}
                        bookmarks={totalBookmarks}
                        size='limeSmall'
                    />
                </HStack>
            </CardBody>
        </Card>
    );
};
