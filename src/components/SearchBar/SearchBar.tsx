import {
    Box,
    Hide,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Switch,
    Text,
} from '@chakra-ui/react';

import { FilterIcon, SearchGlass } from '~/assets/icons/icons';
import MultipleSelect from '~/components/MultipleSelect/MultipleSelect';

interface SearchProps {
    bottom?: string;
}

const SearchBar = ({ bottom = '56px' }: SearchProps) => (
    <Box
        width={{ base: '100%', sm: '328px', md: '448px', lg: '518px' }}
        mb={{ sm: '32px', md: '32px', lg: bottom, xl: bottom }}
        mx='auto'
    >
        <HStack spacing={{ base: 3, sm: 3, md: 3, lg: 4 }} w='100%' mb={4}>
            <IconButton
                aria-label='Настройки поиска'
                icon={<FilterIcon boxSize={{ base: '12px', md: '12px', lg: '18px' }} />}
                variant='outline'
                colorScheme='gray'
                w={{ base: 8, sm: 8, md: 8, lg: 12 }}
                minW={{ base: 8, sm: 8, md: 8, lg: 12 }}
                h={{ base: 8, sm: 8, md: 8, lg: 12 }}
            />
            <InputGroup w='100%'>
                <Input
                    placeholder='Название или ингредиент...'
                    variant='outline'
                    bg='white'
                    borderRadius='md'
                    pr={{ md: 6, lg: 4 }}
                    pl='12px'
                    py='13px'
                    fontSize={{ md: '14px', lg: '18px' }}
                    lineHeight={{ md: '17px', lg: '22px' }}
                    color='customLime.800'
                    _placeholder={{ color: 'customLime.800' }}
                    height={{ base: 8, sm: 8, md: 8, lg: 12 }}
                />
                <InputRightElement
                    alignItems={{
                        base: 'flex-start',
                        sm: 'flex-start',
                        md: 'flex-start',
                        lg: 'flex-end',
                    }}
                >
                    <IconButton
                        aria-label='Поиск'
                        icon={<SearchGlass boxSize={{ md: '14px', lg: '18px' }} />}
                        variant='ghost'
                        size='sm'
                        p={2}
                    />
                </InputRightElement>
            </InputGroup>
        </HStack>
        <Hide below='md'>
            <HStack spacing='15px' w='100%' mb={6}>
                <HStack spacing={3} py={1.5} pl={2}>
                    <Text textStyle='descriptionText'>Исключить мои аллергены</Text>
                    <Switch size='md' />
                </HStack>
                <MultipleSelect />
            </HStack>
        </Hide>
    </Box>
);

export default SearchBar;
