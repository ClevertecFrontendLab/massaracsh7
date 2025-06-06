import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { Link as RouterLink, useLocation } from 'react-router';

import { TEST_IDS } from '~/constants/test-ids';
import { useGetBloggerByIdQuery } from '~/query/services/bloggers';
import { useGetRecipeByIdQuery } from '~/query/services/recipes';
import { selectCategoryBySlug, selectSubCategoryBySlug } from '~/store/category-slice';
import { useAppSelector } from '~/store/hooks';
import { getTitleBySlug } from '~/utils/getTitleByUrl';
import { parsePathname } from '~/utils/parsePathname';

export const Breadcrumbs = ({ onClose }: { onClose?: () => void }) => {
    const location = useLocation();
    const parsed = parsePathname(location.pathname);
    const currentUserId = localStorage.getItem('userId');

    const isBlog = 'bloggerId' in parsed;
    const bloggerId = isBlog ? parsed.bloggerId : null;
    console.log(parsed);
    const categorySlug = !isBlog ? parsed.categorySlug : null;
    const subcategorySlug = !isBlog ? parsed.subcategorySlug : null;
    const dishSlug = !isBlog ? parsed.dishSlug : null;

    const category = useAppSelector(selectCategoryBySlug(categorySlug ?? ''));
    const subcategory = useAppSelector(selectSubCategoryBySlug(subcategorySlug ?? ''));

    const catTitle = categorySlug && getTitleBySlug(categorySlug, category?.title ?? 'Категория');

    const { data: recipe } = useGetRecipeByIdQuery(dishSlug ?? skipToken);
    const { data: blogger } = useGetBloggerByIdQuery(
        !bloggerId || !currentUserId
            ? skipToken
            : { bloggerId: bloggerId, currentUserId: currentUserId },
    );

    return (
        <Breadcrumb
            separator={<ChevronRightIcon color='gray.800' />}
            pl={{ sm: '20px', md: '20px' }}
            pb={{ sm: '12px', md: '12px' }}
            listProps={{ style: { flexWrap: 'wrap' } }}
            data-test-id={TEST_IDS.BREADCRUMBS}
        >
            <BreadcrumbItem isCurrentPage={!categorySlug && !isBlog}>
                <BreadcrumbLink
                    as={RouterLink}
                    to='/'
                    textStyle={categorySlug || isBlog ? 'navInactive' : 'navActive'}
                    onClick={() => onClose?.()}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {isBlog && (
                <BreadcrumbItem isCurrentPage={!blogger}>
                    <BreadcrumbLink
                        as={RouterLink}
                        to='/blogs'
                        textStyle={bloggerId ? 'navInactive' : 'navActive'}
                        onClick={() => onClose?.()}
                    >
                        Блоги
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {isBlog && bloggerId && blogger && (
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink
                        as={RouterLink}
                        to={`/blogs/${bloggerId}`}
                        textStyle='navActive'
                        onClick={() => onClose?.()}
                    >
                        {blogger.bloggerInfo.firstName} {blogger.bloggerInfo.lastName} (@
                        {blogger.bloggerInfo.login})
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {!isBlog && catTitle && (
                <BreadcrumbItem isCurrentPage={!subcategory}>
                    <BreadcrumbLink
                        as={RouterLink}
                        to={`/${categorySlug}/${category?.subCategories?.[0]?.category ?? ''}`}
                        textStyle={subcategory ? 'navInactive' : 'navActive'}
                        onClick={() => onClose?.()}
                    >
                        {catTitle}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {!isBlog && subcategory && (
                <BreadcrumbItem isCurrentPage={!dishSlug}>
                    <BreadcrumbLink
                        as={RouterLink}
                        to={`/${categorySlug}/${subcategorySlug}`}
                        textStyle={dishSlug ? 'navInactive' : 'navActive'}
                        onClick={() => onClose?.()}
                    >
                        {subcategory.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {!isBlog && dishSlug && recipe && (
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink textStyle='navActive'>{recipe.title}</BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};
