import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { Link as RouterLink, useLocation } from 'react-router';

import { BREADCRUMBS_PATHS, BREADCRUMBS_STYLES } from '~/constants/breadcrumbs';
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

    const BREADCRUMBS_COMMON = {
        as: RouterLink,
        onClick: () => onClose?.(),
    };

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
                    {...BREADCRUMBS_COMMON}
                    to={BREADCRUMBS_PATHS.ROOT}
                    textStyle={
                        categorySlug || isBlog
                            ? BREADCRUMBS_STYLES.INACTIVE
                            : BREADCRUMBS_STYLES.ACTIVE
                    }
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {isBlog && (
                <BreadcrumbItem isCurrentPage={!blogger}>
                    <BreadcrumbLink
                        {...BREADCRUMBS_COMMON}
                        to={BREADCRUMBS_PATHS.BLOGS}
                        textStyle={
                            bloggerId ? BREADCRUMBS_STYLES.INACTIVE : BREADCRUMBS_STYLES.ACTIVE
                        }
                        data-test-id={TEST_IDS.BLOGGER_USER_BREADCRUMB_NAME}
                    >
                        Блоги
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {isBlog && bloggerId && blogger && (
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink
                        {...BREADCRUMBS_COMMON}
                        to={BREADCRUMBS_PATHS.BLOGGER(bloggerId!)}
                        textStyle={BREADCRUMBS_STYLES.ACTIVE}
                        data-test-id={TEST_IDS.BLOGGER_USER_BREADCRUMB_SECTION}
                    >
                        {blogger.bloggerInfo.firstName} {blogger.bloggerInfo.lastName} (@
                        {blogger.bloggerInfo.login})
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {!isBlog && catTitle && (
                <BreadcrumbItem isCurrentPage={!subcategory}>
                    <BreadcrumbLink
                        {...BREADCRUMBS_COMMON}
                        to={BREADCRUMBS_PATHS.CATEGORY_FIRST_SUBCATEGORY(
                            categorySlug!,
                            category?.subCategories?.[0]?.category ?? '',
                        )}
                        textStyle={
                            subcategory ? BREADCRUMBS_STYLES.INACTIVE : BREADCRUMBS_STYLES.ACTIVE
                        }
                    >
                        {catTitle}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {!isBlog && subcategory && (
                <BreadcrumbItem isCurrentPage={!dishSlug}>
                    <BreadcrumbLink
                        {...BREADCRUMBS_COMMON}
                        to={BREADCRUMBS_PATHS.CATEGORY(categorySlug!, subcategorySlug!)}
                        textStyle={
                            dishSlug ? BREADCRUMBS_STYLES.INACTIVE : BREADCRUMBS_STYLES.ACTIVE
                        }
                    >
                        {subcategory.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {!isBlog && dishSlug && recipe && (
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink textStyle={BREADCRUMBS_STYLES.ACTIVE}>
                        {recipe.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};
