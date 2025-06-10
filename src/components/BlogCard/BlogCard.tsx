import {
    Avatar,
    Badge,
    Button,
    Card,
    CardBody,
    HStack,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { ROUTES_PATH } from '~/app/routes';
import { PersonPlus } from '~/assets/icons/icons';
import { API_RESULTS } from '~/constants/api-results';
import { TEST_IDS } from '~/constants/test-ids';
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

    return (
        <Card
            variant='basic'
            data-test-id={TEST_IDS.BLOGS_CARD}
            h={
                ['full', 'fullProfile', 'favorite'].includes(variant)
                    ? { base: '208px', lg: '224px', xl: '244px' }
                    : 'auto'
            }
        >
            {isLoading && <CardLoader />}
            <CardBody
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                p={4}
                pt={variant === 'favorite' ? '24px' : '16px'}
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
                            data-test-id={TEST_IDS.BLOGS_CARD_NAME}
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
                        <Text textStyle='miniText' data-test-id={TEST_IDS.BLOGS_CARD_LOGIN}>
                            @{login}
                        </Text>
                    </VStack>
                </HStack>

                {notes?.[0]?.text && (
                    <Text
                        textStyle='cutText'
                        data-test-id={TEST_IDS.BLOGS_CARD_NOTES_TEXT}
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

                {variant === 'full' && (
                    <HStack mt='auto' pt={4} alignItems='center'>
                        <HStack spacing={4}>
                            <Button
                                data-test-id={TEST_IDS.BLOG_TOGGLE_SUBSCRIBE}
                                variant='darkWhiteSmall'
                                onClick={handleToggleSubscription}
                                leftIcon={<PersonPlus />}
                            >
                                Подписаться
                            </Button>
                            <Button
                                variant='limeOutlineSmall'
                                onClick={handleMoveToNotes}
                                data-test-id={TEST_IDS.BLOGS_CARD_NOTES_BUTTON}
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

                {variant === 'fullProfile' && (
                    <Stack
                        mt='auto'
                        pt={4}
                        alignItems={{
                            sm: 'flex-end',
                            md: 'flex-end',
                            lg: 'flex-end',
                            xl: 'center',
                        }}
                        flexDirection={{
                            sm: 'column-reverse',
                            md: 'column-reverse',
                            lg: 'column-reverse',
                            xl: 'row',
                        }}
                    >
                        <HStack spacing={4}>
                            <Button
                                data-test-id={TEST_IDS.BLOG_TOGGLE_SUBSCRIBE}
                                variant='darkWhiteSmall'
                                onClick={handleToggleSubscription}
                                leftIcon={<PersonPlus />}
                            >
                                Подписаться
                            </Button>
                            <Button
                                variant='limeOutlineSmall'
                                onClick={handleMoveToNotes}
                                data-test-id={TEST_IDS.BLOGS_CARD_NOTES_BUTTON}
                            >
                                Читать
                            </Button>
                        </HStack>
                        <LikesInfo
                            subscribers={subscribersCount}
                            bookmarks={bookmarksCount}
                            size='limeSmall'
                        />
                    </Stack>
                )}

                {variant === 'favorite' && (
                    <>
                        <HStack mt={4}>
                            <HStack mt={3} spacing={4}>
                                <Button
                                    size='sm'
                                    variant='limeSolid'
                                    data-test-id={TEST_IDS.BLOGS_CARD_RECIPES_BUTTON}
                                    onClick={handleMoveToBlog}
                                >
                                    Рецепты
                                </Button>
                                <Button
                                    size='sm'
                                    variant='limeOutlineSmall'
                                    onClick={handleMoveToNotes}
                                    data-test-id={TEST_IDS.BLOGS_CARD_NOTES_BUTTON}
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
                            <Badge variant='gray06' position='absolute' top='2' right='3'>
                                <Text
                                    textTransform='lowercase'
                                    data-test-id={TEST_IDS.BLOGS_CARD_NEW_RECIPES_BADGE}
                                >
                                    {getRecipeCountLabel(newRecipesCount)}
                                </Text>
                            </Badge>
                        )}
                    </>
                )}
            </CardBody>
        </Card>
    );
};
