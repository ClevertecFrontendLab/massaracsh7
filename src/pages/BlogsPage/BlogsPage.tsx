import { Box, Button, Center, Heading, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { ArrowBlackRight } from '~/assets/icons/icons';
import { BlogList } from '~/components/BlogList/BlogList';
import { CustomLoader } from '~/components/CustomLoader/CustomLoader';
import { useGetBloggersQuery } from '~/query/services/bloggers';
import { setAppAlert, setAppLoader } from '~/store/app-slice';

export const BlogsPage = () => {
    const userId = localStorage.getItem('userId');
    const shouldFetch = Boolean(userId);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const defaultLimit = useBreakpointValue({ base: 8, xl: 9 }) ?? 8;
    const [isExpanded, setIsExpanded] = useState(false);
    const limitResult = isExpanded ? 'all' : String(defaultLimit);
    const { data, isLoading, isError } = useGetBloggersQuery(
        {
            currentUserId: userId!,
            limit: limitResult,
        },
        {
            skip: !shouldFetch,
        },
    );

    useEffect(() => {
        if (isError) {
            dispatch(
                setAppAlert({
                    type: 'error',
                    title: 'Ошибка сервера',
                    message: 'Попробуйте немного позже.',
                    sourse: 'global',
                }),
            );
            dispatch(setAppLoader(false));
            navigate('/');
        }
    }, [isError, navigate]);

    if (isLoading) {
        return <CustomLoader size='large' dataTestId='app-loader' />;
    }

    console.log(data);

    const favorites = data?.favorites ?? [];
    const others = data?.others ?? [];
    return (
        <Box>
            <Heading variant='sectionTitle' mb={8}>
                Кулинарные блоги
            </Heading>

            {favorites && (
                <Box
                    pb={8}
                    mb={6}
                    borderRadius='8px'
                    mx='auto'
                    px={{ base: '16px', lg: '30px', xl: '190px' }}
                    bg='customLime.300'
                    data-test-id='blogs-favorites-box'
                >
                    <Heading variant='sectionBlogTitle'>Избранные блоги</Heading>
                    <BlogList blogs={favorites} variant='favorite' />
                </Box>
            )}

            <Box data-test-id='blogs-others-box'>
                <BlogList blogs={others} variant='full' />

                <Center mb={{ sm: '8', md: '8', lg: '9', xl: '9' }}>
                    <Button
                        variant='limeSolid'
                        size='large'
                        mb={8}
                        mx='auto'
                        onClick={() => setIsExpanded((prev) => !prev)}
                        rightIcon={!isExpanded ? <ArrowBlackRight w='14px' /> : undefined}
                        leftIcon={
                            isExpanded ? (
                                <ArrowBlackRight w='14px' transform='rotate(180deg)' />
                            ) : undefined
                        }
                        data-test-id='blogs-others-button'
                    >
                        {isExpanded ? 'Свернуть' : 'Все авторы'}
                    </Button>
                </Center>
            </Box>
        </Box>
    );
};
