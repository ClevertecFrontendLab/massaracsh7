import {
    Button,
    CloseButton,
    Heading,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
} from '@chakra-ui/react';

import { emailRegex } from '~/constants/regex-constants';
import { TEST_IDS } from '~/constants/test-ids';
import { clearModal } from '~/store/app-slice';
import { userModalSelector } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

export const CustomModal = () => {
    const modal = useAppSelector(userModalSelector);
    const dispatch = useAppDispatch();

    if (!modal) return null;

    const {
        title,
        description,
        imageSrc,
        onPrimaryAction,
        primaryActionText = 'Повторить',
        footerNote,
        dataId,
    } = modal;

    const renderDescription = () => {
        if (typeof description !== 'string') {
            return (
                <Text
                    whiteSpace='pre-line'
                    fontSize='16px'
                    lineHeight='24px'
                    px={{ sm: 6, md: 6, lg: 12, xl: 12 }}
                >
                    {description}
                </Text>
            );
        }

        const match = description.match(emailRegex);

        if (!match) {
            return (
                <Text
                    color='blackAlpha.700'
                    whiteSpace='pre-line'
                    fontSize='16px'
                    lineHeight='24px'
                    px={{ sm: 6, md: 6, lg: 12, xl: 12 }}
                >
                    {description}
                </Text>
            );
        }

        const email = match[0];
        const [before, after] = description.split(email);

        return (
            <Text fontSize='16px' lineHeight='24px' px={{ sm: 6, md: 6, lg: 12, xl: 12 }}>
                {before}
                <Text fontWeight='bold'>{email}</Text>
                {after}
            </Text>
        );
    };

    return (
        <Modal isOpen={true} onClose={() => dispatch(clearModal())} isCentered>
            <ModalOverlay />
            <ModalContent data-test-id={dataId}>
                <CloseButton
                    position='absolute'
                    right={6}
                    top={6}
                    onClick={() => dispatch(clearModal())}
                    data-test-id={TEST_IDS.CLOSE_BUTTON}
                    border='1px solid black'
                    borderRadius='50%'
                    w={6}
                    h={6}
                />
                <Stack align='center' gap={6}>
                    {imageSrc && (
                        <Image
                            src={imageSrc}
                            alt='Modal illustration'
                            mx='auto'
                            boxSize={{
                                sm: '108px',
                                md: '108px',
                                mid: '206px',
                                lg: '206px',
                                xl: '206px',
                            }}
                            objectFit='contain'
                        />
                    )}
                    <ModalHeader p={0} mb={2} px={{ sm: 8, md: 8, lg: 6, xl: 6 }}>
                        <Heading fontSize='24px' lineHeight='32px' fontWeight='700' p={0}>
                            {title}
                        </Heading>
                    </ModalHeader>
                </Stack>

                <ModalBody p={0}>{renderDescription()}</ModalBody>

                <ModalFooter p={0} mt={8} display='flex' justifyContent='center'>
                    {onPrimaryAction && (
                        <Button
                            variant='darkWhite'
                            onClick={onPrimaryAction}
                            data-test-id={TEST_IDS.REPEAT_BUTTON}
                        >
                            {primaryActionText}
                        </Button>
                    )}
                    {footerNote && (
                        <Text
                            fontSize='12px'
                            lineHeight='16px'
                            px={{ sm: 16, md: 16, lg: 8, xl: 8 }}
                        >
                            {footerNote}
                        </Text>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
