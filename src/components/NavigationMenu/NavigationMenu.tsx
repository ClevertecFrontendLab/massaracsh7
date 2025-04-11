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

const NavigationMenu = () => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Accordion
            onChange={() => setIsOpen(!isOpen)}
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
            height='calc(100vh - 80px - 144px)'
            borderRadius='large'
            boxShadow={isOpen ? 'menu' : 'none'}
        >
            {categories.map((category, index) => (
                <AccordionItem key={index} border='none'>
                    <AccordionButton
                        data-test-id={category.title === 'Веганская кухня' ? 'vegan-cuisine' : ''}
                        _hover={{ bg: 'customLime.50' }}
                        _expanded={{ bg: 'customLime.100', fontWeight: '700' }}
                        height='48px'
                        pr='18px'
                        pl='10px'
                        pt={1}
                        onClick={() => {
                            if (category.items && category.items.length > 0) {
                                const firstSub = category.items[0];
                                navigate(`/vegan/${firstSub}`);
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
                                >
                                    <NavLink
                                        to={`/vegan/${item}`}
                                        className={({ isActive }) =>
                                            `custom-nav-link${isActive ? ' active' : ''}`
                                        }
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
};

export default NavigationMenu;
