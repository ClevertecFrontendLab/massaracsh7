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
        <Breadcrumb separator={<ChevronRightIcon color='gray.800' />}>
            <BreadcrumbItem isCurrentPage={!currentCategory} isLastChild={!currentCategory}>
                <BreadcrumbLink
                    as={RouterLink}
                    to='/'
                    textStyle={currentCategory ? 'navInactive' : 'navActive'}
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>

            {currentCategory && (
                <BreadcrumbItem
                    isCurrentPage={!currentSubcategory}
                    isLastChild={!currentSubcategory}
                >
                    <BreadcrumbLink
                        as={RouterLink}
                        to={`/${currentCategory}`}
                        textStyle={currentSubcategory ? 'navInactive' : 'navActive'}
                    >
                        {getTitleByUrl(currentCategory)}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            )}

            {currentSubcategory && (
                <BreadcrumbItem isCurrentPage isLastChild>
                    <BreadcrumbLink textStyle='navActive'>{currentSubcategory}</BreadcrumbLink>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
