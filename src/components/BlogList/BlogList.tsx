import { Box, Heading, Link, SimpleGrid } from '@chakra-ui/react';

import { blogs } from '~/data/cardsData';

import BlogCard from '../BlogCard/BlogCard';

const BlogList = () => (
    <Box as='section' bg='customLime.300' p={6} borderRadius='md'>
        <Heading size='lg'>Кулинарные блоги</Heading>
        <Link>Все авторы</Link>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            {blogs.map((blog, index) => (
                <BlogCard key={index} {...blog} />
            ))}
        </SimpleGrid>
    </Box>
);

export default BlogList;
