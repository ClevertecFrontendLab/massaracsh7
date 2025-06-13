export const BREADCRUMBS_STYLES = {
    ACTIVE: 'navActive',
    INACTIVE: 'navInactive',
} as const;

export const BREADCRUMBS_PATHS = {
    ROOT: '/',
    BLOGS: '/blogs',
    BLOGGER: (bloggerId: string) => `/blogs/${bloggerId}`,
    CATEGORY: (categorySlug: string, subcategorySlug: string) =>
        `/${categorySlug}/${subcategorySlug}`,
    CATEGORY_FIRST_SUBCATEGORY: (categorySlug: string, firstSubCategory: string) =>
        `/${categorySlug}/${firstSubCategory}`,
};
