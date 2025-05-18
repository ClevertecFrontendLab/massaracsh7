import { Box, Flex, HStack, Image, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

interface AuthLayoutProps {
    children: ReactNode;
    activeTab: 'login' | 'register';
}

export const AuthLayout = ({ children, activeTab }: AuthLayoutProps) => {
    const navigate = useNavigate();
    const tabIndex = activeTab === 'login' ? 0 : 1;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setAppLoader(false));
    }, [dispatch]);
    return (
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
                    <Tabs
                        index={tabIndex}
                        onChange={(index) => {
                            if (index === 0) navigate('/login');
                            else navigate('/signin');
                        }}
                        variant='unstyled'
                        mb={6}
                    >
                        <TabList>
                            <Tab
                                fontSize='2xl'
                                fontWeight='bold'
                                color={tabIndex === 0 ? 'blue.500' : 'gray.500'}
                                _hover={{ color: 'blue.400' }}
                            >
                                Вход на сайт
                            </Tab>
                            <Tab
                                fontSize='2xl'
                                fontWeight='bold'
                                color={tabIndex === 1 ? 'blue.500' : 'gray.500'}
                                _hover={{ color: 'blue.400' }}
                            >
                                Регистрация
                            </Tab>
                        </TabList>
                    </Tabs>
                    {children}
                </Box>

                <HStack justify='space-between' fontSize='sm' color='gray.500'>
                    <Text>Все права защищены, ученический файл, ©Клевер Технолоджи, 2025</Text>
                    <Text textDecoration='line-through'>
                        Лучший сервис для ваших кулинарных побед
                    </Text>
                </HStack>
            </Flex>

            <Box w='50%' height='100vh' position='relative'>
                <Image
                    src='/images/auth-side-image.jpg'
                    alt='изображение'
                    objectFit='cover'
                    w='100%'
                    h='100%'
                />
            </Box>
        </Flex>
    );
};
