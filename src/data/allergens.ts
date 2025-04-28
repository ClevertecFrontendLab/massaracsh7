import { Allergen, MeatSide } from '~/types/typeCategory';

export const allergens: Allergen[] = [
    { value: 'dairy', label: 'Молочные продукты' },
    { value: 'eggs', label: 'Яйцо' },
    { value: 'fish', label: 'Рыба' },
    { value: 'mollusks', label: 'Моллюски' },
    { value: 'nuts', label: 'Орехи' },
    { value: 'tomato', label: 'Томат (помидор)' },
    { value: 'citrus', label: 'Цитрусовые' },
    { value: 'strawberry', label: 'Клубника (ягоды)' },
    { value: 'chocolate', label: 'Шоколад' },
];

export const meatTypes: MeatSide[] = [
    { value: 'chicken', label: 'Курица' },
    { value: 'pork', label: 'Свинина' },
    { value: 'beef', label: 'Говядина' },
    { value: 'turkey', label: 'Индейка' },
    { value: 'duck', label: 'Утка' },
];

export const sideTypes: MeatSide[] = [
    { value: 'potatoes', label: 'Картошка' },
    { value: 'buckwheat', label: 'Гречка' },
    { value: 'pasta', label: 'Паста' },
    { value: 'spaghetti', label: 'Спагетти' },
    { value: 'rice', label: 'Рис' },
    { value: 'cabbage', label: 'Капуста' },
    { value: 'beans', label: 'Фасоль' },
    { value: 'other vegetables', label: 'Другие овощи' },
];
