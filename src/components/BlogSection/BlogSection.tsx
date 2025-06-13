import { Box, Button, Center, Heading, Hide, HStack, Show } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { ROUTES_PATH } from '~/app/routes';
import { ArrowBlackRight } from '~/assets/icons/icons';
import { BLOG_VARIANTS, BlogVariant } from '~/constants/blogVariants';
import { TEST_IDS } from '~/constants/test-ids';
import { useGetBloggersQuery } from '~/query/services/bloggers';
import { handlePageError } from '~/utils/handlePageError';

import { BlogList } from '../BlogList/BlogList';

type BlogSectionProps = {
    variant?: BlogVariant;
};

export const BlogSection = ({ variant = BLOG_VARIANTS.BASE }: BlogSectionProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = localStorage.getItem('userId');

    const shouldFetch = Boolean(userId);

    const {
        data,
        isError,
        error: err,
    } = useGetBloggersQuery(
        {
            currentUserId: userId!,
            limit: '',
        },
        {
            skip: !shouldFetch,
        },
    );

    const handleNavigate = () => {
        navigate(ROUTES_PATH.BLOGS);
    };

    useEffect(() => {
        if (isError && variant === BLOG_VARIANTS.FULL_PROFILE) {
            handlePageError({ err, dispatch });
            navigate('/');
        }
        if (isError) {
            handlePageError({ err, dispatch });
        }
    }, [isError, navigate, variant, dispatch, err]);

    if (isError && variant === BLOG_VARIANTS.BASE) return null;

    const headingTitle =
        variant === BLOG_VARIANTS.FULL_PROFILE ? 'Другие блоги' : 'Кулинарные блоги';
    const dataTitle =
        variant === BLOG_VARIANTS.FULL_PROFILE
            ? TEST_IDS.BLOGGER_USER_OTHER_BLOGS_BUTTON
            : TEST_IDS.MAIN_PAGE_BLOGS_BUTTON;

    const dataUpdate = data?.others.slice(0, 3);
    const bgColor = variant === BLOG_VARIANTS.FULL_PROFILE ? 'transparent' : 'customLime.300';
    return (
        <Box
            as='section'
            bg={bgColor}
            px={{ base: 3, md: 3, lg: 6, xl: 6 }}
            pt='20px'
            pb='24px'
            borderRadius='xlarge'
            mb={{ base: 8, md: 8, lg: 10, xl: 10 }}
            data-test-id={variant === BLOG_VARIANTS.BASE ? TEST_IDS.MAIN_PAGE_BLOGS_BOX : ''}
        >
            <HStack justify='space-between' mb={{ base: 3, md: 2, lg: 4.5, xl: 6 }}>
                <Heading variant='sectionBlogTitle'>{headingTitle}</Heading>

                {variant === BLOG_VARIANTS.FULL_PROFILE ? (
                    <Button
                        variant='ghost'
                        size='large'
                        rightIcon={<ArrowBlackRight w='14px' />}
                        onClick={handleNavigate}
                        data-test-id={dataTitle}
                    >
                        Всe авторы
                    </Button>
                ) : (
                    <Hide below='md'>
                        <Button
                            variant='limeLightSolid'
                            size='large'
                            rightIcon={<ArrowBlackRight w='14px' />}
                            onClick={handleNavigate}
                            data-test-id={dataTitle}
                        >
                            Все авторы
                        </Button>
                    </Hide>
                )}
            </HStack>

            {dataUpdate && <BlogList blogs={dataUpdate} variant={variant} />}

            {variant !== BLOG_VARIANTS.FULL_PROFILE && (
                <Show below='md'>
                    <Center mt={{ sm: 3 }}>
                        <Button
                            variant='limeLightSolid'
                            size='large'
                            rightIcon={<ArrowBlackRight w='14px' />}
                            onClick={handleNavigate}
                            data-test-id={dataTitle}
                        >
                            Все авторы
                        </Button>
                    </Center>
                </Show>
            )}
        </Box>
    );
};
