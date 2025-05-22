import { Button } from '@chakra-ui/react';
import { useState } from 'react';

import { LoginForm } from '~/components/LoginForm/LoginForm';
import { RecoveryModal } from '~/components/Modal/RecoveryModal';
import { TEST_IDS } from '~/constants/test-ids';
import { AuthLayout } from '~/layout/AuthLayout';

export const LoginPage = () => {
    const [isRecoveryOpen, setRecoveryOpen] = useState(false);

    return (
        <AuthLayout activeTab='login'>
            <LoginForm />
            <Button
                variant='ghost'
                onClick={() => setRecoveryOpen(true)}
                data-test-id={TEST_IDS.FORGOT_PASSWORD}
                mx='auto'
                mt='8px'
                sx={{
                    _focus: { boxShadow: 'none' },
                    _focusVisible: { boxShadow: 'none' },
                    _hover: { boxShadow: 'none' },
                }}
                fontSize='16px'
                lineHeight='24px'
                fontWeight='600'
            >
                Забыли логин или пароль
            </Button>

            <RecoveryModal isOpen={isRecoveryOpen} onClose={() => setRecoveryOpen(false)} />
        </AuthLayout>
    );
};
