import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Image,
    List,
    ListItem,
} from '@chakra-ui/react';
import { NavLink } from 'react-router';

const categories = [
    {
        title: 'Салаты',
        icon: '/icons/salat.svg',
        items: ['Мясные салаты', 'Рыбные салаты', 'Овощные салаты', 'Теплые салаты'],
    },
    {
        title: 'Закуски',
        icon: '/icons/snacks.svg',
        items: [
            'Мясные закуски',
            'Рыбные закуски',
            'Овощные закуски',
            'Теплые закуски',
            'Бутерброды',
            'Фастфуд',
        ],
    },
    {
        title: 'Первые блюда',
        icon: '/icons/soups.svg',
        items: ['Мясные супы', 'Овощные супы', 'Бульоны', 'Холодные супы', 'Диетические супы'],
    },
    {
        title: 'Вторые блюда',
        icon: '/icons/main-dishes.svg',
        items: [
            'Мясные',
            'Рыбные',
            'Овощные',
            'Из птицы',
            'Из грибов',
            'Из субпродуктов',
            'На пару',
            'Пельмени, вареники',
            'Мучные гарниры',
            'Овощные гарниры',
            'Пицца',
            'Суши',
        ],
    },
    {
        title: 'Десерты и выпечка',
        icon: '/icons/cookies.svg',
        items: [
            'Блины и оладьи',
            'Пироги и пончики',
            'Торты',
            'Рулеты',
            'Кексы и маффины',
            'Сырники и ватрушки',
            'Из слоеного теста',
            'Из заварного теста',
            'Из дрожжевого теста',
            'Булочки и сдоба',
            'Хлеб',
            'Тесто на пиццу',
            'Кремы',
        ],
    },
    {
        title: 'Блюда на гриле',
        icon: '/icons/grill.svg',
        items: ['Говядина', 'Свинина', 'Птица', 'Рыба', 'Грибы', 'Овощи'],
    },
    {
        title: 'Веганская кухня',
        icon: '/icons/vegan.svg',
        items: [
            'Закуски',
            'Первые блюда',
            'Вторые блюда',
            'Гарниры',
            'Десерты',
            'Выпечка',
            'Сыроедческие блюда',
        ],
    },
    {
        title: 'Детские блюда',
        icon: '/icons/kids.svg',
        items: [
            'Первые блюда',
            'Вторые блюда',
            'Гарниры',
            'Выпечка',
            'Без глютена',
            'Без сахара',
            'Без аллергенов',
            'Блюда для прикорма',
        ],
    },
    {
        title: 'Лечебное питание',
        icon: '/icons/diets.svg',
        items: [
            'Детская диета',
            'Диета №1',
            'Диета №2',
            'Диета №3',
            'Диета №5',
            'Диета №6',
            'Диета №7',
            'Диета №8',
            'Диета №9',
            'Диета №10',
            'Диета №11',
            'Диета №12',
            'Диета №13',
            'Диета №14',
            'Без глютена',
            'Без аллергенов',
        ],
    },
    {
        title: 'Национальные блюда',
        icon: '/icons/national.svg',
        items: [
            'Американская кухня',
            'Армянская кухня',
            'Греческая кухня',
            'Грузинская кухня',
            'Итальянская кухня',
            'Испанская кухня',
            'Китайская кухня',
            'Мексиканская кухня',
            'Паназиатская кухня',
            'Русская кухня',
            'Турецкая кухня',
            'Французская кухня',
            'Шведская кухня',
            'Японская кухня',
            'Другая кухня',
        ],
    },
    {
        title: 'Соусы',
        icon: '/icons/souse.svg',
        items: ['Соусы мясные', 'Соусы сырные', 'Маринады'],
    },
    {
        title: 'Домашние заготовки',
        icon: '/icons/cans.svg',
        items: [
            'Мясные заготовки',
            'Рыбные заготовки',
            'Из огурцов',
            'Из томатов',
            'Из грибов',
            'Овощные заготовки',
            'Салаты, икра',
            'Из фруктов и ягод',
        ],
    },
    {
        title: 'Напитки',
        icon: '/icons/drink.svg',
        items: [
            'Соки и фреши',
            'Смузи',
            'Компоты',
            'Кисели',
            'Кофе',
            'Лечебный чай',
            'Квас',
            'Коктейли',
            'Алкогольные',
        ],
    },
];

const NavigationMenu = () => (
    <Accordion
        allowMultiple
        overflowY='auto'
        css={{
            '&::-webkit-scrollbar': {
                width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
                background: 'rgba(0, 0, 0, 0.16)',
                borderRadius: '8px',
            },
            '&::-webkit-scrollbar-track': {
                background: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '8px',
            },
        }}
        height='calc(100vh - 80px - 144px)'
        borderRadius='large'
        boxShadow='0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)'
        pt={2.5}
        pl={2.5}
        pr={4}
    >
        {categories.map((category, index) => (
            <AccordionItem key={index} border='none'>
                <AccordionButton
                    _hover={{ bg: 'customLime.50' }}
                    _expanded={{ bg: 'customLime.100' }}
                    height='48px'
                    padding='12px 8px'
                >
                    <Box flex='1' textAlign='left' display='flex' alignItems='center' gap={2}>
                        {category.icon && (
                            <Image src={category.icon} alt={category.title} boxSize='24px' />
                        )}
                        {category.title}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <List spacing={1}>
                        {category.items.map((item, index) => (
                            <ListItem
                                key={index}
                                padding='6px 8px 6px 40px'
                                className='custom-nav-item'
                            >
                                <NavLink
                                    to={`/vegan/${item}`}
                                    className='custom-nav-link'
                                    style={({ isActive }) => ({
                                        textDecoration: 'none',
                                        padding: '6px 8px',
                                        borderLeftWidth: isActive ? '8px' : '1px',
                                    })}
                                >
                                    {item}
                                </NavLink>
                            </ListItem>
                        ))}
                    </List>
                </AccordionPanel>
            </AccordionItem>
        ))}
    </Accordion>
);

export default NavigationMenu;
