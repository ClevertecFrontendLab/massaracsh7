import { selectAllCategories, selectAllSubCategories } from '~/store/category-slice';
import { useAppSelector } from '~/store/hooks';

export const useGetCategory = (subCategoriesIds: string[]) => {
    const categories = useAppSelector(selectAllCategories);
    const subCategories = useAppSelector(selectAllSubCategories);
    const rootCategoryIds = subCategoriesIds.map(
        (subCategoryId) =>
            subCategories.find((subCategory) => subCategory._id === subCategoryId)?.rootCategoryId,
    );

    const categoriesSelect = categories.filter((category) =>
        rootCategoryIds.includes(category._id),
    );

    return categoriesSelect;
};
