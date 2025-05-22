import { Heading, Image, ModalHeader, Stack } from '@chakra-ui/react';

import modalBreakfast from '~/assets/images/modal-breakfast.png';
import modalParcel from '~/assets/images/modal-parcel.png';
import { STEP_CODE_MESSAGE, STEP_RESET_MESSAGE } from '~/constants/constants';

interface ModalHeaderContentProps {
    step: 'email' | 'code' | 'reset';
    emailValue: string;
    titleError?: string;
}

const imageByStep: Record<ModalHeaderContentProps['step'], string | undefined> = {
    email: modalBreakfast,
    code: modalParcel,
    reset: undefined,
};

export const ModalHeaderContent = ({ step, emailValue, titleError }: ModalHeaderContentProps) => (
    <Stack align='center' gap={8}>
        {imageByStep[step] && (
            <Image
                src={imageByStep[step]}
                alt='Modal'
                mx='auto'
                boxSize={{ sm: '108px', md: '108px', mid: '206px', lg: '206px', xl: '206px' }}
                objectFit='contain'
            />
        )}

        <ModalHeader
            fontSize={step === 'reset' ? '24px' : '16px'}
            lineHeight={step === 'reset' ? '32px' : '24px'}
            fontWeight={step === 'reset' ? '700' : 'normal'}
            textAlign='center'
            mb={2}
            p={0}
            px={{ sm: 8, md: 8, lg: 6, xl: 6 }}
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
            {step === 'code' && (
                <Heading
                    fontSize='16px'
                    lineHeight='24px'
                    fontWeight='normal'
                    textAlign='center'
                    mb={2}
                >
                    Мы отправили вам на e-mail
                    <Heading fontWeight='600'>{emailValue}</Heading>
                    шестизначный код. Введите его ниже.
                </Heading>
            )}
            {step === 'reset' && (
                <Heading
                    fontSize='24px'
                    lineHeight='32px'
                    fontWeight='700'
                    textAlign='center'
                    mb={2}
                    px={8}
                >
                    {STEP_RESET_MESSAGE}
                </Heading>
            )}
        </ModalHeader>
    </Stack>
);
