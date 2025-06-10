import { Box, Button, Center, Heading, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { ArrowBlackRight } from '~/assets/icons/icons';
import { BlogList } from '~/components/BlogList/BlogList';
import { CustomLoader } from '~/components/CustomLoader/CustomLoader';
import { SliderList } from '~/components/SliderList/SliderList';
import { BASE_LIMIT_SLIDER } from '~/constants/constants';
import { TEST_IDS } from '~/constants/test-ids';
import { useGetBloggersQuery } from '~/query/services/bloggers';
import { useGetRecipesQuery } from '~/query/services/recipes';
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

    const { data: sliderRecipes } = useGetRecipesQuery({
        sortBy: 'createdAt',
        sortOrder: 'desc',
        limit: BASE_LIMIT_SLIDER,
    });

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
    }, [isError, navigate, dispatch]);

    if (isLoading) {
        return <CustomLoader size='large' dataTestId='app-loader' />;
    }

    const favorites = data?.favorites ?? [];
    const others = data?.others ?? [];
    return (
        <Box>
            <Heading variant='sectionTitle' mb={8}>
                Кулинарные блоги
            </Heading>

            {favorites.length > 0 && (
                <Box
                    p={6}
                    pb={5}
                    mb={10}
                    borderRadius='16px'
                    mx='auto'
                    bg='customLime.300'
                    data-test-id={TEST_IDS.BLOGS_FAVORITES_BOX}
                >
                    <Heading variant='sectionBlogTitle' mb={4}>
                        Избранные блоги
                    </Heading>
                    <BlogList blogs={favorites} variant='favorite' />
                </Box>
            )}

            <Box
                data-test-id={TEST_IDS.BLOGS_OTHERS_BOX}
                bg='grayBg'
                p={6}
                pb={5}
                mb={10}
                borderRadius='16px'
                mx='auto'
            >
                <BlogList blogs={others} variant='full' />

                <Center mt={6}>
                    <Button
                        variant='ghost'
                        size='middle'
                        mx='auto'
                        onClick={() => setIsExpanded((prev) => !prev)}
                        rightIcon={!isExpanded ? <ArrowBlackRight w='14px' /> : undefined}
                        leftIcon={
                            isExpanded ? (
                                <ArrowBlackRight w='14px' transform='rotate(180deg)' />
                            ) : undefined
                        }
                        data-test-id={TEST_IDS.BLOGS_OTHERS_BUTTON}
                    >
                        {isExpanded ? 'Свернуть' : 'Все авторы'}
                    </Button>
                </Center>
            </Box>
            <Box>{sliderRecipes?.data && <SliderList recipes={sliderRecipes?.data} />}</Box>
        </Box>
    );
};
