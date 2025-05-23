import { RegistrationForm } from '~/components/RegistrationForm/RegistrationForm';
import { AuthLayout } from '~/layout/AuthLayout';

export const SignInPage = () => (
    <AuthLayout activeTab='register'>
        <RegistrationForm />
    </AuthLayout>
);
