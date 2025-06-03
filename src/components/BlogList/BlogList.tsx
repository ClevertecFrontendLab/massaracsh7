import { SimpleGrid } from '@chakra-ui/react';

import { Blogger } from '~/types/bloggerTypes';

import { BlogCard } from '../BlogCard/BlogCard';

interface BlogListProps {
    blogs: Blogger[];
}

export const BlogList = ({ blogs }: BlogListProps) => (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 3, md: 3, lg: 4, xl: 4 }}>
        {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
        ))}
    </SimpleGrid>
);
