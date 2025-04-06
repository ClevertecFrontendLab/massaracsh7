import { BlogData, CardData, CardSliderData, KitchenDish, TryDish } from '~/types/typesData';

export const newRecipes: CardSliderData[] = [
    {
        title: 'Солянка с грибами',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить ',
        category: {
            title: 'Первые блюда',
            icon: '/icons/soups.svg',
        },
        likes: 1,
        comments: 1,
        imageUrl: '/images/solyanka.jpg',
    },
    {
        title: 'Капустные котлеты',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и л',
        category: {
            title: 'Веганские блюда',
            icon: '/icons/vegan.svg',
        },
        likes: 2,
        comments: 1,
        imageUrl: '/images/kotlety.jpg',
    },
    {
        title: 'Оладьи на кефире "Пышные"',
        description:
            'Очень вкусные и нежные оладьи на кефире. Настоятельно рекомендую пышные кефирные оладьи на завтрак.',
        category: {
            title: 'Десерты, выпечка',
            icon: '/icons/cookies.svg',
        },
        likes: 2,
        comments: 1,
        imageUrl: '/images/oladi.jpg',
    },
    {
        title: 'Салат "Здоровье"',
        description:
            'Сельдерей очень полезен для здоровья, пора набираться витаминов. Не  салат, а сплошное удовольствие:)',
        category: {
            title: 'Салаты',
            icon: '/icons/salat.svg',
        },
        likes: 1,
        comments: 1,
        imageUrl: '/images/salat.jpg',
    },
];

export const popularRecipes: CardData[] = [
    {
        title: 'Кнели со спагетти',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: {
            title: 'Вторые блюда',
            icon: '/icons/main-dishes.svg',
        },
        likes: 85,
        comments: 152,
        imageUrl: '/images/kneli.jpg',
    },
    {
        title: 'Пряная ветчина по-итальянски',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: {
            title: 'Вторые блюда',
            icon: '/icons/main-dishes.svg',
        },
        likes: 159,
        comments: 257,
        imageUrl: '/images/vetchina.jpg',
    },
    {
        title: 'Лапша с курицей и шафраном',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: {
            title: 'Вторые блюда',
            icon: '/icons/main-dishes.svg',
        },
        likes: 258,
        comments: 342,
        imageUrl: '/images/lapsha.jpg',
    },
    {
        title: 'Том-ям с капустой кимчи',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: {
            title: 'Национальные',
            icon: '/icons/national.svg',
        },
        likes: 124,
        comments: 324,
        imageUrl: '/images/tom-yam.jpg',
    },
];

export const blogs: BlogData[] = [
    {
        name: 'Елена Высоцкая',
        username: '@lenavysockaya',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        imageUrl: '/images/elena.png',
    },
    {
        name: 'Alex Cook',
        username: '@funtastocooking',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        imageUrl: '/images/alex.png',
    },
    {
        name: 'Екатерина Константинопольская',
        username: '@bake_and_pie',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        imageUrl: '/images/ekaterina.png',
    },
];

export const veganDishes: KitchenDish[] = [
    {
        title: 'Картошка, тушенная с бобами',
        description:
            'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый ден',
        category: {
            title: 'Вторые блюда',
            icon: '/icons/main-dishes.svg',
        },
        likes: 1,
        comments: 1,
    },
    {
        title: 'Капустные котлеты',
        description:
            'Капустные котлеты по этому рецепту получаются необычайно пышными и  невероятно вкусными. Мягкий вкус и л',
        category: {
            title: 'Вторые блюда',
            icon: '/icons/main-dishes.svg',
        },
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

export const veganRecipes: CardData[] = [
    {
        title: 'Картошка, тушенная с болгарским перцем и фасолью в томатном соусе',
        description:
            'Картошка, тушенная с болгарским перцем, фасолью, морковью и луком, -  вариант сытного блюда на каждый день. Фасоль в данном случае заменяет  мясо, делая рагу сытным и',
        category: {
            title: 'Национальные',
            icon: '/icons/national.svg',
        },
        likes: 85,
        comments: 152,
        imageUrl: '/images/potatoes-beans.jpg',
    },
    {
        title: 'Картофельные рулетики с грибами',
        description:
            'Рекомендую всем приготовить постное блюдо из картофеля и грибов.  Готовится это блюдо без яиц, без мяса и без сыра, из самых простых ',
        category: {
            title: 'Детские блюда',
            icon: '/icons/kids.svg',
        },
        likes: 85,
        comments: 152,
        imageUrl: '/images/potatoes-rolls.jpg',
    },
    {
        title: 'Том-ям с капустой кимчи',
        description:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
        category: {
            title: 'Национальные',
            icon: '/icons/national.svg',
        },
        likes: 124,
        comments: 324,
        imageUrl: '/images/tom-yam.jpg',
    },
    {
        title: 'Овощная лазанья из лава',
        description:
            'Большое, сытное блюдо для ценителей блюд без мяса! Такая лазанья  готовится с овощным соусом и соусом бешамель',
        category: {
            title: 'Блюда на гриле',
            icon: '/icons/grill.svg',
        },
        likes: 85,
        comments: 152,
        imageUrl: '/images/lasagna.jpg',
    },
    {
        title: 'Тефтели из булгура и чечевицы, запечённые в томатном соусе',
        description:
            'Тефтели из булгура и чечевицы – яркие и питательные, отлично подходят  для постного и вегетарианского меню. Тефтели получаются нежными, а также сочными и ароматными благод',
        category: {
            title: 'Вторые блюда',
            icon: '/icons/main-dishes.svg',
        },
        likes: 85,
        comments: 152,
        imageUrl: '/images/meatballs.jpg',
    },

    {
        title: 'Тефтели из булгура и чечевицы, запечённые в томатном соусе',
        description:
            'Тефтели из булгура и чечевицы – яркие и питательные, отлично подходят  для постного и вегетарианского меню. Тефтели получаются нежными, а также сочными и ароматными благод',
        category: {
            title: 'Вторые блюда',
            icon: '/icons/main-dishes.svg',
        },
        likes: 85,
        comments: 152,
        imageUrl: '/images/meatballs.jpg',
    },
    {
        title: 'Чесночная картошка',
        description:
            'Такая картошечка украсит любой семейный обед! Все будут в полном  восторге, очень вкусно! Аромат чеснока, хрустящая корочка на картошечке ',
        category: {
            title: 'Национальные',
            icon: '/icons/national.svg',
        },
        likes: 124,
        comments: 324,
        imageUrl: '/images/potatoes-garlick.jpg',
    },
    {
        title: 'Пури',
        description:
            'Пури - это индийские жареные лепешки, которые готовятся из пресного  теста. Рецепт лепешек пури требует самых доступных',
        category: {
            title: 'Национальные',
            icon: '/icons/national.svg',
        },
        likes: 124,
        comments: 324,
        imageUrl: '/images/puri.jpg',
    },
];
