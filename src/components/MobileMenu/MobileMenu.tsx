import { Box, useDisclosure, useOutsideClick } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { BurgerButton } from '../BurgerButton/BurgerButton';
import NavigationFooter from '../NavigationFooter/NavigationFooter';
import NavigationMenu from '../NavigationMenu/NavigationMenu';

interface MobileMenuProps {
    onOpenChange?: (isOpen: boolean) => void;
}

const MobileMenu = ({ onOpenChange }: MobileMenuProps) => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const menuRef = useRef<HTMLDivElement>(null);
    const [isAccardeonOpen, setIsAccardeonOpen] = useState(false);

    useOutsideClick({
        ref: menuRef as React.RefObject<HTMLElement>,
        handler: () => {
            if (isOpen) {
                onClose();
                onOpenChange?.(false);
            }
        },
    });

    useEffect(() => {
        onOpenChange?.(isOpen);
    }, [isOpen, onOpenChange]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <Box position='relative' ref={menuRef} zIndex='popover'>
            <BurgerButton isOpen={isOpen} onToggle={onToggle} />

            {isOpen && (
                <>
                    <Box
                        position='fixed'
                        top={isAccardeonOpen ? '64px' : '48px'}
                        left={0}
                        bottom={0}
                        width='100%'
                        height='100%'
                        bg='blackAlpha.300'
                        onClick={onClose}
                        zIndex='11'
                    />

                    <Box
                        position='fixed'
                        top='64px'
                        right={0}
                        borderRadius='0 0 16px 16px'
                        bottom='92px'
                        width='80%'
                        maxW='344px'
                        bg='white'
                        boxShadow='lg'
                        zIndex='12'
                        overflowY='auto'
                        py={4}
                    >
                        <Box>
                            <Breadcrumbs />
                        </Box>
                        <Box>
                            <NavigationMenu handleOpen={setIsAccardeonOpen} onClose={onClose} />
                            <NavigationFooter />
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default MobileMenu;
