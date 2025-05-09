export const parsePathname = (pathname: string) => {
    const pathSegments = pathname.split('/').filter(Boolean);
    return {
        categorySlug: pathSegments[0] || null,
        subcategorySlug: pathSegments[1] || null,
        dishSlug: pathSegments[2] || null,
    };
};
