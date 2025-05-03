import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { Link as RouterLink, useLocation } from 'react-router';

import { useGetRecipeByIdQuery } from '~/query/services/recipes';
import { ApplicationState } from '~/store/configure-store';
import { useAppSelector } from '~/store/hooks';

interface BreadcrumbsProps {
    onClose?: () => void;
}

const Breadcrumbs = ({ onClose }: BreadcrumbsProps) => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);

    const categorySlug = pathSegments[0];
    const subcategorySlug = pathSegments[1];
    const dishSlug = pathSegments[2];
    const { categories } = useAppSelector((state: ApplicationState) => state.categories);
    const catName =
        categorySlug === 'the-juiciest'
            ? 'Самое сочное'
            : categories.find((cat) => cat.category === categorySlug)?.title;
    const category = categories.find((cat) => cat.category === categorySlug);
    const subcategory = category?.subCategories.find((item) => item.category === subcategorySlug);
    const { data: recipe } = useGetRecipeByIdQuery(dishSlug ?? skipToken);
    return (
        <Breadcrumb
            separator={<ChevronRightIcon color='gray.800' />}
            pl={{ sm: '20px', md: '20px' }}
            pb={{ sm: '12px', md: '12px' }}
            listProps={{
                style: { flexWrap: 'wrap' },
            }}
            data-test-id='breadcrumbs'
        >
            <BreadcrumbItem isCurrentPage={!catName}>
                <BreadcrumbLink
                    as={RouterLink}
                    to='/'
                    textStyle={catName ? 'navInactive' : 'navActive'}
                    onClick={() => onClose?.()}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {catName && (
                <BreadcrumbItem isCurrentPage={!subcategory}>
                    <BreadcrumbLink
                        as={RouterLink}
                        to={`/${categorySlug}/${category?.subCategories[0].category}`}
                        textStyle={subcategory ? 'navInactive' : 'navActive'}
                        onClick={() => onClose?.()}
                    >
                        {catName}
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

export default Breadcrumbs;
