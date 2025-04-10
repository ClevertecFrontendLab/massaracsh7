import { Box, Button, Center, Heading, Hide, HStack, Show, SimpleGrid } from '@chakra-ui/react';

import { ArrowBlackRight } from '~/assets/icons/icons';
import { blogs } from '~/data/cardsData';

import BlogCard from '../BlogCard/BlogCard';

const BlogList = () => (
    <Box
        as='section'
        bg='customLime.300'
        p={{ base: '3', md: '6', lg: '6', xl: '6' }}
        borderRadius='16px'
        mb={{ base: '8', md: '8', lg: '10', xl: '10' }}
    >
        <HStack justify='space-between' mb={{ base: '12px', md: '12px', lg: '18px', xl: '6' }}>
            <Heading variant='sectionBlogTitle'>Кулинарные блоги</Heading>
            <Hide below='md'>
                <Button variant='limeLightSolid' size='large' rightIcon={<ArrowBlackRight />}>
                    Все авторы
                </Button>
            </Hide>
        </HStack>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: '3', md: '3', lg: '4', xl: '4' }}>
            {blogs.map((blog, index) => (
                <BlogCard key={index} {...blog} />
            ))}
        </SimpleGrid>
        <Show below='md'>
            <Center mt={{ sm: '3' }}>
                <Button variant='limeLightSolid' size='large' rightIcon={<ArrowBlackRight />}>
                    Все авторы
                </Button>
            </Center>
        </Show>
    </Box>
);

export default BlogList;
