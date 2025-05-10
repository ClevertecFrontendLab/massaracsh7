import { useSelector } from 'react-redux';

import { selectAllSubCategories } from '~/store/selectors/categoriesSelectors';

export const useGetSubcategory = (subCategoryIds: string[]) => {
    const subCategories = useSelector(selectAllSubCategories);
    return subCategories.filter((subCategory) => subCategoryIds.includes(subCategory._id));
};
