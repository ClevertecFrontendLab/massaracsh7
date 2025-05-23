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
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';

import { ShevronDown } from '~/assets/icons/icons';
import { BASE_IMG_URL } from '~/constants/constants';
import { TEST_IDS } from '~/constants/test-ids';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { selectAllCategories } from '~/store/category-slice';
import { useAppSelector } from '~/store/hooks';
import { Category } from '~/types/apiTypes';

interface NavProps {
    handleOpen?: (isOpen: boolean) => void;
    onClose?: () => void;
}
export const NavigationMenu = ({ handleOpen, onClose }: NavProps) => {
    const navigate = useNavigate();
    useGetCategoriesQuery();
    const categories = useAppSelector(selectAllCategories);

    const [isOpen, setIsOpen] = useState(false);
    const handleAccordion = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        handleOpen?.(newIsOpen);
    };

    const handleCategoryClick = (category: Category) => {
        if (category.subCategories && category.subCategories.length > 0) {
            const categorySlug = category.category;
            const firstSub = category.subCategories[0].category;
            navigate(`/${categorySlug}/${firstSub}`);
        }
    };

    return (
        <Accordion
            data-test-id={TEST_IDS.NAV}
            onChange={handleAccordion}
            allowToggle
            overflowY='auto'
            css={{
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(0, 0, 0, 0.16)',
                    borderRadius: '8px',
                    maxHeight: '30%',
                },
                '&::-webkit-scrollbar-track': {
                    background: 'rgba(0, 0, 0, 0.04)',
                    borderRadius: '8px',
                },
            }}
            height={{
                base: 'calc(100vh - 280px)',
                mid: 'calc(100vh - 280px)',
                lg: 'calc(100vh - 80px - 144px)',
                xl: 'calc(100vh - 80px - 144px)',
            }}
            borderRadius='large'
            boxShadow={{
                base: 'none',
                mid: isOpen ? 'menu' : 'none',
            }}
        >
            {categories &&
                categories.map((category, index) => (
                    <AccordionItem key={index} border='none'>
                        <AccordionButton
                            data-test-id={
                                category.title === 'Веганская кухня'
                                    ? TEST_IDS.VEGAN
                                    : `${category.category}`
                            }
                            _hover={{ bg: 'customLime.50' }}
                            _expanded={{ bg: 'customLime.100', fontWeight: '700' }}
                            height='48px'
                            pr='18px'
                            pl='10px'
                            pt='4px'
                            onClick={() => handleCategoryClick(category)}
                        >
                            <Box
                                flex='1'
                                pl='10px'
                                display='flex'
                                alignItems='center'
                                gap={2}
                                textStyle='nav'
                            >
                                {category.icon && (
                                    <Image
                                        src={`${BASE_IMG_URL}${category.icon}`}
                                        alt={category.title}
                                        boxSize='24px'
                                    />
                                )}
                                <Text isTruncated>{category.title}</Text>
                            </Box>
                            <AccordionIcon as={ShevronDown} w='14px' h='10px' />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <List spacing={1.5}>
                                {category.subCategories.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        padding='1px 8px 1px 24px'
                                        _hover={{
                                            bg: 'customLime.50',
                                            borderLeft: '1px solid transparent',
                                        }}
                                        onClick={() => onClose?.()}
                                    >
                                        <NavLink
                                            to={`/${category.category}/${item.category}`}
                                            className={({ isActive }) =>
                                                `custom-nav-link${isActive ? ' active' : ''}`
                                            }
                                        >
                                            {({ isActive }) => (
                                                <Box
                                                    as='span'
                                                    data-test-id={`${item.category}${isActive ? '-active' : ''}`}
                                                >
                                                    <Text isTruncated>{item.title}</Text>
                                                </Box>
                                            )}
                                        </NavLink>
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
        </Accordion>
    );
};
