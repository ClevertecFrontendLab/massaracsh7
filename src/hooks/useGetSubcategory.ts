import { useSelector } from 'react-redux';

import { ApplicationState } from '~/store/configure-store';

const useGetSubcategory = (subCategoryIds: string[]) => {
    const { subCategories } = useSelector((state: ApplicationState) => state.categories);
    return subCategories.filter((subCategory) => subCategoryIds.includes(subCategory._id));
};

export default useGetSubcategory;
