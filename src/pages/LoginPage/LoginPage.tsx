import { Button } from '@chakra-ui/react';
import { useState } from 'react';

import { LoginForm } from '~/components/LoginForm/LoginForm';
import { RecoveryModal } from '~/components/Modal/RecoveryModal';
import { FORGOT_PASSWORD } from '~/constants/test-ids';
import { AuthLayout } from '~/layout/AuthLayout';

export const LoginPage = () => {
    const [isRecoveryOpen, setRecoveryOpen] = useState(false);

    return (
        <AuthLayout activeTab='login'>
            <LoginForm />
            <Button
                variant='ghost'
                onClick={() => setRecoveryOpen(true)}
                data-test-id={FORGOT_PASSWORD}
            >
                Забыли логин или пароль
            </Button>

            <RecoveryModal isOpen={isRecoveryOpen} onClose={() => setRecoveryOpen(false)} />
        </AuthLayout>
    );
};
