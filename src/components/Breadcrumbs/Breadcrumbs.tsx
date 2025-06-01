import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { Link as RouterLink, useLocation } from 'react-router';

import { TEST_IDS } from '~/constants/test-ids';
import { useGetRecipeByIdQuery } from '~/query/services/recipes';
import { selectCategoryBySlug, selectSubCategoryBySlug } from '~/store/category-slice';
import { useAppSelector } from '~/store/hooks';
import { getTitleBySlug } from '~/utils/getTitleByUrl';
import { parsePathname } from '~/utils/parsePathname';

export const Breadcrumbs = ({ onClose }: { onClose?: () => void }) => {
    const location = useLocation();
    const { categorySlug, subcategorySlug, dishSlug } = parsePathname(location.pathname);

    const category = useAppSelector(selectCategoryBySlug(categorySlug ?? ''));
    const subcategory = useAppSelector(selectSubCategoryBySlug(subcategorySlug ?? ''));

    const catTitle = categorySlug && getTitleBySlug(categorySlug);
    const { data: recipe } = useGetRecipeByIdQuery(dishSlug ?? skipToken);

    return (
        <Breadcrumb
            separator={<ChevronRightIcon color='gray.800' />}
            pl={{ sm: '20px', md: '20px' }}
            pb={{ sm: '12px', md: '12px' }}
            listProps={{ style: { flexWrap: 'wrap' } }}
            data-test-id={TEST_IDS.BREADCRUMBS}
        >
            <BreadcrumbItem isCurrentPage={!catTitle}>
                <BreadcrumbLink
                    as={RouterLink}
                    to='/'
                    textStyle={catTitle ? 'navInactive' : 'navActive'}
                    onClick={() => onClose?.()}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {catTitle && (
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

            {subcategory && (
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

            {dishSlug && recipe && (
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink textStyle='navActive'>{recipe.title}</BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};
