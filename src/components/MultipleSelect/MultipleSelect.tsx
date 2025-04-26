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
    ResponsiveValue,
    Tag,
    TagLabel,
    useDisclosure,
    Wrap,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { allergens } from '~/data/allergens';
import { ApplicationState } from '~/store/configure-store';
import { setSelectedAllergens } from '~/store/filter-slice';

interface MultipleSelectProps {
    width: ResponsiveValue<string>;
    sourse?: string;
}

const MultipleSelect = ({ width, sourse }: MultipleSelectProps) => {
    const dispatch = useDispatch();
    const selected = useSelector((state: ApplicationState) => state.filters.selectedAllergens);
    const [newAllergen, setNewAllergen] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSelect = (value: string) => {
        const updated = selected.includes(value)
            ? selected.filter((item) => item !== value)
            : [...selected, value];

        dispatch(setSelectedAllergens(updated));
    };

    const handleAddCustom = () => {
        if (newAllergen.trim() && !selected.includes(newAllergen.trim())) {
            dispatch(setSelectedAllergens([...selected, newAllergen.trim()]));
            setNewAllergen('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddCustom();
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
                w={width}
                fontSize='16px'
                fontWeight='400'
                lineHeight='1.5'
                color='secondaryText'
                borderColor='customLime.300'
                bg='white'
                py='10px'
                pr={2}
                whiteSpace='normal'
                _hover={{ bg: 'white' }}
                _expanded={{ bg: 'white' }}
                height='auto'
                data-test-id={
                    sourse === 'drawer' ? 'allergens-menu-button-filter' : 'allergens-menu-button'
                }
            >
                {selected.length > 0 ? (
                    <Wrap spacing={2}>
                        {selected.map((item) => (
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
                    'Выберите из списка...'
                )}
            </MenuButton>

            <MenuList
                maxH='300px'
                overflowY='auto'
                borderRadius='6px'
                zIndex='11'
                w={width}
                data-test-id='allergens-menu'
            >
                {allergens.map((option, index) => (
                    <MenuItem
                        key={option.value}
                        p={0}
                        bg={index % 2 === 0 ? 'blackAlpha.100' : 'white'}
                    >
                        <Checkbox
                            isChecked={selected.includes(option.label)}
                            onChange={() => handleSelect(option.label)}
                            p={2}
                            w='100%'
                            data-test-id={`allergen-${index}`}
                        >
                            {option.label}
                        </Checkbox>
                    </MenuItem>
                ))}

                <Box display='flex' alignItems='center' p={2}>
                    <Input
                        placeholder='Другой аллерген'
                        size='md'
                        mr={2}
                        value={newAllergen}
                        onChange={(e) => setNewAllergen(e.target.value)}
                        borderColor='blackAlpha.200'
                        focusBorderColor='blackAlpha.200'
                        _hover={{ borderColor: 'blackAlpha.200' }}
                        data-test-id='add-other-allergen'
                        onKeyDown={handleKeyDown}
                    />
                    <IconButton
                        size='12px'
                        p='4px'
                        icon={<AddIcon boxSize='8px' />}
                        onClick={handleAddCustom}
                        bg='customLime.600'
                        color='white'
                        borderRadius='50%'
                        aria-label='Добавить аллерген'
                        data-test-id='add-allergen-button'
                    />
                </Box>
            </MenuList>
        </Menu>
    );
};

export default MultipleSelect;
