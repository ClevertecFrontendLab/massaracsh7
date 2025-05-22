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

import { ROUTES_PATH } from '~/app/routes';
import bgImg from '~/assets/images/auth-side-image.jpg';
import logo from '~/assets/images/logo-auth.png';
import logoMini from '~/assets/images/logo-auth-mini.png';
import { setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

interface AuthLayoutProps {
    children: ReactNode;
    activeTab: 'login' | 'register';
}

const tabs = [
    { label: 'Вход на сайт', path: ROUTES_PATH.LOG_IN },
    { label: 'Регистрация', path: ROUTES_PATH.SIGN_IN },
];

export const AuthLayout = ({ children, activeTab }: AuthLayoutProps) => {
    const navigate = useNavigate();
    const tabIndex = activeTab === 'login' ? 0 : 1;
    const dispatch = useAppDispatch();

    const logoSrc = useBreakpointValue({
        base: logoMini,
        mid: logo,
    });

    useEffect(() => {
        dispatch(setAppLoader(false));
    }, [dispatch]);

    return (
        <Box pos='relative' w='100%'>
            <Flex minHeight='100dvh' w='100%'>
                <Center flex={1} bgGradient='linear(to-bl, #EAFFC7, #29813F 170%)'>
                    <Box
                        maxW={{ sm: '328px', md: '355px', lg: '451px', xl: '461px' }}
                        w='full'
                        textAlign='center'
                        pb='60px'
                    >
                        <Center mb={{ sm: '40px', md: '56px', lg: '80px', xl: '80px' }}>
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
                            <TabList w='100%' borderBottom='2px solid' borderColor='blackAlpha.200'>
                                {tabs.map((tab) => (
                                    <Tab
                                        key={tab.path}
                                        w='50%'
                                        cursor='pointer'
                                        px={6}
                                        py={3}
                                        fontWeight='500'
                                        fontSize={{
                                            base: '16px',
                                            md: '16px',
                                            lg: '18px',
                                            xl: '18px',
                                        }}
                                        lineHeight={{
                                            base: '24px',
                                            md: '24px',
                                            lg: '28px',
                                            xl: '28px',
                                        }}
                                        color='customLime.800'
                                        _selected={{
                                            color: 'customLime.700',
                                            borderBottom: '2px solid',
                                            borderColor: 'customLime.700',
                                        }}
                                    >
                                        {tab.label}
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
                        bgImage={bgImg}
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
