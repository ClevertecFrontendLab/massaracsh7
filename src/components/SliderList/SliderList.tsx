import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton } from '@chakra-ui/react';

import { newRecipes } from '~/data/cardsData';

import SliderCard from '../SliderCard/SliderCard';

const SliderList = () => (
    <Box
        as='section'
        position='relative'
        mb={12}
        w='100%'
        minW={{
            base: 'calc(158px * 2 + 12px)',
            md: 'calc(158px * 4.5 + 12px * 4)',
            lg: 'calc(277px * 3.5 + 24px * 3)',
            xl: 'calc(322px * 4 + 24px * 3)',
        }}
    >
        <Heading variant='sectionTitle' mb={6}>
            Новые рецепты
        </Heading>
        <IconButton
            aria-label='Previous'
            icon={<ArrowBackIcon />}
            position='absolute'
            width='48px'
            height='48px'
            top='50%'
            left='-10px'
            transform='translateY(-50%)'
            bg='black'
            color='customLime.50'
            borderRadius='small'
            zIndex={1}
            _hover={{ bg: 'gray.700' }}
        />

        <IconButton
            aria-label='Next'
            icon={<ArrowForwardIcon />}
            position='absolute'
            width='48px'
            height='48px'
            top='50%'
            right='40px'
            transform='translateY(-50%)'
            bg='black'
            color='customLime.50'
            borderRadius='small'
            zIndex={1}
            _hover={{ bg: 'gray.700' }}
        />
        <Flex
            overflowX='auto'
            whiteSpace='nowrap'
            gap={{ base: 3, xl: 6 }}
            w='100%'
            sx={{
                '::-webkit-scrollbar': { display: 'none' }, // скрыть скролл
            }}
        >
            {newRecipes.map((recipe, index) => (
                <Box
                    key={index}
                    flex='0 0 auto'
                    w={{
                        base: '158px',
                        md: '158px',
                        lg: '277px',
                        xl: '322px',
                    }}
                >
                    <SliderCard {...recipe} />
                </Box>
            ))}
        </Flex>
    </Box>
);

export default SliderList;
