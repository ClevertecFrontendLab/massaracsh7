export const BLOG_VARIANTS = {
    BASE: 'base',
    FULL: 'full',
    FULL_PROFILE: 'fullProfile',
    FAVORITE: 'favorite',
} as const;

export type BlogVariant =
    | typeof BLOG_VARIANTS.BASE
    | typeof BLOG_VARIANTS.FULL
    | typeof BLOG_VARIANTS.FULL_PROFILE
    | typeof BLOG_VARIANTS.FAVORITE;

export const isLargeCardVariant = (variant: BlogVariant): boolean =>
    variant === BLOG_VARIANTS.FULL ||
    variant === BLOG_VARIANTS.FULL_PROFILE ||
    variant === BLOG_VARIANTS.FAVORITE;
