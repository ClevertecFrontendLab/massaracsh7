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
    <Box width='518px' mx='auto' mb={14}>
        <HStack spacing={4} w='100%' mb={4}>
            <IconButton
                aria-label='Настройки поиска'
                icon={<HamburgerIcon />}
                variant='outline'
                colorScheme='gray'
                w={12}
            />
            <InputGroup w='100%'>
                <Input
                    placeholder='Название или ингредиент...'
                    variant='outline'
                    bg='white'
                    borderRadius='md'
                    pr={4}
                    py='13px'
                    fontSize='xlg'
                    lineHeight='22px'
                    color='customLime.800'
                    _placeholder={{ color: 'customLime.800' }}
                    height='48px'
                />
                <InputRightElement>
                    <IconButton
                        aria-label='Поиск'
                        icon={<SearchIcon boxSize='18px' />}
                        variant='ghost'
                        size='sm'
                        p={2}
                    />
                </InputRightElement>
            </InputGroup>
        </HStack>
        <HStack spacing={4} w='100%' mb={6}>
            <HStack spacing={3} py={1.5} pr='6px'>
                <Text fontSize='16px' fontWeight='500' lineHeight='24px'>
                    Исключить мои аллергены
                </Text>
                <Switch size='md' />
            </HStack>
            <MultipleSelect />
        </HStack>
    </Box>
);

export default SearchBar;
