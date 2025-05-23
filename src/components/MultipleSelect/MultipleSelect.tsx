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
    Text,
    useDisclosure,
    Wrap,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TEST_IDS } from '~/constants/test-ids';
import { allergens } from '~/data/allergens';
import { selectSelectedAllergens, setSelectedAllergens } from '~/store/filter-slice';
import { useAppSelector } from '~/store/hooks';

interface MultipleSelectProps {
    width: ResponsiveValue<string>;
    sourse?: string;
    isDisabled?: boolean;
}

export const MultipleSelect = ({ width, sourse, isDisabled }: MultipleSelectProps) => {
    const dispatch = useDispatch();
    const selected = useAppSelector(selectSelectedAllergens);
    const [newAllergen, setNewAllergen] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSelect = (value: string) => {
        const updated = selected.includes(value)
            ? selected.filter((item) => item !== value)
            : [...selected, value];

        dispatch(setSelectedAllergens(updated));
    };

    const handleAddCustom = () => {
        const trimmed = newAllergen.trim();
        if (trimmed && !selected.includes(trimmed)) {
            dispatch(setSelectedAllergens([...selected, trimmed]));
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
                lineHeight='24px'
                color='secondaryText'
                borderColor='customLime.300'
                bg='white'
                py='10px'
                px='10px'
                whiteSpace='normal'
                _hover={{ bg: 'white' }}
                _expanded={{ bg: 'white' }}
                height='auto'
                isDisabled={isDisabled}
                data-test-id={
                    sourse === 'drawer' ? TEST_IDS.ALLERGEN_BUTTON_FILTER : TEST_IDS.ALLERGEN_BUTTON
                }
                sx={{
                    pointerEvents: isDisabled ? 'none' : 'auto',
                }}
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
                    <Text isTruncated>Выберите из списка аллергенов</Text>
                )}
            </MenuButton>

            <MenuList
                borderRadius='6px'
                zIndex='11'
                w={width}
                data-test-id={TEST_IDS.ALLERGEN_MENU}
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
                        ref={inputRef}
                        placeholder='Другой аллерген'
                        size='md'
                        mr={2}
                        value={newAllergen}
                        onChange={(e) => setNewAllergen(e.target.value)}
                        borderColor='blackAlpha.200'
                        focusBorderColor='blackAlpha.200'
                        _hover={{ borderColor: 'blackAlpha.200' }}
                        data-test-id={TEST_IDS.ADD_OTHER_ALLERGEN}
                        autoFocus={true}
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
                        data-test-id={TEST_IDS.ADD_ALLERGEN_BUTTON}
                        isDisabled={isDisabled}
                        sx={{ pointerEvents: isDisabled ? 'none' : 'auto' }}
                    />
                </Box>
            </MenuList>
        </Menu>
    );
};
