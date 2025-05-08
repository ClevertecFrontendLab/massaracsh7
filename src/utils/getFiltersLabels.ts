import { FilterData, SelectOption } from '~/types/utilTypes';

export const getFilterTags = (
    filters: FilterData,
    meatTypes: SelectOption[],
    sideTypes: SelectOption[],
    allergens: string[],
): string[] => [
    ...filters.categories,
    ...filters.authors,
    ...filters.meatTypes.map((meat) => {
        const found = meatTypes.find((item) => item.value === meat);
        return found ? found.label : meat;
    }),
    ...filters.sideTypes.map((side) => {
        const found = sideTypes.find((item) => item.value === side);
        return found ? found.label : side;
    }),
    ...(filters.excludeAllergens && allergens.length > 0 ? allergens : []),
];
