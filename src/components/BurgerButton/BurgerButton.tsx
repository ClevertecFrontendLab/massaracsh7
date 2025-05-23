import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

import { TEST_IDS } from '~/constants/test-ids';

interface BurgerButtonProps {
    isOpen: boolean;
    onToggle: () => void;
}

export const BurgerButton = ({ isOpen, onToggle }: BurgerButtonProps) => (
    <IconButton
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть/меню'}
        icon={
            isOpen ? (
                <CloseIcon data-test-id={TEST_IDS.CLOSE_ICON} />
            ) : (
                <HamburgerIcon w='20px' h='20px' data-test-id={TEST_IDS.HUMB_ICON} />
            )
        }
        variant='ghost'
        colorScheme='black'
        onClick={onToggle}
        size='sm'
        zIndex='9999'
    />
);
