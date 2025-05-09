import { useSelector } from 'react-redux';

import { selectAllCategories, selectAllSubCategories } from '~/store/category-slice';

export const useGetCategory = (subCategoriesIds: string[]) => {
    const categories = useSelector(selectAllCategories);
    const subCategories = useSelector(selectAllSubCategories);
    const rootCategoryIds = subCategoriesIds.map(
        (subCategoryId) =>
            subCategories.find((subCategory) => subCategory._id === subCategoryId)?.rootCategoryId,
    );

    const categoriesSelect = categories.filter((category) =>
        rootCategoryIds.includes(category._id),
    );

    return categoriesSelect;
};
