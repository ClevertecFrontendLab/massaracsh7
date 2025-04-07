import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton } from '@chakra-ui/react';

import { newRecipes } from '~/data/cardsData';

import SliderCard from '../SliderCard/SliderCard';

const SliderList = () => (
    <Box as='section' position='relative' mb={12} maxW='1360px' mx='auto' px={{ base: 3, xl: 0 }}>
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
            overflow='hidden'
            maxW={{
                base: '316px',
                md: '728px',
                lg: '880px',
                xl: '1360px',
            }}
            // mx="auto"
            gap={{ base: 3, xl: 6 }}
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
