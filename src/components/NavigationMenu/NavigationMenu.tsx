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

import categories from './categories';

const NavigationMenu = () => (
    <Accordion
        allowToggle
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
        boxShadow='menu'
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
