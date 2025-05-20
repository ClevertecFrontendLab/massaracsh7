import { Box, Heading, Image, ModalHeader, Stack } from '@chakra-ui/react';

import { STEP_CODE_MESSAGE, STEP_RESET_MESSAGE } from '~/constants/constants';

interface ModalHeaderContentProps {
    step: 'email' | 'code' | 'reset';
    emailValue: string;
    titleError?: string;
}

const imageByStep: Record<ModalHeaderContentProps['step'], string | undefined> = {
    email: '/images/modal-breakfast.png',
    code: '/images/modal-parcel.png',
    reset: undefined,
};

export const ModalHeaderContent = ({ step, emailValue, titleError }: ModalHeaderContentProps) => (
    <Stack align='center' gap={8}>
        {imageByStep[step] && (
            <Box>
                <Image
                    src={imageByStep[step]}
                    alt='Modal'
                    mx='auto'
                    boxSize={{ base: '108px', md: '206px' }}
                />
            </Box>
        )}

        <ModalHeader
            fontSize={step === 'reset' ? '24px' : '16px'}
            lineHeight={step === 'reset' ? '32px' : '24px'}
            fontWeight={step === 'reset' ? '700' : 'normal'}
            textAlign='center'
            px={6}
        >
            {titleError && (
                <Heading
                    fontSize='24px'
                    lineHeight='32px'
                    fontWeight='700'
                    textAlign='center'
                    mb={2}
                >
                    {titleError}
                </Heading>
            )}

            {step === 'email' && STEP_CODE_MESSAGE}
            {step === 'code' &&
                `Мы отправили вам на e-mail ${emailValue} шестизначный код. Введите его ниже.`}
            {step === 'reset' && STEP_RESET_MESSAGE}
        </ModalHeader>
    </Stack>
);
