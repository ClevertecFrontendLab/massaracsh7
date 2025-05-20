import 'swiper/swiper-bundle.css';

import { Box, Heading, IconButton } from '@chakra-ui/react';
import { Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ArrowLeft, ArrowRight } from '~/assets/icons/icons';
import { JUICIEST_SLIDER_BREAKPOINTS } from '~/constants/swiper-breakpoints';
import { CAROUSEL, CAROUSEL_BACK, CAROUSEL_CARD, CAROUSEL_FORWARD } from '~/constants/test-ids';
import { Recipe } from '~/types/apiTypes';

import { SliderCard } from '../SliderCard/SliderCard';

interface SliderListProps {
    recipes: Recipe[];
}

export const SliderList = ({ recipes }: SliderListProps) => (
    <Box
        as='section'
        position='relative'
        mb={{ sm: '30px', md: '30px', lg: '40px', xl: '44px' }}
        w='100%'
        maxW='1360px'
        style={{ overflow: 'visible' }}
    >
        <Heading variant='sectionTitle' mb={{ sm: 3, md: 3, lg: 6, xl: 6 }}>
            Новые рецепты
        </Heading>

        <IconButton
            aria-label='Previous'
            className='prev'
            icon={<ArrowLeft w='24px' />}
            position='absolute'
            width={{ base: '40px', lg: '40px', xl: '48px' }}
            height={{ base: '40px', lg: '40px', xl: '48px' }}
            top='50%'
            left='-6px'
            transform='translateY(-50%)'
            bg='black'
            color='customLime.50'
            borderRadius='small'
            zIndex={14}
            data-test-id={CAROUSEL_BACK}
            display={{ base: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' }}
        />

        <IconButton
            aria-label='Next'
            className='next'
            icon={<ArrowRight w='24px' />}
            position='absolute'
            width={{ base: '40px', lg: '40px', xl: '48px' }}
            height={{ base: '40px', lg: '40px', xl: '48px' }}
            top='50%'
            right='-6px'
            transform='translateY(-50%)'
            bg='black'
            color='customLime.50'
            borderRadius='small'
            zIndex={14}
            data-test-id={CAROUSEL_FORWARD}
            display={{ base: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' }}
        />

        <Swiper
            data-test-id={CAROUSEL}
            loop={true}
            loopAdditionalSlides={4}
            speed={0}
            modules={[Navigation, Keyboard]}
            keyboard={{ enabled: true }}
            className='mySwiper'
            spaceBetween={16}
            slidesPerView={4}
            watchSlidesProgress={true}
            navigation={{
                nextEl: '.next',
                prevEl: '.prev',
            }}
            breakpoints={JUICIEST_SLIDER_BREAKPOINTS}
            style={{ width: '100%', margin: '0 auto' }}
        >
            {recipes.map((recipe, index) => (
                <SwiperSlide key={recipe._id} data-test-id={`${CAROUSEL_CARD}-${index}`}>
                    <SliderCard recipe={recipe} />
                </SwiperSlide>
            ))}
        </Swiper>
    </Box>
);
