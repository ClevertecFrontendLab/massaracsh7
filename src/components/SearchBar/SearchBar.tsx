import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import {
    Box,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Switch,
    Text,
} from '@chakra-ui/react';

import MultipleSelect from '~/components/MultipleSelect/MultipleSelect';

const SearchBar = () => (
    <Box width='518px' mx='auto'>
        <HStack spacing={4} w='100%' mb={6}>
            <IconButton
                aria-label='Настройки поиска'
                icon={<HamburgerIcon />}
                variant='outline'
                colorScheme='gray'
            />
            <InputGroup>
                <Input
                    placeholder='Название или ингредиент...'
                    variant='outline'
                    bg='white'
                    borderRadius='md'
                    pr='3rem'
                />
                <InputRightElement>
                    <IconButton
                        aria-label='Поиск'
                        icon={<SearchIcon />}
                        variant='ghost'
                        size='sm'
                        p={2}
                    />
                </InputRightElement>
            </InputGroup>
        </HStack>
        <HStack spacing={4} w='100%' mb={6}>
            <HStack spacing={2}>
                <Switch size='md' />
                <Text>Исключить мои аллергены</Text>
            </HStack>
            <MultipleSelect />
        </HStack>
    </Box>
);

export default SearchBar;
