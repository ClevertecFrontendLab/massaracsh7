import { SimpleGrid } from '@chakra-ui/react';

import { BLOG_VARIANTS, BlogVariant } from '~/constants/blogVariants';
import { Blogger } from '~/types/bloggerTypes';
import { getTestId } from '~/utils/chooseIds';

import { BlogCard } from '../BlogCard/BlogCard';

type BlogListProps = {
    blogs: Blogger[];
    variant?: BlogVariant;
};

export const BlogList = ({ blogs, variant = BLOG_VARIANTS.BASE }: BlogListProps) => {
    let columns;

    if (variant === BLOG_VARIANTS.FAVORITE) {
        columns = { base: 1, md: 2 };
    } else if (variant === BLOG_VARIANTS.FULL) {
        columns = { base: 1, sm: 1, md: 2, lg: 2, xl: 3 };
    } else {
        columns = { base: 1, md: 3 };
    }

    return (
        <SimpleGrid columns={columns} columnGap={4} rowGap={6} data-test-id={getTestId(variant)}>
            {blogs.map((blog, index) => (
                <BlogCard key={index} blogger={blog} variant={variant} />
            ))}
        </SimpleGrid>
    );
};
