import {
    Box,
    Grid,
    Heading,
    HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
} from '@chakra-ui/react';
import React from 'react';

import { Ingredient } from '~/types/apiTypes';

type IngredientsListProps = {
    ingredients: Ingredient[];
    portions: number;
    initialPortions: number;
    handlePortionsChange: (valueString: string, valueNumber: number) => void;
};

export const IngredientsList: React.FC<IngredientsListProps> = ({
    ingredients,
    portions,
    initialPortions,
    handlePortionsChange,
}) => {
    const getNewCount = (ingredientCount: number) => (ingredientCount * portions) / initialPortions;

    return (
        <Box w={{ sm: '100%', md: '604px' }} mb={8} mx='auto'>
            <Heading size='md' mb={2}>
                <HStack justify='space-between'>
                    <Text textStyle='limeSmall' textTransform='uppercase' px={{ md: '6' }}>
                        Ингредиенты
                    </Text>
                    <HStack>
                        <Text textStyle='limeSmall' textTransform='uppercase' px={2}>
                            Порций
                        </Text>
                        <NumberInput
                            maxW={90}
                            min={1}
                            value={portions}
                            onChange={handlePortionsChange}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </HStack>
                </HStack>
            </Heading>
            <Grid templateColumns='1fr 1fr'>
                {ingredients.map((ingredient, index) => {
                    const newCount = getNewCount(Number(ingredient.count));
                    const bgColor = index % 2 === 0 ? 'blackAlpha.100' : 'white';

                    return (
                        <React.Fragment key={ingredient.title + index}>
                            <Box py={4} px={6} bg={bgColor}>
                                <Text color='colorBlack'>{ingredient.title}</Text>
                            </Box>
                            <Box py={4} px={6} bg={bgColor} textAlign='right'>
                                <Text color='colorBlack'>
                                    <span style={{ marginRight: '4px' }}>
                                        {ingredient.measureUnit === 'по вкусу' ? '' : newCount}
                                    </span>
                                    {ingredient.measureUnit}
                                </Text>
                            </Box>
                        </React.Fragment>
                    );
                })}
            </Grid>
        </Box>
    );
};
