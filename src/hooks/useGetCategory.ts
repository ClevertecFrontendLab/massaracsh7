import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';

const useGetCategory = (subCategoriesIds: string[]) => {
    const { subCategories, categories } = useSelector(
        (state: ApplicationState) => state.categories,
    );

    const rootCategoryIds = subCategoriesIds.map(
        (subCategoryId) =>
            subCategories.find((subCategory) => subCategory._id === subCategoryId)?.rootCategoryId,
    );

    const categoriesSelect = categories.filter((category) =>
        rootCategoryIds.includes(category._id),
    );

    return categoriesSelect;
};

export default useGetCategory;
