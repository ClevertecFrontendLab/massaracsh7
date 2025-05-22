import { Heading, Progress } from '@chakra-ui/react';

import { TEST_IDS } from '~/constants/test-ids';

interface StepProgressProps {
    step: 1 | 2;
    progress: number;
}

export const StepProgress = ({ step, progress }: StepProgressProps) => (
    <>
        <Heading
            as='h3'
            fontSize='16px'
            lineHeight='24px'
            fontWeight='400'
            w='full'
            textAlign='left'
        >
            {step === 1 ? 'Шаг 1: Личная информация' : 'Шаг 2: Логин и пароль'}
        </Heading>
        <Progress
            mb={6}
            value={progress}
            size='sm'
            hasStripe
            colorScheme='customLime'
            bgColor='blackAlpha.100'
            data-test-id={TEST_IDS.SIGN_UP_PROGRESS}
        />
    </>
);
