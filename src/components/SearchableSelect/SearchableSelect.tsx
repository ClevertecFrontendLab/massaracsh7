// components/SearchableSelect.tsx
import {
    Box,
    Checkbox,
    Input,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';

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
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOptions = useMemo(
        () => options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase())),
        [options, searchTerm],
    );

    const handleToggle = (value: string) => {
        if (selectedValues.includes(value)) {
            onChange(selectedValues.filter((v) => v !== value));
        } else {
            onChange([...selectedValues, value]);
        }
    };

    const handleRemove = (value: string) => {
        onChange(selectedValues.filter((v) => v !== value));
    };

    return (
        <Box>
            <Text mb={2} fontWeight='bold'>
                {label}
            </Text>
            <Input
                placeholder='Поиск...'
                size='sm'
                mb={2}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <VStack
                spacing={1}
                maxHeight='150px'
                overflowY='auto'
                border='1px solid'
                borderColor='gray.200'
                borderRadius='md'
                p={2}
                mb={2}
                align='start'
            >
                {filteredOptions.map((option, index) => (
                    <Checkbox
                        key={index}
                        isChecked={selectedValues.includes(option)}
                        onChange={() => handleToggle(option)}
                    >
                        {option}
                    </Checkbox>
                ))}
            </VStack>
            <Wrap>
                {selectedValues.map((value) => {
                    const label = options.find((opt) => opt === value) || value;
                    return (
                        <WrapItem key={value}>
                            <Tag size='sm' borderRadius='full' variant='solid' colorScheme='green'>
                                <TagLabel>{label}</TagLabel>
                                <TagCloseButton onClick={() => handleRemove(value)} />
                            </Tag>
                        </WrapItem>
                    );
                })}
            </Wrap>
        </Box>
    );
};
