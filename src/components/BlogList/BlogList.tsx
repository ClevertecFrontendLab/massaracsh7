import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Heading, HStack, Link, SimpleGrid } from '@chakra-ui/react';

import { blogs } from '~/data/cardsData';

import BlogCard from '../BlogCard/BlogCard';

const BlogList = () => (
    <Box as='section' bg='customLime.300' p={6} borderRadius='16px'>
        <HStack justify='space-between' mb={6}>
            <Heading size='lg' fontWeight='400' fontSize='36px'>
                Кулинарные блоги
            </Heading>
            <Link
                display='inline-flex'
                alignItems='center'
                fontWeight='600'
                fontSize='18px'
                lineHeight='28px'
                _hover={{ textDecoration: 'none', color: 'customLime.600' }}
            >
                Все авторы <ArrowForwardIcon ml={2} />
            </Link>{' '}
        </HStack>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            {blogs.map((blog, index) => (
                <BlogCard key={index} {...blog} />
            ))}
        </SimpleGrid>
    </Box>
);

export default BlogList;
