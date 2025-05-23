import { Flex, HStack, IconButton, Image, Link, Text } from '@chakra-ui/react';

import leftIcon from '~/assets/icons/left-icon.svg';
import { TEST_IDS } from '~/constants/test-ids';

export const NavigationFooter = () => (
    <Flex
        px={6}
        mt='auto'
        justifyContent='flex-start'
        fontSize='sm'
        lineHeight='short'
        direction='column'
        gap={4}
        as='footer'
        data-test-id={TEST_IDS.FOOTER}
    >
        <Text fontWeight='500' color='lightText'>
            Версия программы 03.25
        </Text>
        <Text color='secondaryText'>
            Все права защищены, ученический файл,
            <br />
            ©Клевер Технолоджи, 2025
        </Text>
        <HStack spacing={1.5} align='center'>
            <IconButton
                aria-label='Выйти'
                icon={<Image src={leftIcon} alt='Exit' boxSize='12px' />}
                variant='ghost'
                size='sm'
            />
            <Link fontWeight='600'>Выйти</Link>
        </HStack>
    </Flex>
);
