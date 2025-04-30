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
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';

import { ShevronDown } from '~/assets/icons/icons';
import { BASE_IMG_URL } from '~/constants';
// import categories from '~/data/categories';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { ApplicationState } from '~/store/configure-store';

interface NavProps {
    handleOpen?: (isOpen: boolean) => void;
    onClose?: () => void;
}
const NavigationMenu = ({ handleOpen, onClose }: NavProps) => {
    const navigate = useNavigate();
    const { error, isLoading } = useGetCategoriesQuery();
    const categories = useSelector((state: ApplicationState) => state.categories.categories);

    const [isOpen, setIsOpen] = useState(false);
    const handleAccordion = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        handleOpen?.(newIsOpen);
    };

    if (isLoading) {
        return <Text>Загрузка...</Text>;
    }

    if (error) {
        return <Text>Error...</Text>;
    }

    return (
        <Accordion
            data-test-id='nav'
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
                                    ? 'vegan-cuisine'
                                    : `${category.category}`
                            }
                            _hover={{ bg: 'customLime.50' }}
                            _expanded={{ bg: 'customLime.100', fontWeight: '700' }}
                            height='48px'
                            pr='18px'
                            pl='10px'
                            pt='4px'
                            onClick={() => {
                                if (category.subCategories && category.subCategories.length > 0) {
                                    const categorySlug = category.category;
                                    const firstSub = category.subCategories[0].category;
                                    navigate(`/${categorySlug}/${firstSub}`);
                                }
                            }}
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
                                {category.title}
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
                                        onClick={() => {
                                            onClose?.();
                                        }}
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
                                                    {item.title}
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

export default NavigationMenu;
