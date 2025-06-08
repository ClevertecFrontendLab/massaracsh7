import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    HStack,
    Text,
    Tooltip,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// import { API_RESULTS } from '~/constants/api-results';
import { useToggleSubscriptionMutation } from '~/query/services/bloggers';
import { setAppAlert } from '~/store/app-slice';
import { BloggerByIdResponse } from '~/types/bloggerTypes';

import { CardLoader } from '../FullLoader/CardLoader';
import { LikesInfo } from '../LikesInfo/LikesInfo';

type BloggerCardProps = {
    blogger: BloggerByIdResponse;
    variantCard?: 'blog' | 'recipe';
};

export const BloggerCard = ({ blogger, variantCard = 'blog' }: BloggerCardProps) => {
    const [toggleSubscription, { isLoading }] = useToggleSubscriptionMutation();
    const currentUserId = localStorage.getItem('userId');
    const dispatch = useDispatch();

    const { bloggerInfo, isFavorite, totalBookmarks, totalSubscribers } = blogger;
    const { _id, login, firstName, lastName } = bloggerInfo;
    const imageUrl = undefined;

    const [isSubscribed, setIsSubscribed] = useState(isFavorite);

    useEffect(() => {
        setIsSubscribed(isFavorite);
    }, [isFavorite]);

    const handleToggleSubscription = async () => {
        if (!currentUserId) return;

        setIsSubscribed((prev) => !prev);

        try {
            await toggleSubscription({ fromUserId: currentUserId, toUserId: _id }).unwrap();
        } catch (err) {
            setIsSubscribed((prev) => !prev);

            if (typeof err === 'object' && err !== null && 'status' in err) {
                dispatch(
                    setAppAlert({
                        type: 'error',
                        title: 'Ошибка сервера',
                        message: 'Попробуйте немного позже.',
                        sourse: 'global',
                    }),
                );
            }
        }
    };

    return (
        <Card
            variant='basic'
            position='relative'
            p={{ sm: '3', md: '6', lg: '6', xl: '6' }}
            bg={variantCard === 'recipe' ? 'customLime.300' : 'white'}
            w={{ sm: '100%', md: '604px' }}
            borderRadius='xl'
            mx='auto'
            data-test-id='blogger-user-info-box'
        >
            {isLoading && <CardLoader />}
            {variantCard === 'recipe' && (
                <Box position='absolute' top='2' right='3'>
                    <Text fontSize='xs' fontWeight='semibold' color='gray.500'>
                        Автор рецепта
                    </Text>
                </Box>
            )}
            <CardBody>
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
                            data-test-id='blogger-user-info-name'
                        >
                            {firstName} {lastName}
                        </Text>
                        <Text textStyle='miniText' data-test-id='blogger-user-info-login'>
                            @{login}
                        </Text>
                    </VStack>
                </HStack>

                <HStack mt={4}>
                    <HStack mt={3} spacing={4}>
                        {isSubscribed ? (
                            <Tooltip
                                label='Нажмите, если хотите отписаться'
                                aria-label='Tooltip для отписки'
                                data-test-id='blog-tooltip'
                                hasArrow
                                placement='bottom'
                            >
                                <Button
                                    size='sm'
                                    variant='limeSolid'
                                    onClick={handleToggleSubscription}
                                    data-test-id='blog-toggle-unsubscribe'
                                >
                                    Вы подписаны
                                </Button>
                            </Tooltip>
                        ) : (
                            <Button
                                size='sm'
                                variant='limeSolid'
                                onClick={handleToggleSubscription}
                                data-test-id='blog-toggle-subscribe'
                            >
                                Подписаться
                            </Button>
                        )}
                    </HStack>

                    <LikesInfo
                        subscribers={totalSubscribers}
                        bookmarks={variantCard === 'blog' ? totalBookmarks : undefined}
                        size='limeSmall'
                    />
                </HStack>
            </CardBody>
        </Card>
    );
};
