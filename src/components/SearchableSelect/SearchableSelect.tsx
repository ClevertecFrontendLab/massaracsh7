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
            <Text mb={2} fontWeight='bold'>
                {label}
            </Text>
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
                    w='100%'
                    fontSize='16px'
                    fontWeight='400'
                    lineHeight='24px'
                    color='secondaryText'
                    py={4}
                    pr={2}
                >
                    {selectedValues.length > 0 ? (
                        <Wrap spacing={2}>
                            {selectedValues.map((item) => (
                                <Tag size='sm' key={item} borderRadius='full' variant='solid'>
                                    <TagLabel>{item}</TagLabel>
                                </Tag>
                            ))}
                        </Wrap>
                    ) : (
                        'Выберите из списка...'
                    )}
                </MenuButton>
                <MenuList maxH='300px' overflowY='auto' p={3} zIndex='11' w='100%'>
                    <VStack align='start' spacing={1}>
                        {options.map((option) => (
                            <MenuItem key={option} p={0} w='100%'>
                                <Checkbox
                                    isChecked={selectedValues.includes(option)}
                                    onChange={() => handleToggle(option)}
                                    p={2}
                                    w='100%'
                                >
                                    {option}
                                </Checkbox>
                            </MenuItem>
                        ))}
                    </VStack>
                </MenuList>
            </Menu>

            {/* {selectedValues.length > 0 && (
                <Wrap mt={2}>
                    {selectedValues.map((value) => {
                        const label = options.find((opt) => opt === value) || value;
                        return (
                            <WrapItem key={value}>
                                <Tag
                                    size='sm'
                                    borderRadius='full'
                                    variant='solid'
                                    colorScheme='green'
                                >
                                    <TagLabel>{label}</TagLabel>
                                    <TagCloseButton onClick={() => handleRemove(value)} />
                                </Tag>
                            </WrapItem>
                        );
                    })}
                </Wrap>
            )} */}
        </Box>
    );
};
