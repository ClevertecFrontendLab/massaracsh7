import { HamburgerIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

export const BurgerButton = () => (
    <IconButton
        aria-label='Открыть меню'
        icon={<HamburgerIcon w='20px' h='20px' />}
        variant='ghost'
        colorScheme='black'
        size='sm'
    />
);
