import { TEST_IDS } from '~/constants/test-ids';

export const getTestId = (variant: 'base' | 'full' | 'fullProfile' | 'favorite') => {
    switch (variant) {
        case 'favorite':
            return TEST_IDS.BLOGS_FAVORITES_GRID;
        case 'full':
            return TEST_IDS.BLOGS_OTHERS_GRID;
        case 'fullProfile':
            return TEST_IDS.BLOGGER_USER_OTHER_BLOGS_GRID;
        case 'base':
        default:
            return TEST_IDS.MAIN_PAGE_BLOGS_GRID;
    }
};
