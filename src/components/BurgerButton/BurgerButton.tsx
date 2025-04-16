import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

interface BurgerButtonProps {
    isOpen: boolean;
    onToggle: () => void;
}

export const BurgerButton = ({ isOpen, onToggle }: BurgerButtonProps) => (
    <IconButton
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть/меню'}
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon w='20px' h='20px' />}
        variant='ghost'
        colorScheme='black'
        onClick={onToggle}
        size='sm'
        zIndex='9999'
    />
);
