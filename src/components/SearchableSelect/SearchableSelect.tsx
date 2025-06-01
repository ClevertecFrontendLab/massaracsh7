import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tag,
    TagLabel,
    Text,
    useBreakpointValue,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';

import { TEST_IDS } from '~/constants/test-ids';

type SearchableSelectProps = {
    label: string;
    options: string[];
    selectedValues: string[];
    onChange: (selected: string[]) => void;
    dataId?: string;
    error?: boolean;
};

export const SearchableSelect = ({
    label,
    options,
    selectedValues,
    onChange,
    dataId,
    error,
}: SearchableSelectProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleToggle = (value: string) => {
        if (selectedValues.includes(value)) {
            onChange(selectedValues.filter((v) => v !== value));
        } else {
            onChange([...selectedValues, value]);
        }
    };

    const isMobile = useBreakpointValue({ base: true, sm: true, md: true, lg: false, xl: false });

    const visibleTags =
        isMobile && dataId === TEST_IDS.RECIPE_CATEGORIES
            ? selectedValues.slice(0, 1)
            : dataId === TEST_IDS.RECIPE_CATEGORIES
              ? selectedValues.slice(0, 2)
              : selectedValues;

    const hiddenCount =
        isMobile && dataId === TEST_IDS.RECIPE_CATEGORIES
            ? selectedValues.length - 1
            : dataId === TEST_IDS.RECIPE_CATEGORIES
              ? selectedValues.length - 2
              : 0;
    const noWrap = isMobile && dataId === TEST_IDS.RECIPE_CATEGORIES;

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
                    w={
                        dataId === TEST_IDS.RECIPE_CATEGORIES
                            ? { sm: '100%', md: '100%', mid: '250px', lg: '350px', xl: '350px' }
                            : { sm: '308px', md: '308px', mid: '308px', lg: '390px', xl: '390px' }
                    }
                    fontSize='16px'
                    fontWeight='400'
                    lineHeight='24px'
                    color='secondaryText'
                    py={4}
                    pr={2}
                    _hover={{ bg: 'white' }}
                    _expanded={{ bg: 'white' }}
                    data-test-id={dataId}
                    border={error ? '1px solid' : '1px solid'}
                    borderColor={error ? 'red.500' : 'gray.200'}
                >
                    {selectedValues.length > 0 ? (
                        <Flex
                            wrap={noWrap ? 'nowrap' : 'wrap'}
                            direction='row'
                            gap='8px'
                            overflowX={noWrap ? 'auto' : 'visible'}
                        >
                            {visibleTags.map((item) => (
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

                            {hiddenCount > 0 && (
                                <Tag
                                    size='sm'
                                    borderRadius='6px'
                                    bg='white'
                                    border='1px solid'
                                    borderColor='customLime.400'
                                >
                                    <TagLabel color='customLime.600'>+{hiddenCount}</TagLabel>
                                </Tag>
                            )}
                        </Flex>
                    ) : (
                        <Text textAlign='left'>{label}</Text>
                    )}
                </MenuButton>
                <MenuList
                    p={0}
                    zIndex='11'
                    w={{ sm: '308px', md: '308px', mid: '308px', lg: '390px', xl: '390px' }}
                    maxH='250px'
                    overflowY='auto'
                >
                    <VStack align='stretch' spacing={1}>
                        {options.map((option, index) => (
                            <MenuItem
                                key={`${option}-${index}`}
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
                                        option === 'Веганская кухня' ? TEST_IDS.VEGAN_CHECKBOX : ''
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
