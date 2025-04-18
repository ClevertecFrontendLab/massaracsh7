import {
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    Flex,
    Heading,
    HStack,
    Image,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router';

import CategoryBadge from '~/components/CategoryBadge/CategoryBadge';
import LikesInfo from '~/components/LikesInfo/LikesInfo';
import SliderList from '~/components/SliderList/SliderList';
import { authors } from '~/data/authors';
import { dishes } from '~/data/dishes';

const RecipePage = () => {
    const { id } = useParams();

    const recipe = dishes.find((item) => item.id === id);
    const author = authors[0];
    const [portions, setPortions] = useState(recipe?.portions ?? 1);

    return (
        <>
            <Box>
                <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
                    <Image
                        src={recipe?.image}
                        alt={recipe?.title}
                        objectFit='cover'
                        borderRadius='2xl'
                        maxW={{ md: '480px' }}
                    />
                    <Box flex='1'>
                        <HStack spacing={3} justify='space-between' align='center'>
                            {recipe?.category.map((catUrl) => (
                                <Badge
                                    variant='lime150'
                                    position={{
                                        base: 'static',
                                        sm: 'absolute',
                                        md: 'absolute',
                                        lg: 'static',
                                    }}
                                    top={{ sm: 2, md: 2 }}
                                    left={{ sm: 2, md: 2 }}
                                    p={{ sm: '0', md: '0' }}
                                >
                                    <CategoryBadge key={catUrl} categoryUrl={catUrl} />
                                </Badge>
                            ))}
                            <LikesInfo likes={recipe?.likes} comments={recipe?.bookmarks} />
                        </HStack>
                        <Heading variant='pageTitle'>{recipe?.title}</Heading>
                        <Text fontSize='sm' mt={2} mb={4}>
                            {recipe?.description}
                        </Text>
                        <HStack spacing={4}>
                            <Badge variant='gray06'>
                                <HStack
                                    gap={{ base: 0.5, md: 0.5, lg: 2 }}
                                    py='2px'
                                    px={{ sm: 1, md: 1, lg: 2, xl: 2 }}
                                >
                                    <Image src='/icons/BsAlarm.svg' alt='alarm' boxSize='16px' />
                                    <Text>{recipe?.time}</Text>
                                </HStack>
                            </Badge>
                            <Button
                                size='sm'
                                leftIcon={<Image src='/icons/BsBookmarkHeart.svg' boxSize='12px' />}
                                variant='outline'
                            >
                                Оценить рецепт
                            </Button>
                            <Button
                                size='sm'
                                leftIcon={
                                    <Image src='/icons/BsEmojiHeartEyes.svg' boxSize='12px' />
                                }
                                colorScheme='green'
                            >
                                Сохранить в закладки
                            </Button>
                        </HStack>
                    </Box>
                </Flex>
                <Text>* Калорийность на 1 порцию</Text>
                <Flex mt={8} justify='space-between' gap={4} wrap='wrap'>
                    {[
                        { label: 'ККАЛ', value: recipe?.nutritionValue.calories },
                        { label: 'БЕЛКИ', value: recipe?.nutritionValue.proteins },
                        { label: 'ЖИРЫ', value: recipe?.nutritionValue.fats },
                        { label: 'УГЛЕВОДЫ', value: recipe?.nutritionValue.carbohydrates },
                    ].map((item) => (
                        <Box
                            key={item.label}
                            p={4}
                            borderWidth='1px'
                            borderRadius='lg'
                            textAlign='center'
                            flex='1'
                            minW='100px'
                        >
                            <Text fontSize='2xl' fontWeight='bold'>
                                {item.value}
                            </Text>
                            <Text fontSize='sm' color='gray.500'>
                                {item.label}
                            </Text>
                        </Box>
                    ))}
                </Flex>

                <Box mt={12}>
                    <Heading size='md' mb={4}>
                        <HStack justify='space-between'>
                            <Text>Ингредиенты</Text>
                            <HStack>
                                <Text>Порций</Text>
                                <NumberInput
                                    size='sm'
                                    maxW={100}
                                    min={1}
                                    value={portions}
                                    onChange={(value) => setPortions(Number(value))}
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
                    <Box as='ul' pl={4}>
                        {recipe?.ingredients.map((ingredient, index) => (
                            <Flex
                                key={index}
                                justify='space-between'
                                borderBottom='1px solid #eee'
                                py={2}
                            >
                                <Text>{ingredient.title}</Text>
                                <Text color='gray.600'>
                                    {ingredient.count} {ingredient.measureUnit}
                                </Text>
                            </Flex>
                        ))}
                    </Box>
                </Box>

                <Box mt={12}>
                    <Heading size='md' mb={6}>
                        Шаги приготовления
                    </Heading>
                    <Stack spacing={6}>
                        {recipe?.steps.map((step, idx) => (
                            <Card>
                                <Flex key={idx} direction={{ base: 'column', md: 'row' }} gap={4}>
                                    {step.image && (
                                        <Image
                                            src={step.image}
                                            alt={`Шаг ${step.stepNumber}`}
                                            borderRadius='xl'
                                            w={{ base: '100%', md: '250px' }}
                                            h='auto'
                                            objectFit='cover'
                                        />
                                    )}
                                    <Box>
                                        <Text fontWeight='bold' mb={2}>
                                            Шаг {step.stepNumber}
                                        </Text>
                                        <Text fontSize='sm'>{step.description}</Text>
                                    </Box>
                                </Flex>
                            </Card>
                        ))}
                    </Stack>
                </Box>

                <Box mt={12} p={6} bg='customLime.300' borderRadius='xl'>
                    <HStack spacing={4}>
                        <Avatar
                            src={author.imageUrl}
                            name={author.name}
                            w={{ base: '32px', md: '32px', lg: '48px', xl: '48px' }}
                            h={{ base: '32px', md: '32px', lg: '48px', xl: '48px' }}
                        />
                        <Box>
                            <Text fontWeight='bold'>{author.name}</Text>
                            <Text>{author.username}</Text>
                            <Button
                                variant='blackSolid'
                                mt={1}
                                leftIcon={
                                    <Image
                                        src='/icons/followIcon.svg'
                                        alt='Подписаться'
                                        boxSize='16px'
                                    />
                                }
                            >
                                Подписаться
                            </Button>
                        </Box>
                        <HStack>
                            <Image src='/icons/people.svg' alt='numbers' boxSize='16px' />{' '}
                            <Text textStyle='limeSmall'>{author.numbers}</Text>
                        </HStack>
                    </HStack>
                </Box>
            </Box>
            <SliderList />
        </>
    );
};

export default RecipePage;
