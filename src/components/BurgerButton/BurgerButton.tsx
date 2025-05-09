import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

import { CLOSE_ICON, HUMB_ICON } from '~/constants/test-ids';

interface BurgerButtonProps {
    isOpen: boolean;
    onToggle: () => void;
}

export const BurgerButton = ({ isOpen, onToggle }: BurgerButtonProps) => (
    <IconButton
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть/меню'}
        icon={
            isOpen ? (
                <CloseIcon data-test-id={CLOSE_ICON} />
            ) : (
                <HamburgerIcon w='20px' h='20px' data-test-id={HUMB_ICON} />
            )
        }
        variant='ghost'
        colorScheme='black'
        onClick={onToggle}
        size='sm'
        zIndex='9999'
    />
);
