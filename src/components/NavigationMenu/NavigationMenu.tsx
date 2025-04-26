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
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';

import { ShevronDown } from '~/assets/icons/icons';
import categories from '~/data/categories';

interface NavProps {
    handleOpen?: (isOpen: boolean) => void;
    onClose?: () => void;
}
const NavigationMenu = ({ handleOpen, onClose }: NavProps) => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const handleAccordion = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        handleOpen?.(newIsOpen);
    };

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
            boxShadow={isOpen ? 'menu' : 'none'}
        >
            {categories.map((category, index) => (
                <AccordionItem key={index} border='none'>
                    <AccordionButton
                        data-test-id={`${category}`}
                        _hover={{ bg: 'customLime.50' }}
                        _expanded={{ bg: 'customLime.100', fontWeight: '700' }}
                        height='48px'
                        pr='18px'
                        pl='10px'
                        pt='4px'
                        onClick={() => {
                            if (category.items && category.items.length > 0) {
                                console.log(category);
                                const categorySlug = category.url;
                                const firstSub = category.items[0].subcategory;
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
                                <Image src={category.icon} alt={category.title} boxSize='24px' />
                            )}
                            {category.title}
                        </Box>
                        <AccordionIcon as={ShevronDown} w='14px' h='10px' />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <List spacing={1.5}>
                            {category.items.map((item, index) => (
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
                                        to={`/${category.url}/${item.subcategory}`}
                                        className={({ isActive }) =>
                                            `custom-nav-link${isActive ? ' active' : ''}`
                                        }
                                    >
                                        {({ isActive }) => (
                                            <Box
                                                as='span'
                                                data-test-id={`${item.subcategory}${isActive ? '-active' : ''}`}
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
