import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router';

import categories from '~/data/categories';
import { dishes } from '~/data/dishes';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);

    const categorySlug = pathSegments[0];
    const subcategorySlug = pathSegments[1];
    const dishSlug = pathSegments[2];
    console.log(pathSegments);

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
                <BreadcrumbItem isCurrentPage={!dish}>
                    <BreadcrumbLink
                        as={RouterLink}
                        to={`/${categorySlug}/${subcategorySlug}`}
                        textStyle={dish ? 'navInactive' : 'navActive'}
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
