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
    TagLabel,
    useDisclosure,
    Wrap,
} from '@chakra-ui/react';
import { useState } from 'react';

import { allergens } from '~/data/allergens';

interface MultipleSelectProps {
    selected: string[];
    onChange: (selected: string[]) => void;
}

const MultipleSelect = ({ selected, onChange }: MultipleSelectProps) => {
    const [newAllergen, setNewAllergen] = useState<string>('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSelect = (value: string) => {
        const newSelected = selected.includes(value)
            ? selected.filter((item) => item !== value)
            : [...selected, value];
        onChange(newSelected);
    };

    // const handleRemove = (value: string) => {
    //     onChange(selected.filter((item) => item !== value));
    // };

    const handleAddCustom = () => {
        if (newAllergen && !selected.includes(newAllergen)) {
            onChange([...selected, newAllergen]);
            setNewAllergen('');
        }
    };

    return (
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
                w='234px'
                fontSize='16px'
                fontWeight='400'
                lineHeight='24px'
                color='secondaryText'
                py={4}
                pr={2}
            >
                {selected.length > 0 ? (
                    <Wrap spacing={2}>
                        {selected.map((item) => (
                            <Tag size='sm' key={item} borderRadius='full' variant='solid'>
                                <TagLabel>{item}</TagLabel>
                            </Tag>
                        ))}
                    </Wrap>
                ) : (
                    'Выберите из списка...'
                )}
            </MenuButton>
            <MenuList maxH='300px' overflowY='auto' p={3} zIndex='11'>
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
                    />
                </Box>
            </MenuList>
        </Menu>
    );
};

export default MultipleSelect;
