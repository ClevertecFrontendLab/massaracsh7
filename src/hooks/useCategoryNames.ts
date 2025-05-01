import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';

const useCategoryNames = (subCategoriesIds: string[]) => {
    const subCategories = useSelector((state: ApplicationState) => state.categories.subCategories);

    const categories = useSelector((state: ApplicationState) => state.categories.categories);

    const rootCategoryIds = subCategoriesIds.map(
        (subCategoryId) =>
            subCategories.find((subCategory) => subCategory._id === subCategoryId)?.rootCategoryId,
    );

    const categoryNames = categories
        .filter((category) => rootCategoryIds.includes(category._id))
        .map((category) => category.title);

    return categoryNames;
};

export default useCategoryNames;
