import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tag,
    TagLabel,
    Text,
    useDisclosure,
    VStack,
    Wrap,
} from '@chakra-ui/react';

interface SearchableSelectProps {
    label: string;
    options: string[];
    selectedValues: string[];
    onChange: (selected: string[]) => void;
}

export const SearchableSelect = ({
    label,
    options,
    selectedValues,
    onChange,
}: SearchableSelectProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleToggle = (value: string) => {
        if (selectedValues.includes(value)) {
            onChange(selectedValues.filter((v) => v !== value));
        } else {
            onChange([...selectedValues, value]);
        }
    };

    return (
        <Box>
            <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose} closeOnSelect={false}>
                <MenuButton
                    as={Button}
                    rightIcon={
                        <ChevronDownIcon
                            boxSize='20px'
                            transition='transform 0.2s'
                            transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
                        />
                    }
                    variant='outline'
                    w={{ sm: '308px', md: '308px', mid: '308px', lg: '390px', xl: '390px' }}
                    fontSize='16px'
                    fontWeight='400'
                    lineHeight='24px'
                    color='secondaryText'
                    py={4}
                    pr={2}
                    _hover={{ bg: 'white' }}
                    _expanded={{ bg: 'white' }}
                    data-test-id={label === 'Категория' ? 'filter-menu-button-категория' : ''}
                >
                    {selectedValues.length > 0 ? (
                        <Wrap spacing={2}>
                            {selectedValues.map((item) => (
                                <Tag
                                    size='sm'
                                    key={item}
                                    borderRadius='6px'
                                    bg='white'
                                    border='1px solid'
                                    borderColor='customLime.400'
                                >
                                    <TagLabel color='customLime.600'>{item}</TagLabel>
                                </Tag>
                            ))}
                        </Wrap>
                    ) : (
                        <Text textAlign='left'>{label}</Text>
                    )}
                </MenuButton>
                <MenuList
                    p={0}
                    zIndex='11'
                    w={{ sm: '308px', md: '308px', mid: '308px', lg: '390px', xl: '390px' }}
                >
                    <VStack align='stretch' spacing={1}>
                        {options.map((option, index) => (
                            <MenuItem
                                key={option}
                                p={0}
                                w='100%'
                                bg={index % 2 === 0 ? 'blackAlpha.100' : 'white'}
                            >
                                <Checkbox
                                    isChecked={selectedValues.includes(option)}
                                    onChange={() => handleToggle(option)}
                                    p={2}
                                    w='100%'
                                    data-test-id={
                                        option === 'Веганская кухня'
                                            ? 'checkbox-веганская кухня'
                                            : ''
                                    }
                                >
                                    {option}
                                </Checkbox>
                            </MenuItem>
                        ))}
                    </VStack>
                </MenuList>
            </Menu>
        </Box>
    );
};
