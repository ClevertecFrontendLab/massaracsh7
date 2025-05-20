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
                boxSize={{ base: '108px', mid: '206px' }}
            />
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
