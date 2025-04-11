import { Button, Card, Heading, HStack, Image } from '@chakra-ui/react';

import { TryDish } from '~/types/typesData';

const TryDishCard = ({ icon, title }: TryDish) => (
    <Card
        w='100%'
        pt={{ sm: '10px', md: '10px', lg: '10px', xl: '10px' }}
        pl={{ sm: '3', md: '6px', lg: '14px', xl: '8' }}
        pb={{ sm: '8px', md: '8px', lg: '8px', xl: '3' }}
        pr={{ sm: '3', md: '6px', lg: '8px', xl: '6' }}
        border='card'
        borderRadius='medium'
        boxShadow='none'
    >
        <HStack justify='space-between' align='center' lineHeight='28px'>
            <HStack>
                <Image src={icon} boxSize='24px' />
                <Heading
                    variant='sliderTitle'
                    sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: {
                            md: 1,
                            sm: 1,
                        },
                    }}
                >
                    {title}
                </Heading>
            </HStack>
            <Button variant='limeOutline'>Готовить</Button>
        </HStack>
    </Card>
);

export default TryDishCard;
