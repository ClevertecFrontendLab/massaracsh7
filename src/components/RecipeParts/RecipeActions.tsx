import { DeleteIcon } from '@chakra-ui/icons';
import { Badge, Button, HStack, IconButton, Image, Text } from '@chakra-ui/react';
import { NavigateFunction } from 'react-router';

import BsAlarm from '~/assets/icons/BsAlarm.svg';
import BsBookmarkHeart from '~/assets/icons/BsBookmarkHeart.svg';
import BsEmojiHeartEyes from '~/assets/icons/BsEmojiHeartEyes.svg';
import { LeftPen } from '~/assets/icons/icons';
import { TEST_IDS } from '~/constants/test-ids';

interface RecipeActionsProps {
    time?: number;
    isAuthor: boolean;
    handleDelete: () => void;
    handleLike: () => void;
    handleBookmark: () => void;
    navigate: NavigateFunction;
    category: string;
    subcategory: string;
    id: string;
}

const RecipeActions: React.FC<RecipeActionsProps> = ({
    time,
    isAuthor,
    handleDelete,
    handleLike,
    handleBookmark,
    navigate,
    category,
    subcategory,
    id,
}) => (
    <HStack spacing={4} mt='auto' justify='space-between' alignItems='flex-end' wrap='wrap'>
        <Badge variant='gray06'>
            <HStack
                gap={{ base: 0.5, md: 0.5, lg: 2 }}
                py='2px'
                px={{ sm: 1, md: 1, lg: 2, xl: 2 }}
            >
                <Image src={BsAlarm} alt='alarm' boxSize='16px' />
                <Text textTransform='lowercase'>{time}</Text>
            </HStack>
        </Badge>

        <HStack spacing={4}>
            {isAuthor ? (
                <HStack spacing={2}>
                    <IconButton
                        aria-label='Удалить рецепт'
                        icon={<DeleteIcon />}
                        colorScheme='black'
                        variant='ghost'
                        w='48px'
                        h='48px'
                        onClick={handleDelete}
                        data-test-id={TEST_IDS.RECIPE_DELETE_BUTTON}
                    />
                    <Button
                        variant='blackOutline'
                        type='button'
                        leftIcon={<LeftPen w='16px' h='16px' />}
                        onClick={() => navigate(`/edit-recipe/${category}/${subcategory}/${id}`)}
                    >
                        Редактировать рецепт
                    </Button>
                </HStack>
            ) : (
                <HStack spacing={2}>
                    <Button
                        leftIcon={
                            <Image
                                src={BsEmojiHeartEyes}
                                boxSize={{ base: '14px', lg: '14px', xl: '16px' }}
                            />
                        }
                        variant='outline'
                        colorScheme='black'
                        py={{ base: '6px', lg: '6px', xl: '4' }}
                        px={{ base: '3', lg: '3', xl: '6' }}
                        height={{ sm: '24px', md: '24px', lg: '32px', xl: '48px' }}
                        onClick={handleLike}
                    >
                        Оценить рецепт
                    </Button>
                    <Button
                        leftIcon={
                            <Image
                                src={BsBookmarkHeart}
                                boxSize={{ base: '14px', lg: '14px', xl: '16px' }}
                            />
                        }
                        variant='limeSolid'
                        py={{ base: '6px', lg: '6px', xl: '4' }}
                        px={{ base: '3', lg: '3', xl: '6' }}
                        height={{ sm: '24px', md: '24px', lg: '32px', xl: '48px' }}
                        onClick={handleBookmark}
                    >
                        Сохранить в закладки
                    </Button>
                </HStack>
            )}
        </HStack>
    </HStack>
);

export default RecipeActions;
