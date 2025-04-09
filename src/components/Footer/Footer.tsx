import { SearchIcon } from '@chakra-ui/icons';
import { Avatar, Box, Flex, IconButton, Image, Link, Text, VStack } from '@chakra-ui/react';

function Footer() {
    return (
        <Box
            as='footer'
            position='fixed'
            bottom={0}
            left={0}
            right={0}
            height='84px'
            zIndex={10}
            bg='#ffffd3'
        >
            <nav>
                <Flex justify='space-around' align='center' height='100%' color='secondaryText'>
                    <VStack as={Link} href='#' flex='1' p='10px' spacing={1} layerStyle='radialBg'>
                        <IconButton
                            aria-label='Главная'
                            icon={<Image src='/icons/house.svg' alt='Главная' boxSize='16px' />}
                            isRound={true}
                            w='40px'
                            h='40px'
                            background='text'
                        />
                        <Text color='black'>Главная</Text>
                    </VStack>

                    <VStack spacing={1} flex='1' p='10px'>
                        <IconButton
                            aria-label='Поиск'
                            icon={<SearchIcon boxSize='24px' />}
                            variant='ghost'
                            w={12}
                            h={12}
                        />
                        <Text>Поиск</Text>
                    </VStack>

                    <VStack spacing={1} flex='1' p='10px'>
                        <IconButton
                            aria-label='Записать'
                            icon={<Image src='/icons/pen-nout.svg' alt='Записать' />}
                            variant='ghost'
                            w={12}
                            h={12}
                        />
                        <Text>Записать</Text>
                    </VStack>

                    <VStack as={Link} href='#' spacing={1} p='10px'>
                        <Avatar name='Екатерина Константинопольская' src='/avatar.png' />
                        <Text>Мой профиль</Text>
                    </VStack>
                </Flex>
            </nav>
        </Box>
    );
}

export default Footer;
