import { Box, useDisclosure, useOutsideClick } from '@chakra-ui/react';
import { useRef } from 'react';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { BurgerButton } from '../BurgerButton/BurgerButton';
import NavigationFooter from '../NavigationFooter/NavigationFooter';
import NavigationMenu from '../NavigationMenu/NavigationMenu';

const MobileMenu = () => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const menuRef = useRef<HTMLDivElement>(null);

    useOutsideClick({
        ref: menuRef as React.RefObject<HTMLElement>,
        handler: () => {
            if (isOpen) onClose();
        },
    });

    return (
        <Box position='relative' ref={menuRef} zIndex='popover'>
            <BurgerButton isOpen={isOpen} onToggle={onToggle} />

            {isOpen && (
                <>
                    <Box
                        position='fixed'
                        top='64px'
                        left={0}
                        bottom={0}
                        width='100vw'
                        height='100vh'
                        bg='blackAlpha.400'
                        onClick={onClose}
                        zIndex='11'
                    />

                    <Box
                        position='fixed'
                        top='64px'
                        right={0}
                        height='100vh'
                        width='80%'
                        maxW='300px'
                        bg='white'
                        boxShadow='lg'
                        zIndex='12'
                        overflowY='auto'
                    >
                        <Box>
                            <Breadcrumbs />
                        </Box>
                        <Box>
                            <NavigationMenu />
                            <NavigationFooter />
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default MobileMenu;
