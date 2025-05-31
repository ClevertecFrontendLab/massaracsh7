import { Button, Center, Image, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { ROUTES_PATH } from '~/app/routes';
import iconPen from '~/assets/icons/IconPen.svg';
import { TEST_IDS } from '~/constants/test-ids';

export const CreateRecipeButton = () => {
    const navigate = useNavigate();
    return (
        <Center w='208px' h='208px'>
            <Button
                variant='radial'
                w='208px'
                h='208px'
                onClick={() => navigate(ROUTES_PATH.NEW_RECIPE)}
                transition='none'
                style={{ pointerEvents: 'auto', opacity: 1 }}
                data-test-id={TEST_IDS.ADD_RECIPE_BUTTON}
            >
                <VStack spacing={3} pt='10px'>
                    <Image src={iconPen} boxSize='48px' />
                    <Text mt='2px' fontSize='sm' color='secondaryText'>
                        Записать рецепт
                    </Text>
                </VStack>
            </Button>
        </Center>
    );
};
