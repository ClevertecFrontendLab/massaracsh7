import { IconButton } from '@chakra-ui/react';

export const BurgerButton = () => (
    <IconButton
        aria-label='Открыть меню'
        icon={
            <svg width='16' height='12' viewBox='0 0 16 12' fill='none'>
                <path d='M0 0H16V2H0V0ZM0 5H16V7H0V5ZM0 10H16V12H0V10Z' fill='black' />
            </svg>
        }
        variant='ghost'
        size='sm'
    />
);
