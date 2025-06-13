import { BLOG_VARIANTS, BlogVariant } from '~/constants/blogVariants';
import { TEST_IDS } from '~/constants/test-ids';

export const getTestId = (variant: BlogVariant) => {
    switch (variant) {
        case BLOG_VARIANTS.FAVORITE:
            return TEST_IDS.BLOGS_FAVORITES_GRID;
        case BLOG_VARIANTS.FULL:
            return TEST_IDS.BLOGS_OTHERS_GRID;
        case BLOG_VARIANTS.FULL_PROFILE:
            return TEST_IDS.BLOGGER_USER_OTHER_BLOGS_GRID;
        case BLOG_VARIANTS.BASE:
        default:
            return TEST_IDS.MAIN_PAGE_BLOGS_GRID;
    }
};
