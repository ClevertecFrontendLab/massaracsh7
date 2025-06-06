import { Box, Button, Center, Heading, Hide, HStack, Show } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { ROUTES_PATH } from '~/app/routes';
import { ArrowBlackRight } from '~/assets/icons/icons';
import { useGetBloggersQuery } from '~/query/services/bloggers';

import { BlogList } from '../BlogList/BlogList';

type BlogSectionProps = {
    variant?: 'base' | 'full' | 'favorite';
};

export const BlogSection = ({ variant = 'base' }: BlogSectionProps) => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const shouldFetch = Boolean(userId);

    const { data } = useGetBloggersQuery(
        {
            currentUserId: userId!,
            limit: '3',
        },
        {
            skip: !shouldFetch,
        },
    );

    const handleNavigate = () => {
        navigate(ROUTES_PATH.BLOGS);
    };

    const headingTitle = variant === 'full' ? 'Другие блоги' : 'Кулинарные блоги';

    return (
        <Box
            as='section'
            bg='customLime.300'
            px={{ base: 3, md: 3, lg: 6, xl: 6 }}
            pt='20px'
            pb='24px'
            borderRadius='xlarge'
            mb={{ base: 8, md: 8, lg: 10, xl: 10 }}
        >
            <HStack justify='space-between' mb={{ base: 3, md: 2, lg: 4.5, xl: 6 }}>
                <Heading variant='sectionBlogTitle'>{headingTitle}</Heading>

                <Hide below='md'>
                    <Button
                        variant='limeLightSolid'
                        size='large'
                        rightIcon={<ArrowBlackRight w='14px' />}
                        onClick={handleNavigate}
                    >
                        Все авторы
                    </Button>
                </Hide>
            </HStack>

            {data?.others && <BlogList blogs={data.others} variant={variant} />}

            <Show below='md'>
                <Center mt={{ sm: 3 }}>
                    <Button
                        variant='limeLightSolid'
                        size='large'
                        rightIcon={<ArrowBlackRight w='14px' />}
                        onClick={handleNavigate}
                    >
                        Все авторы
                    </Button>
                </Center>
            </Show>
        </Box>
    );
};
