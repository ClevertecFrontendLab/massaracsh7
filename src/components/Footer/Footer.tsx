import { Avatar, Box, Button, Flex, Image, Text } from '@chakra-ui/react';

import house from '~/assets/icons/house.svg';
import { SearchGlass } from '~/assets/icons/icons';
import penNout from '~/assets/icons/pen-nout.svg';
import { TEST_IDS } from '~/constants/test-ids';

export const Footer = () => (
    <Box
        as='footer'
        position='fixed'
        bottom={0}
        left={0}
        right={0}
        height='84px'
        zIndex={10}
        bg='#ffffd3'
        data-test-id={TEST_IDS.FOOTER}
        width='100vw'
    >
        <Flex as='nav' justify='space-around' align='flex-end' height='100%'>
            <Button variant='radial'>
                <Flex align='center' justify='center' boxSize='40px' bg='text' borderRadius='full'>
                    <Image src={house} alt='Главная' boxSize='16px' />
                </Flex>
                <Text textStyle='miniText'>Главная</Text>
            </Button>

            <Button variant='radial'>
                <SearchGlass boxSize='24px' mb='4px' />
                <Text textStyle='miniText'>Поиск</Text>
            </Button>

            <Button variant='radial'>
                <Image src={penNout} alt='Записать' boxSize='24px' mb='4px' />
                <Text textStyle='miniText'>Записать</Text>
            </Button>

            <Button variant='radial'>
                <Avatar
                    name='Екатерина Константинопольская'
                    src='./avatar.png'
                    w='40px'
                    h='40px'
                    mb='4px'
                />
                <Text textStyle='miniText'>Мой профиль</Text>
            </Button>
        </Flex>
    </Box>
);
