import { Button, Card, HStack, Image, Text } from '@chakra-ui/react';

import { TryDish } from '~/types/typesData';

const TryDishCard = ({ icon, title }: TryDish) => (
    <Card w='100%' py={3} px={6} border='card' borderRadius='medium' boxShadow='none'>
        <HStack justify='space-between' align='center' lineHeight='28px'>
            <HStack>
                <Image src={icon} boxSize='24px' />
                <Text fontSize='20px' fontWeight='500' lineHeight='28px'>
                    {title}
                </Text>
            </HStack>
            <Button
                size='sm'
                fontWeight='600'
                lineHeight='20px'
                fontSize='14px'
                variant='outline'
                color='customLime.600'
                borderColor='customLime.600'
                borderRadius='small'
            >
                Готовить
            </Button>
        </HStack>
    </Card>
);

export default TryDishCard;
