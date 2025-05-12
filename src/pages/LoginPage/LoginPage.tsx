import { LoginForm } from '~/components/LoginForm/LoginForm';
import { AuthLayout } from '~/layout/AuthLayout';

export const LoginPage = () => (
    <AuthLayout activeTab='login'>
        <LoginForm />
    </AuthLayout>
);
