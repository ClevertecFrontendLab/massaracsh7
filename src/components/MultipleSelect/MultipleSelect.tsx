import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton } from '@chakra-ui/react';

const MultipleSelect = () => (
    <Menu>
        <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon boxSize='20px' />}
            variant='outline'
            w='234px'
            fontSize='16px'
            fontWeight='400'
            lineHeight='24px'
            color='secondaryText'
            py={4}
            pr={2}
        >
            Выберите из списка...
        </MenuButton>
    </Menu>
);

export default MultipleSelect;
