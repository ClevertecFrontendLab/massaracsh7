import {
    Avatar,
    Button,
    Card,
    CardBody,
    Heading,
    HStack,
    Stack,
    Text,
    Tooltip,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { PersonPlus, PersonPlusWhite } from '~/assets/icons/icons';
import { TEST_IDS } from '~/constants/test-ids';
import { useToggleSubscriptionMutation } from '~/query/services/bloggers';
import { BloggerByIdResponse } from '~/types/bloggerTypes';
import { handleBlogPageError } from '~/utils/handleBlogPageError';

import { CardLoader } from '../FullLoader/CardLoader';
import { LikesInfo } from '../LikesInfo/LikesInfo';

type BloggerCardProps = {
    blogger: BloggerByIdResponse;
};

export const BloggerCard = ({ blogger }: BloggerCardProps) => {
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
            handleBlogPageError({ err, dispatch });
        }
    };

    return (
        <Card
            variant='basic'
            position='relative'
            p={0}
            pt={{ sm: 4, md: 0 }}
            bg='white'
            w={{ sm: '100%', md: '604px' }}
            borderRadius='xl'
            border='cardTransparent'
            mx='auto'
            data-test-id={TEST_IDS.BLOGGER_USER_INFO_BOX}
        >
            {isLoading && <CardLoader />}
            <CardBody
                p={{ base: 'default', sm: 0, md: 'default' }}
                m={{ base: 'default', sm: 0, md: 'default' }}
            >
                <Stack
                    spacing={6}
                    direction={{ base: 'column', md: 'row' }}
                    alignItems={{ base: 'center', md: 'stretch' }}
                >
                    <Avatar
                        src={imageUrl}
                        name={`${firstName} ${lastName}`}
                        w={{ base: '96px', lg: '128px' }}
                        h={{ base: '96px', lg: '128px' }}
                    />
                    <VStack
                        flex={1}
                        alignItems={{ base: 'center', md: 'start' }}
                        justifyContent='space-between'
                        spacing='0'
                        py='6px'
                        w={{ sm: '100%', md: '408px', lg: '608px', xl: '608px' }}
                    >
                        <Heading variant='pageTitle' data-test-id={TEST_IDS.BLOGGER_USER_INFO_NAME}>
                            {firstName} {lastName}
                        </Heading>
                        <Text textStyle='miniText' data-test-id={TEST_IDS.BLOGGER_USER_INFO_LOGIN}>
                            @{login}
                        </Text>
                    </VStack>
                </Stack>

                <HStack mt={0} w={{ sm: '100%', md: 'auto' }} flex={1} spacing={4} align='flex-end'>
                    <HStack spacing={4}>
                        {isSubscribed ? (
                            <Tooltip
                                label='Нажмите, если хотите отписаться'
                                aria-label='Tooltip для отписки'
                                data-test-id={TEST_IDS.BLOG_TOOLTIP}
                                hasArrow
                                placement='bottom'
                            >
                                <Button
                                    size='sm'
                                    variant='outlineWhiteSmall'
                                    onClick={handleToggleSubscription}
                                    data-test-id={TEST_IDS.BLOG_TOGGLE_UNSUBSCRIBE}
                                    leftIcon={<PersonPlusWhite />}
                                >
                                    Вы подписаны
                                </Button>
                            </Tooltip>
                        ) : (
                            <Button
                                size='sm'
                                variant='darkWhiteSmall'
                                onClick={handleToggleSubscription}
                                data-test-id={TEST_IDS.BLOG_TOGGLE_SUBSCRIBE}
                                leftIcon={<PersonPlus />}
                            >
                                Подписаться
                            </Button>
                        )}
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
