import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router';

import { getTitleByUrl } from '~/utils/getTitleByUrl';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);

    const currentCategory = pathSegments[0];
    const currentSubcategory = pathSegments[1] ? decodeURIComponent(pathSegments[1]) : null;

    return (
        <Breadcrumb separator={<ChevronRightIcon color='gray.500' />}>
            <BreadcrumbItem>
                <BreadcrumbLink as={RouterLink} to='/'>
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink as={RouterLink} to={`/${currentCategory}`}>
                    {getTitleByUrl(currentCategory)}
                </BreadcrumbLink>
            </BreadcrumbItem>

            {currentSubcategory && (
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>{currentSubcategory}</BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
