import { BlogData, CardData, VeganDish } from '~/types/typesData';

export const newRecipes: CardData[] = [
    {
        title: 'Солянка с грибами',
        description: 'Как раз после праздников...',
        category: 'Первые блюда',
        likes: 1,
        comments: 1,
        imageUrl: '/images/solyanka.jpg',
    },
    {
        title: 'Капустные котлеты',
        description: 'Капустные котлеты по этому рецепту...',
        category: 'Веганские блюда',
        likes: 2,
        comments: 1,
        imageUrl: '/images/kotlety.jpg',
    },
    {
        title: 'Оладьи на кефире "Пышные"',
        description: 'Очень вкусные и нежные...',
        category: 'Десерты, выпечка',
        likes: 2,
        comments: 1,
        imageUrl: '/images/oladi.jpg',
    },
    {
        title: 'Салат "Здоровье"',
        description: 'Сельдерей очень полезен...',
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
    { title: 'Картошка, тушенная с бобами', category: 'Вторые блюда', likes: 1, comments: 1 },
    { title: 'Капустные котлеты', category: 'Вторые блюда', likes: 2, comments: 1 },
    // { title: 'Стейк для вегетарианцев'},
    // { title: 'Котлеты из гречки и фасоли'},
    // { title: 'Сырный суп с лапшой и брокколи'},
];
