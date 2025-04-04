import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tag,
    TagCloseButton,
    TagLabel,
    VStack,
    Wrap,
} from '@chakra-ui/react';
import React, { useState } from 'react';

// Тип данных для аллергена
type Option = {
    value: string;
    label: string;
};

// Данные аллергии
const allergens: Option[] = [
    { value: 'dairy', label: 'Молочные продукты' },
    { value: 'eggs', label: 'Яйцо' },
    { value: 'fish', label: 'Рыба' },
    { value: 'mollusks', label: 'Моллюски' },
    { value: 'nuts', label: 'Орехи' },
    { value: 'tomato', label: 'Томат (помидор)' },
    { value: 'citrus', label: 'Цитрусовые' },
    { value: 'strawberry', label: 'Клубника (ягоды)' },
    { value: 'chocolate', label: 'Шоколад' },
];

const MultipleSelect = () => {
    const [selected, setSelected] = useState<string[]>([]);
    const [newAllergen, setNewAllergen] = useState<string>('');

    const handleSelect = (value: string) => {
        setSelected((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
        );
    };

    const handleRemove = (value: string) => {
        setSelected((prev) => prev.filter((item) => item !== value));
    };

    const handleAddCustom = () => {
        if (newAllergen && !selected.includes(newAllergen)) {
            setSelected((prev) => [...prev, newAllergen]);
            setNewAllergen('');
        }
    };

    return (
        <VStack align='start' spacing={2} w='100%'>
            <Box
                w='100%'
                bg='white'
                p={2}
                borderRadius='md'
                borderWidth='1px'
                borderColor='green.400'
            >
                <Wrap>
                    {selected.map((item) => (
                        <Tag
                            size='md'
                            key={item}
                            borderRadius='full'
                            variant='solid'
                            colorScheme='green'
                            mr={1}
                            mb={1}
                        >
                            <TagLabel>{item}</TagLabel>
                            <TagCloseButton onClick={() => handleRemove(item)} />
                        </Tag>
                    ))}
                </Wrap>
                {selected.length === 0 && <Box color='gray.500'>Выберите из списка...</Box>}
            </Box>

            <Menu closeOnSelect={false}>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    variant='outline'
                    colorScheme='green'
                    w='100%'
                >
                    Выберите из списка...
                </MenuButton>
                <MenuList maxH='250px' overflowY='auto' borderColor='green.400'>
                    {allergens.map((option) => (
                        <MenuItem key={option.value} p={0}>
                            <Checkbox
                                isChecked={selected.includes(option.label)}
                                onChange={() => handleSelect(option.label)}
                                p={2}
                                w='100%'
                            >
                                {option.label}
                            </Checkbox>
                        </MenuItem>
                    ))}
                    <Box p={2} display='flex' alignItems='center'>
                        <Input
                            placeholder='Другой аллерген'
                            size='sm'
                            mr={2}
                            value={newAllergen}
                            onChange={(e) => setNewAllergen(e.target.value)}
                        />
                        <IconButton
                            size='sm'
                            icon={<AddIcon />}
                            onClick={handleAddCustom}
                            aria-label='Добавить аллерген'
                            colorScheme='green'
                        />
                    </Box>
                </MenuList>
            </Menu>
        </VStack>
    );
};

export default MultipleSelect;
