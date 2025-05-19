import { Box, Heading, Image, ModalHeader, Stack } from '@chakra-ui/react';

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

            {step === 'email' &&
                'Для восстановления входа введите ваш e-mail, куда можно отправить уникальный код'}
            {step === 'code' &&
                `Мы отправили вам на e-mail ${emailValue} шестизначный код. Введите его ниже.`}
            {step === 'reset' && 'Восстановление аккаунта'}
        </ModalHeader>
    </Stack>
);
