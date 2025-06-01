import { DeleteIcon } from '@chakra-ui/icons';
import {
    Badge,
    Box,
    Button,
    Flex,
    FormControl,
    IconButton,
    Image,
    Stack,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import {
    FieldArrayWithId,
    FieldErrors,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    UseFormRegister,
} from 'react-hook-form';

import { ImagePlaceholder } from '~/assets/icons/icons';
import { CreateRecipeInput } from '~/components/RecipeForm/RecipeSchema';
import { BASE_IMG_URL, STEPS_HELPER } from '~/constants/constants';
import { TEST_IDS } from '~/constants/test-ids';

type RecipeStepsProps = {
    stepFields: FieldArrayWithId<CreateRecipeInput, 'steps', 'id'>[];
    register: UseFormRegister<CreateRecipeInput>;
    errors: FieldErrors<CreateRecipeInput>;
    appendStep: UseFieldArrayAppend<CreateRecipeInput, 'steps'>;
    removeStep: UseFieldArrayRemove;
    getValues: (name: string) => unknown;
    handleImageClick: (index: number) => void;
};

export const RecipeSteps: React.FC<RecipeStepsProps> = ({
    stepFields,
    register,
    errors,
    appendStep,
    removeStep,
    getValues,
    handleImageClick,
}) => (
    <Box mb={10}>
        <Text textStyle='formBoldText' mb={4}>
            {STEPS_HELPER}
        </Text>
        {stepFields.map((field, index) => (
            <Stack
                key={field.id}
                border='1px solid'
                borderColor='blackAlpha.200'
                borderRadius={12}
                mb={4}
                h={{ sm: 'auto', md: '180px', lg: '180px', xl: '180px' }}
                flexDir={{ sm: 'column', md: 'row', lg: 'row', xl: 'row' }}
            >
                <Box
                    h={{ sm: '160px', md: '100%', lg: '100%', xl: '100%' }}
                    w={{ sm: '328px', md: '346px', lg: '346px', xl: '346px' }}
                    bg='gray.100'
                    borderRadius='md'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    cursor='pointer'
                    onClick={() => handleImageClick(index)}
                    data-test-id={TEST_IDS.RECIPE_STEPS_IMAGE_BLOCK(index)}
                >
                    {getValues(`steps.${index}.image`) ? (
                        <Image
                            src={`${BASE_IMG_URL}${getValues(`steps.${index}.image`)}`}
                            alt={`Шаг ${index + 1}`}
                            objectFit='cover'
                            h='100%'
                            data-test-id={TEST_IDS.RECIPE_STEPS_IMAGE_PREVIEW_IMAGE(index)}
                        />
                    ) : (
                        <ImagePlaceholder w='32px' h='32px' />
                    )}
                </Box>

                <VStack p={5} gap={4} w={{ sm: '328px', md: '258px', lg: '312px', xl: '322px' }}>
                    <Flex justifyContent='space-between' alignItems='center' width='100%'>
                        <Badge variant='gray06' textTransform='capitalize' fontWeight='600'>
                            Шаг {index + 1}
                        </Badge>

                        {index !== 0 && (
                            <IconButton
                                aria-label='Удалить шаг'
                                icon={<DeleteIcon />}
                                colorScheme='customLime'
                                variant='ghost'
                                onClick={() => removeStep(index)}
                                data-test-id={TEST_IDS.RECIPE_STEPS_REMOVE_BUTTON(index)}
                                w='14px'
                                h='14px'
                            />
                        )}
                    </Flex>

                    <FormControl isInvalid={!!errors.steps?.[index]?.description}>
                        <Textarea
                            placeholder='Описание шага'
                            {...register(`steps.${index}.description` as const)}
                            data-test-id={TEST_IDS.RECIPE_STEPS_DESCRIPTION(index)}
                            fontSize='14px'
                            lineHeight='20px'
                            h={{ sm: 'auto', md: '104px', lg: '104px', xl: '104px' }}
                            _focus={{
                                borderColor: errors.steps?.[index]?.description
                                    ? 'red.500'
                                    : 'customLime.150',
                                boxShadow: errors.steps?.[index]?.description
                                    ? '0 0 0 1px red'
                                    : '0 0 0 1px customLime.150',
                            }}
                        />
                    </FormControl>
                </VStack>
            </Stack>
        ))}

        <Flex justifyContent='flex-end' mt={4}>
            <Button
                type='button'
                variant='outline'
                borderColor='black'
                onClick={() =>
                    appendStep({
                        stepNumber: stepFields.length + 1,
                        description: '',
                        image: null,
                    })
                }
                size='sm'
                rightIcon={<span style={{ fontWeight: 'bold', fontSize: '18px' }}>+</span>}
            >
                Новый шаг
            </Button>
        </Flex>
    </Box>
);
