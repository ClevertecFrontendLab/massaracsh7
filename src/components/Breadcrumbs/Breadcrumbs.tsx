import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router';

import categories from '~/data/categories';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);

    const categorySlug = pathSegments[0];
    const subcategorySlug = pathSegments[1];

    const category = categories.find((cat) => cat.url === categorySlug);
    const subcategory = category?.items.find((item) => item.subcategory === subcategorySlug);
    return (
        <Breadcrumb
            separator={<ChevronRightIcon color='gray.800' />}
            pl={{ md: '20px' }}
            pb={{ md: '12px' }}
        >
            <BreadcrumbItem isCurrentPage={!category}>
                <BreadcrumbLink
                    as={RouterLink}
                    to='/'
                    textStyle={category ? 'navInactive' : 'navActive'}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {category && (
                <BreadcrumbItem isCurrentPage={!subcategory}>
                    <BreadcrumbLink
                        as={RouterLink}
                        to={`/${categorySlug}`}
                        textStyle={subcategory ? 'navInactive' : 'navActive'}
                    >
                        {category.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {subcategory && (
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink
                        as={RouterLink}
                        to={`/${categorySlug}/${subcategorySlug}`}
                        textStyle='navActive'
                    >
                        {subcategory.title}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
