import { Avatar, Button, Card, CardBody, HStack, Text, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { ROUTES_PATH } from '~/app/routes';
import { API_RESULTS } from '~/constants/api-results';
import { useToggleSubscriptionMutation } from '~/query/services/bloggers';
import { setAppAlert } from '~/store/app-slice';
import { Blogger } from '~/types/bloggerTypes';
import { getRecipeCountLabel } from '~/utils/getRecipeCountLabel';

import { CardLoader } from '../FullLoader/CardLoader';
import { LikesInfo } from '../LikesInfo/LikesInfo';

type BlogCardProps = {
    blogger: Blogger;
    variant?: 'base' | 'full' | 'fullProfile' | 'favorite';
};

export const BlogCard = ({ blogger, variant = 'base' }: BlogCardProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        _id,
        login,
        firstName,
        lastName,
        notes,
        subscribersCount,
        bookmarksCount,
        newRecipesCount,
    } = blogger;
    const currentUserId = localStorage.getItem('userId');
    const [toggleSubscription, { isLoading }] = useToggleSubscriptionMutation();

    const handleToggleSubscription = async () => {
        if (!currentUserId) return;
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

    const handleMoveToNotes = () => {
        navigate(`${ROUTES_PATH.BLOGS}/${_id}#notes`);
    };

    const handleMoveToBlog = () => {
        navigate(`${ROUTES_PATH.BLOGS}/${_id}`);
    };

    const imageUrl = undefined;

    // if (isLoading) {
    //     return <CardLoader />;
    // }

    return (
        <Card variant='basic' data-test-id='blogs-card'>
            {isLoading && <CardLoader />}
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
                            data-test-id='blogs-card-name'
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
                        <Text textStyle='miniText' data-test-id='blogs-card-login'>
                            @{login}
                        </Text>
                    </VStack>
                </HStack>

                {notes?.[0]?.text && (
                    <Text
                        textStyle='cutText'
                        data-test-id='blogs-card-notes-text'
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

                {(variant === 'full' || variant === 'fullProfile') && (
                    <HStack mt={4}>
                        <HStack mt={3} spacing={4}>
                            <Button
                                data-test-id='blog-toggle-subscribe'
                                size='sm'
                                variant='limeSolid'
                                onClick={handleToggleSubscription}
                            >
                                Подписаться
                            </Button>
                            <Button
                                size='sm'
                                variant='ghost'
                                onClick={handleMoveToNotes}
                                data-test-id='blogs-card-notes-button'
                            >
                                Читать
                            </Button>
                        </HStack>
                        <LikesInfo
                            subscribers={subscribersCount}
                            bookmarks={bookmarksCount}
                            size='limeSmall'
                        />
                    </HStack>
                )}

                {variant === 'favorite' && (
                    <>
                        <HStack mt={4}>
                            <HStack mt={3} spacing={4}>
                                <Button
                                    size='sm'
                                    variant='limeSolid'
                                    data-test-id='blogs-card-recipes-button'
                                    onClick={handleMoveToBlog}
                                >
                                    Рецепты
                                </Button>
                                <Button
                                    size='sm'
                                    variant='ghost'
                                    onClick={handleMoveToNotes}
                                    data-test-id='blogs-card-notes-button'
                                >
                                    Читать
                                </Button>
                            </HStack>
                            <LikesInfo
                                subscribers={subscribersCount}
                                bookmarks={bookmarksCount}
                                size='limeSmall'
                            />
                        </HStack>
                        {newRecipesCount > 0 && (
                            <Text
                                textStyle='miniText'
                                mb={1}
                                data-test-id='blogs-card-new-recipes-badge'
                            >
                                {getRecipeCountLabel(newRecipesCount)}
                            </Text>
                        )}
                    </>
                )}
            </CardBody>
        </Card>
    );
};
