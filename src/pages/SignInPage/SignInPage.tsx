import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react';

import authImage from '~/assets/auth-side-image.jpg';
import { RegistrationForm } from '~/components/RegistrationForm/RegistrationForm';

export const SignInPage = () => (
    <Flex height='100vh' overflow='hidden'>
        <Flex
            w='50%'
            direction='column'
            justify='space-between'
            px={{ base: 6, md: 12 }}
            py={8}
            bg='white'
        >
            <Box>
                <Text fontSize='2xl' fontWeight='bold' mb={4}>
                    Вход / Регистрация
                </Text>
                <RegistrationForm />
            </Box>

            <HStack justify='space-between' fontSize='sm' color='gray.500'>
                <Text>Все права защищены, ученический файл, ©Клевер Технолоджи, 2025</Text>
                <Text textDecoration='line-through'>Лучший сервис для ваших кулинарных побед</Text>
            </HStack>
        </Flex>

        <Box w='50%' height='100vh' position='relative'>
            <Image
                src={authImage}
                alt='Вдохновляющее изображение'
                objectFit='cover'
                w='100%'
                h='100%'
            />
        </Box>
    </Flex>
);
