import { Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';

type NutritionValue = {
    calories: number;
    protein: number;
    fats: number;
    carbohydrates: number;
};

type NutritionInfoProps = {
    nutritionValue: NutritionValue;
};

export const NutritionInfo: React.FC<NutritionInfoProps> = ({ nutritionValue }) => {
    const items = [
        { label: 'калорийность', value: nutritionValue?.calories, unit: 'ККАЛ' },
        { label: 'белки', value: nutritionValue?.protein, unit: 'ГРАММ' },
        { label: 'жиры', value: nutritionValue?.fats, unit: 'ГРАММ' },
        { label: 'углеводы', value: nutritionValue?.carbohydrates, unit: 'ГРАММ' },
    ];

    return (
        <VStack
            maxW={{ sm: '100%', md: '100%', lg: '668px', xl: '668px' }}
            mx='auto'
            pt={{ sm: 6, md: 6, lg: 10, xl: 10 }}
            alignItems='left'
        >
            <Text color='darkText' mb='12px'>
                * Калорийность на 1 порцию
            </Text>
            <Flex
                flexDirection={{ sm: 'column', md: 'row' }}
                justify='space-between'
                gap={4}
                mb={{ sm: '6', md: '10', lg: '10', xl: '10' }}
            >
                {items.map((item) => (
                    <Stack
                        key={item.label}
                        p={4}
                        flexDirection={{ sm: 'row', md: 'column' }}
                        spacing={3}
                        borderWidth='1px'
                        borderColor='rgba(0, 0, 0, 0.08)'
                        borderRadius='xlarge'
                        align='center'
                        flex='1'
                        width={{ sm: '100%', md: '117px' }}
                    >
                        <Text color='secondaryText' flex={{ sm: 2, md: 1 }}>
                            {item.label}
                        </Text>
                        <Heading
                            variant='sectionBlogTitle'
                            fontWeight='600'
                            color='customLime.800'
                            fontSize={{ base: '36px', sm: '24px', smPlus: '24px', md: '36px' }}
                            lineHeight={{ base: '40px', sm: '32px', smPlus: '32px', md: '40px' }}
                            flex={{ sm: 2, md: 1 }}
                            textAlign={{ sm: 'center', md: 'left' }}
                        >
                            {item.value}
                        </Heading>
                        <Text fontWeight='bold' color='rgba(0, 0, 0, 0.92)' flex={{ sm: 1, md: 1 }}>
                            {item.unit}
                        </Text>
                    </Stack>
                ))}
            </Flex>
        </VStack>
    );
};
