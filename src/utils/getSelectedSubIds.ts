import { Category, CategorySub } from '~/types/apiTypes';

export function getSelectedSubIds(
    category: string | undefined,
    categories: Category[],
    subCategories: CategorySub[],
    selectedCategoryIds: string[],
): string[] {
    if (category) {
        const matchedCategory = categories.find((cat) => cat.category === category);

        if (matchedCategory) {
            return subCategories
                .filter((sub) => sub.rootCategoryId === matchedCategory._id)
                .map((sub) => sub._id);
        }

        return [];
    }

    return subCategories
        .filter((sub) => selectedCategoryIds.includes(sub.rootCategoryId))
        .map((sub) => sub._id);
}
