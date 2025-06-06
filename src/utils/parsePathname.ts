export const parsePathname = (pathname: string) => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const isBlog = pathSegments[0] === 'blogs';

    if (isBlog) {
        return {
            bloggerId: pathSegments[1] || null,
        };
    }

    return {
        categorySlug: pathSegments[0] || null,
        subcategorySlug: pathSegments[1] || null,
        dishSlug: pathSegments[2] || null,
    };
};
