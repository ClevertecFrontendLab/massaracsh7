import { Avatar, Box, Button, Heading, HStack, Text, Tooltip, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { PersonPlus, PersonPlusWhite } from '~/assets/icons/icons';
import { useToggleSubscriptionMutation } from '~/query/services/bloggers';
import { BloggerByIdResponse } from '~/types/bloggerTypes';
import { handleBlogPageError } from '~/utils/handleBlogPageError';

import { LikesInfo } from '../LikesInfo/LikesInfo';

type AuthorCardProps = {
    author: BloggerByIdResponse;
};

export const AuthorCard = ({ author }: AuthorCardProps) => {
    const [toggleSubscription] = useToggleSubscriptionMutation();
    const currentUserId = localStorage.getItem('userId');
    const dispatch = useDispatch();

    const { bloggerInfo, isFavorite, totalSubscribers } = author;
    const { _id, login, firstName, lastName } = bloggerInfo;
    const imageUrl = undefined;

    const handleToggleSubscription = async () => {
        if (!currentUserId) return;
        try {
            await toggleSubscription({ fromUserId: currentUserId, toUserId: _id }).unwrap();
        } catch (err) {
            handleBlogPageError({ err, dispatch });
        }
    };

    return (
        <Box
            w={{ sm: '100%', md: '604px' }}
            p={{ sm: '3', md: '6', lg: '6', xl: '6' }}
            bg='customLime.300'
            borderRadius='xl'
            mx='auto'
        >
            <HStack spacing={{ sm: '1', md: '4', lg: '4', xl: '4' }} alignItems='stretch'>
                <Avatar
                    src={imageUrl}
                    name={`${firstName} ${lastName}`}
                    w={{ base: '32px', lg: '48px' }}
                    h={{ base: '32px', lg: '48px' }}
                />
                <Box w={{ sm: '150px' }} mr={{ sm: '-40px' }}>
                    <Heading variant='nameTitle' mb={1} pt={{ sm: '14px' }}>
                        {firstName} {lastName}
                    </Heading>
                    <Text mb={{ sm: '2', md: '4' }}>{login}</Text>
                    <HStack spacing={4}>
                        {isFavorite ? (
                            <Tooltip
                                label='Нажмите, если хотите отписаться'
                                aria-label='Tooltip для отписки'
                                data-test-id='blog-tooltip'
                                hasArrow
                                placement='bottom'
                            >
                                <Button
                                    size='sm'
                                    variant='outlineWhiteSmall'
                                    onClick={handleToggleSubscription}
                                    data-test-id='blog-toggle-unsubscribe'
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
                                data-test-id='blog-toggle-subscribe'
                                leftIcon={<PersonPlus />}
                            >
                                Подписаться
                            </Button>
                        )}
                    </HStack>
                </Box>
                <VStack
                    justify='space-between'
                    alignItems='flex-end'
                    ml={{ sm: '-20px', md: 'auto', lg: 'auto', xl: 'auto' }}
                >
                    <Text>Автор рецепта</Text>
                    <LikesInfo subscribers={totalSubscribers} size='limeSmall' />
                </VStack>
            </HStack>
        </Box>
    );
};
