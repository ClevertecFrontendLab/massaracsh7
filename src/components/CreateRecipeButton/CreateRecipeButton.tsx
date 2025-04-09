import { Button, Image, Text, VStack } from '@chakra-ui/react';

const CreateRecipeButton = () => (
    <Button>
        <VStack spacing={2}>
            <Image src='/icons/IconPen.svg' boxSize='48px' />
            <Text mt='2px' fontSize='sm' color='secondaryText'>
                Записать рецепт
            </Text>
        </VStack>
    </Button>
);

export default CreateRecipeButton;
