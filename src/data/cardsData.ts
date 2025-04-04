import { BlogData, CardData, TryDish, VeganDish } from '~/types/typesData';

export const newRecipes: CardData[] = [
    {
        title: 'Солянка с грибами',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить ',
        category: 'Первые блюда',
        likes: 1,
        comments: 1,
        imageUrl: '/images/solyanka.jpg',
    },
    {
        title: 'Капустные котлеты',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и л',
        category: 'Веганские блюда',
        likes: 2,
        comments: 1,
        imageUrl: '/images/kotlety.jpg',
    },
    {
        title: 'Оладьи на кефире "Пышные"',
        description:
            'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
        category: 'Десерты, выпечка',
        likes: 2,
        comments: 1,
        imageUrl: '/images/oladi.jpg',
    },
    {
        title: 'Салат "Здоровье"',
        description:
            'Сельдерей очень полезен для здоровья, пора набираться витаминов. Не  салат, а сплошное удовольствие:)',
        category: 'Салаты',
        likes: 1,
        comments: 1,
        imageUrl: '/images/salat.jpg',
    },
];

export const popularRecipes: CardData[] = [
    {
        title: 'Кнели со спагетти',
        description: 'Как раз после праздников...',
        category: 'Вторые блюда',
        likes: 85,
        comments: 152,
        imageUrl: '/images/kneli.jpg',
    },
    {
        title: 'Пряная ветчина по-итальянски',
        description: 'Как раз после праздников...',
        category: 'Вторые блюда',
        likes: 159,
        comments: 257,
        imageUrl: '/images/vetchina.jpg',
    },
    {
        title: 'Лапша с курицей и шафраном',
        description: 'Как раз после праздников...',
        category: 'Вторые блюда',
        likes: 258,
        comments: 342,
        imageUrl: '/images/lapsha.jpg',
    },
    {
        title: 'Том-ям с капустой кимчи',
        description: 'Как раз после праздников...',
        category: 'Национальные',
        likes: 124,
        comments: 324,
        imageUrl: '/images/tom-yam.jpg',
    },
];

export const blogs: BlogData[] = [
    {
        name: 'Елена Высоцкая',
        handle: '@lenavysockaya',
        description: 'Как раз после праздников...',
        imageUrl: '/images/elena.png',
    },
    {
        name: 'Alex Cook',
        handle: '@funtastocooking',
        description: 'Как раз после праздников...',
        imageUrl: '/images/alex.png',
    },
    {
        name: 'Екатерина Константинопольская',
        handle: '@bake_and_pie',
        description: 'Как раз после праздников...',
        imageUrl: '/images/ekaterina.png',
    },
];

export const veganDishes: VeganDish[] = [
    {
        title: 'Картошка, тушенная с бобами',
        description:
            'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый ден',
        category: 'Вторые блюда',
        likes: 1,
        comments: 1,
    },
    {
        title: 'Капустные котлеты',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и л',
        category: 'Вторые блюда',
        likes: 2,
        comments: 1,
    },
];

export const tryDishes: TryDish[] = [
    { icon: '/icons/pan.svg', title: 'Стейк для вегетарианцев' },
    { icon: '/icons/pan.svg', title: 'Котлеты из гречки и фасоли' },
    { icon: '/icons/pot.svg', title: 'Сырный суп с лапшой и брокколи' },
];

type Option = {
    value: string;
    label: string;
};

export const allergens: Option[] = [
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
