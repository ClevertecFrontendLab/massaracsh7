import { Badge, Box, Card, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';

import { BASE_IMG_URL } from '~/constants/constants';
import { RecipeStep } from '~/types/apiTypes';

type RecipeStepsProps = {
    steps: RecipeStep[];
};

export const RecipeStepsInfo: React.FC<RecipeStepsProps> = ({ steps }) => (
    <Box w={{ md: '604px' }} mb={8} mx='auto'>
        <Heading variant='pageTitle' textAlign='left' mb={5} fontWeight='500'>
            Шаги приготовления
        </Heading>
        <VStack spacing='18px'>
            {steps.map((step, index) => (
                <Card key={step.stepNumber} w='100%'>
                    <HStack gap={{ sm: 0, md: 2, lg: 4, xl: 4 }}>
                        {step.image && (
                            <Image
                                src={`${BASE_IMG_URL}${step.image}`}
                                alt={`Шаг ${step.stepNumber}`}
                                w={{ base: '158px', md: '158px', lg: '346px', xl: '346px' }}
                                h={{ base: '128px', md: '128px', lg: '244px', xl: '244px' }}
                                objectFit='cover'
                            />
                        )}
                        <Box
                            py={{ sm: '2px', md: '8px', lg: '22px', xl: '22px' }}
                            pl={
                                step.image
                                    ? '8px'
                                    : { base: '8px', md: '8px', lg: '24px', xl: '24px' }
                            }
                            pr='24px'
                            flex={step.image ? 'auto' : 1}
                        >
                            <Badge
                                variant={index === steps.length - 1 ? 'lime50' : 'gray06'}
                                mb='18px'
                                textTransform='capitalize'
                            >
                                Шаг {step.stepNumber}
                            </Badge>
                            <Text textStyle='cutText' sx={{ WebkitLineClamp: { sm: 4 } }}>
                                {step.description}
                            </Text>
                        </Box>
                    </HStack>
                </Card>
            ))}
        </VStack>
    </Box>
);
