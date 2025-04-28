import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

interface BurgerButtonProps {
    isOpen: boolean;
    onToggle: () => void;
}

export const BurgerButton = ({ isOpen, onToggle }: BurgerButtonProps) => (
    <IconButton
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть/меню'}
        icon={
            isOpen ? (
                <CloseIcon data-test-id='close-icon' />
            ) : (
                <HamburgerIcon w='20px' h='20px' data-test-id='hamburger-icon' />
            )
        }
        variant='ghost'
        colorScheme='black'
        onClick={onToggle}
        size='sm'
        zIndex='9999'
    />
);
