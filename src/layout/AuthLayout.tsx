import {
    Box,
    Center,
    Flex,
    Hide,
    HStack,
    Image,
    Tab,
    TabList,
    Tabs,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

interface AuthLayoutProps {
    children: ReactNode;
    activeTab: 'login' | 'register';
}

const tabs = [
    { label: 'Вход на сайт', path: '/login' },
    { label: 'Регистрация', path: '/signin' },
];

export const AuthLayout = ({ children, activeTab }: AuthLayoutProps) => {
    const navigate = useNavigate();
    const tabIndex = activeTab === 'login' ? 0 : 1;
    const dispatch = useAppDispatch();

    const logoSrc = useBreakpointValue({
        base: './images/logo-auth-mini.png',
        md: './images/logo-auth.png',
    });

    useEffect(() => {
        dispatch(setAppLoader(false));
    }, [dispatch]);

    return (
        <Box pos='relative' w='100%'>
            <Flex minHeight='100dvh' w='100%'>
                <Center flex={1} pb='75px' bgGradient='linear(to-bl, #EAFFC7, #29813F 170%)'>
                    <Box py={12} maxW={{ base: 387, md: 493 }} w='full' px={4}>
                        <Center mb={{ base: 16, md: 20 }}>
                            <Image src={logoSrc} alt='Логотип' />
                        </Center>

                        <Tabs
                            variant='unstyled'
                            size='lg'
                            mb={10}
                            isFitted
                            index={tabIndex}
                            onChange={(index) => navigate(tabs[index].path)}
                        >
                            <TabList w='100%'>
                                {tabs.map((tab, index) => (
                                    <Tab
                                        key={tab.path}
                                        w='50%'
                                        cursor='pointer'
                                        px={6}
                                        py={3}
                                        _selected={{
                                            color: 'customLime.600',
                                            borderBottom: '2px solid',
                                            borderColor: 'customLime.600',
                                        }}
                                        color={
                                            tabIndex === index ? 'customLime.600' : 'customLime.800'
                                        }
                                        borderBottom={
                                            tabIndex === index ? '2px solid' : '1px solid'
                                        }
                                        borderColor={
                                            tabIndex === index ? 'customLime.600' : 'blackAlpha.200'
                                        }
                                    >
                                        <Text variant='name-text'>{tab.label}</Text>
                                    </Tab>
                                ))}
                            </TabList>
                        </Tabs>

                        {children}
                    </Box>
                </Center>

                <Hide below='mid'>
                    <Box
                        maxW='50.5%'
                        w='full'
                        bgImage='./images/auth-side-image.jpg'
                        bgRepeat='no-repeat'
                        bgPosition='50% 50%'
                        bgSize='cover'
                    />
                </Hide>
            </Flex>

            <Box as='footer' p={{ base: 4, sm: 6 }} pos='absolute' bottom={0} w='full'>
                <HStack spacing={4} justify='space-between'>
                    <Box>
                        <Text fontSize='sm' fontWeight='600'>
                            Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
                        </Text>
                    </Box>
                    <Box display={{ base: 'none', lg: 'block' }}>
                        <Text fontSize='sm' fontWeight='600'>
                            Лучший сервис для ваших кулинарных побед
                        </Text>
                    </Box>
                </HStack>
            </Box>
        </Box>
    );
};
