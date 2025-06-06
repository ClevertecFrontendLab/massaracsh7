import { Box, Button, Center, Heading, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { ArrowBlackRight } from '~/assets/icons/icons';
import { BlogList } from '~/components/BlogList/BlogList';
import { CustomLoader } from '~/components/CustomLoader/CustomLoader';
import { useGetBloggersQuery } from '~/query/services/bloggers';

export const BlogsPage = () => {
    const userId = localStorage.getItem('userId');
    const shouldFetch = Boolean(userId);
    const navigate = useNavigate();

    const defaultLimit = useBreakpointValue({ base: 8, xl: 9 }) ?? 8;
    const [isExpanded, setIsExpanded] = useState(false);

    const limit = isExpanded ? 'all' : String(defaultLimit);

    const { data, isLoading, isError } = useGetBloggersQuery(
        {
            currentUserId: userId!,
            limit,
        },
        {
            skip: !shouldFetch,
        },
    );

    const { data: favoriteData, isLoading: isFavoriteLoading } = useGetBloggersQuery(
        {
            currentUserId: userId!,
            limit: 'all',
        },
        {
            skip: !shouldFetch,
        },
    );

    useEffect(() => {
        if (isError) {
            navigate('/');
        }
    }, [isError, navigate]);

    if (isLoading || isFavoriteLoading) {
        return <CustomLoader size='large' dataTestId='app-loader' />;
    }

    return (
        <Box>
            <Heading variant='sectionTitle' mb={8}>
                Кулинарные блоги
            </Heading>

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
                {favoriteData?.favorites && (
                    <BlogList blogs={favoriteData?.favorites} variant='favorite' />
                )}
            </Box>

            <Box data-test-id='blogs-others-box'>
                {data?.others && <BlogList blogs={data?.others} variant='full' />}

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
