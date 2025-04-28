import { Recipe } from '~/types/typeRecipe';
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
        recomended: {
            name: 'Елена Высоцкая',
            username: '@lenavysockaya',
            description:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            imageUrl: '/images/elena.png',
        },
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
        recomended: {
            name: 'Alex Cook',
            username: '@funtastocooking',
            description:
                'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
            imageUrl: '/images/alex.png',
        },
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

export const desertDishes: KitchenDish[] = [
    {
        title: 'Бананово-молочное желе',
        description:
            'Молочное желе – это просто, вкусно и полезно, ведь для его приготовления в качестве основы используется молоко.',
        category: {
            title: 'Детские блюда',
            icon: '/icons/kids.svg',
        },
        likes: 1,
        comments: 1,
    },
    {
        title: 'Нежный сливочно-сырный крем для кексов',
        description:
            'Сливочно-сырным кремом можно украсить кексы, либо другую выпечку, а также этим кремом можно наполнить заварные пирожные.',
        category: {
            title: 'Детские блюда',
            icon: '/icons/kids.svg',
        },
        likes: 1,
        comments: 1,
    },
];

export const tryDesertDishes: TryDish[] = [
    { icon: '/icons/kids.svg', title: 'Домашние сырные палочки' },
    { icon: '/icons/national.svg', title: 'Панкейки' },
    { icon: '/icons/vegan.svg', title: 'Воздушное банановое печенье на сковороде' },
];

export const juicyRecipes: Recipe[] = [
    {
        id: '7',
        title: 'Лапша с курицей и шафраном',
        description: 'Ароматная лапша с курицей и шафраном, идеальное сочетание для сытного обеда.',
        category: ['second-dish'],
        subcategory: ['poultry', 'italian'],
        image: '/images/lapsha.jpg',
        bookmarks: 258,
        likes: 342,
        date: '2025-04-01T00:00:00Z',
        time: '40 минут',
        portions: 4,
        nutritionValue: { calories: 400, proteins: 30, fats: 15, carbohydrates: 50 },
        ingredients: [],
        steps: [],
    },
    {
        id: '8',
        title: 'Том-ям с капустой кимчи',
        description: 'Пикантный суп на основе кимчи и специй, для любителей острых азиатских блюд.',
        category: ['national'],
        subcategory: ['asian'],
        image: '/images/tom-yam.jpg',
        bookmarks: 124,
        likes: 324,
        date: '2025-04-02T00:00:00Z',
        time: '30 минут',
        portions: 3,
        nutritionValue: { calories: 250, proteins: 10, fats: 12, carbohydrates: 28 },
        ingredients: [],
        steps: [],
    },
    {
        id: '9',
        title: 'Пряная ветчина по-итальянски',
        description:
            'Ароматная ветчина, маринованная с пряностями и обжаренная до румяной корочки.',
        category: ['second-dish'],
        subcategory: ['meat'],
        image: '/images/vetchina.jpg',
        bookmarks: 159,
        likes: 257,
        date: '2025-04-03T00:00:00Z',
        time: '1 час 20 минут',
        portions: 4,
        nutritionValue: { calories: 420, proteins: 24, fats: 30, carbohydrates: 8 },
        ingredients: [],
        steps: [],
    },
    {
        id: '10',
        title: 'Кнели со спагетти',
        description:
            'Лёгкие и нежные мясные кнели с томатным соусом и спагетти — прекрасный вариант для уютного ужина.',
        category: ['second-dish'],
        subcategory: ['meat', 'pasta'],
        image: '/images/kneli.jpg',
        bookmarks: 85,
        likes: 152,
        date: '2025-04-04T00:00:00Z',
        time: '50 минут',
        portions: 3,
        nutritionValue: { calories: 380, proteins: 18, fats: 14, carbohydrates: 40 },
        ingredients: [],
        steps: [],
    },
    {
        id: '11',
        title: 'Картошка с болгарским перцем и фасолью',
        description: 'Сытное овощное рагу без мяса, насыщенное вкусами болгарского перца и фасоли.',
        category: ['national'],
        subcategory: ['vegetarian'],
        image: '/images/potatoes-beans.jpg',
        bookmarks: 85,
        likes: 152,
        date: '2025-04-05T00:00:00Z',
        time: '55 минут',
        portions: 4,
        nutritionValue: { calories: 300, proteins: 10, fats: 8, carbohydrates: 45 },
        ingredients: [],
        steps: [],
    },
    {
        id: '12',
        title: 'Картофельные рулетики с грибами',
        description: 'Постное блюдо из картофеля и грибов — вкусно, просто и доступно.',
        category: ['kids'],
        subcategory: ['vegetarian'],
        image: '/images/potatoes-rolls.jpg',
        bookmarks: 85,
        likes: 152,
        date: '2025-04-06T00:00:00Z',
        time: '1 час',
        portions: 4,
        nutritionValue: { calories: 320, proteins: 8, fats: 10, carbohydrates: 50 },
        ingredients: [],
        steps: [],
    },
    {
        id: '13',
        title: 'Овощная лазанья из лаваша',
        description:
            'Большое сытное блюдо для ценителей без мяса! Лазанья с овощным соусом и бешамелем.',
        category: ['grill'],
        subcategory: ['vegetarian'],
        image: '/images/lasagna.jpg',
        bookmarks: 85,
        likes: 152,
        date: '2025-04-07T00:00:00Z',
        time: '1 час',
        portions: 6,
        nutritionValue: { calories: 350, proteins: 12, fats: 18, carbohydrates: 35 },
        ingredients: [],
        steps: [],
    },
    {
        id: '14',
        title: 'Тефтели из булгура и чечевицы в томатном соусе',
        description: 'Яркие, сытные постные тефтели с насыщенным томатным вкусом.',
        category: ['second-dish'],
        subcategory: ['vegetarian'],
        image: '/images/meatballs.jpg',
        bookmarks: 85,
        likes: 152,
        date: '2025-04-08T00:00:00Z',
        time: '45 минут',
        portions: 4,
        nutritionValue: { calories: 360, proteins: 12, fats: 10, carbohydrates: 50 },
        ingredients: [],
        steps: [],
    },
];
