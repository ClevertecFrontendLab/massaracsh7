import { Button, Card, HStack, Image, Text } from '@chakra-ui/react';

import { TryDish } from '~/types/typesData';

const TryDishCard = ({ icon, title }: TryDish) => (
    <Card w='100%' py={4} px={6} border='border'>
        <HStack justify='space-between' align='center'>
            <HStack fontSize='md'>
                <Image src={icon} boxSize='16px' />
                <Text>{title}</Text>
            </HStack>
            <Button size='md' variant='outline' borderColor='green' borderRadius='small'>
                Готовить
            </Button>
        </HStack>
    </Card>
);

export default TryDishCard;
