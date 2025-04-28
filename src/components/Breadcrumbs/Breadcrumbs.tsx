import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router';

import categories from '~/data/categories';
import { dishes } from '~/data/dishes';

interface BreadcrumbsProps {
    onClose?: () => void;
}

const Breadcrumbs = ({ onClose }: BreadcrumbsProps) => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);

    const categorySlug = pathSegments[0];
    const subcategorySlug = pathSegments[1];
    const dishSlug = pathSegments[2];
    console.log(pathSegments);
    const catName =
        categorySlug === 'the-juiciest'
            ? 'Самое сочное'
            : categories.find((cat) => cat.url === categorySlug)?.title;
    const category = categories.find((cat) => cat.url === categorySlug);
    const subcategory = category?.items.find((item) => item.subcategory === subcategorySlug);
    const dish = dishes?.find((item) => item.id === dishSlug);
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
                        to={`/${categorySlug}/${category?.items[0].subcategory}`}
                        textStyle={subcategory ? 'navInactive' : 'navActive'}
                        onClick={() => onClose?.()}
                    >
                        {catName}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {subcategory && (
                <BreadcrumbItem isCurrentPage={!dish}>
                    <BreadcrumbLink
                        as={RouterLink}
                        to={`/${categorySlug}/${subcategorySlug}`}
                        textStyle={dish ? 'navInactive' : 'navActive'}
                        onClick={() => onClose?.()}
                    >
                        {subcategory.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {dish ? (
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink textStyle='navActive'>{dish.title}</BreadcrumbLink>
                </BreadcrumbItem>
            ) : null}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
