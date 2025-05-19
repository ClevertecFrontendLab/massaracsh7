import { Navigate, Route, Routes, useLocation } from 'react-router';

import { AppAlert } from '~/components/ErrorAlert/ErrorAlert';
import { FullLoader } from '~/components/FullLoader/FullLoader';
import { CustomModal } from '~/components/Modal/CustomModal';
import { Layout } from '~/layout/Layout';
import { CategoryPage } from '~/pages/CategoryPage/CategoryPage';
import { JuicyPage } from '~/pages/JuicyPage/JuicyPage';
import { LoginPage } from '~/pages/LoginPage/LoginPage';
import { MainPage } from '~/pages/MainPage/MainPage';
import { NotFoundPage } from '~/pages/NotFoundPage/NotFoundPage';
import { RecipePage } from '~/pages/RecipePage/RecipePage';
import { SignInPage } from '~/pages/SignInPage/SignInPage';
import { VerificationPage } from '~/pages/VerificationPage/VerificationPage';
import { useAppSelector } from '~/store/hooks';
import { userLoadingSelector } from '~/store/selectors/appSelectors';

import { PrivateRoute } from './PrivateRoute';
import { ROUTES_PATH } from './routes';

const AppRoutes = () => {
    const isLoading = useAppSelector(userLoadingSelector);
    const modal = useAppSelector((state) => state.app.modal);
    const alert = useAppSelector((state) => state.app.alert);
    const location = useLocation();
    const isNotFound = location.pathname === ROUTES_PATH.NOT_FOUND;

    return (
        <>
            {modal && <CustomModal />}
            {!isNotFound && isLoading && <FullLoader />}
            {alert && <AppAlert />}
            <Routes>
                <Route
                    path={ROUTES_PATH.HOME}
                    element={
                        <PrivateRoute>
                            <Layout />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<MainPage />} />
                    <Route path={ROUTES_PATH.CATEGORY} element={<CategoryPage />} />
                    <Route path={ROUTES_PATH.RECIPE} element={<RecipePage />} />
                    <Route path={ROUTES_PATH.JUICY} element={<JuicyPage />} />
                </Route>

                <Route path={ROUTES_PATH.LOG_IN} element={<LoginPage />} />
                <Route path={ROUTES_PATH.SIGN_IN} element={<SignInPage />} />
                <Route path={ROUTES_PATH.VERIFICATION} element={<VerificationPage />} />
                <Route path={ROUTES_PATH.NOT_FOUND} element={<NotFoundPage />} />
                <Route path='*' element={<Navigate to={ROUTES_PATH.NOT_FOUND} />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
