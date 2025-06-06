import { SimpleGrid } from '@chakra-ui/react';

import { Blogger } from '~/types/bloggerTypes';

import { BlogCard } from '../BlogCard/BlogCard';

type BlogListProps = {
    blogs: Blogger[];
    variant?: 'base' | 'full' | 'fullProfile' | 'favorite';
};

export const BlogList = ({ blogs, variant = 'base' }: BlogListProps) => {
    const getTestId = () => {
        switch (variant) {
            case 'favorite':
                return 'blogs-favorites-grid';
            case 'full':
                return 'blogs-others-grid';
            case 'fullProfile':
                return 'blogger-user-other-blogs-grid';
            case 'base':
            default:
                return 'main-page-blogs-grid';
        }
    };

    return (
        <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 3, md: 3, lg: 4, xl: 4 }}
            data-test-id={getTestId()}
        >
            {blogs.map((blog, index) => (
                <BlogCard key={index} blogger={blog} variant={variant} />
            ))}
        </SimpleGrid>
    );
};
