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

    const gridProps =
        variant === 'fullProfile'
            ? {
                  templateColumns: {
                      base: '1fr',
                      md: 'repeat(3, 1fr)',
                  },
              }
            : {
                  columns:
                      variant === 'favorite'
                          ? { base: 1, md: 2 }
                          : { base: 1, sm: 1, md: 2, lg: 2, xl: 3 },
              };

    return (
        <SimpleGrid {...gridProps} columnGap={4} rowGap={6} data-test-id={getTestId()}>
            {blogs.map((blog, index) => (
                <BlogCard key={index} blogger={blog} variant={variant} />
            ))}
        </SimpleGrid>
    );
};
