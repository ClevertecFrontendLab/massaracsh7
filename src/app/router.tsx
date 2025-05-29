import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router';

import { Layout } from '~/layout/Layout';
import { CategoryPage } from '~/pages/CategoryPage/CategoryPage';
import { JuicyPage } from '~/pages/JuicyPage/JuicyPage';
import { LoginPage } from '~/pages/LoginPage/LoginPage';
import { MainPage } from '~/pages/MainPage/MainPage';
import { NewRecipePage } from '~/pages/NewRecipePage/NewRecipePage';
import { NotFoundPage } from '~/pages/NotFoundPage/NotFoundPage';
import { RecipePage } from '~/pages/RecipePage/RecipePage';
import { SignInPage } from '~/pages/SignInPage/SignInPage';
import { VerificationPage } from '~/pages/VerificationPage/VerificationPage';

import App from './App';
import { PrivateRoute } from './PrivateRoute';
import { ROUTES_PATH } from './routes';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
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
                <Route path={ROUTES_PATH.NEW_RECIPE} element={<NewRecipePage />} />
                <Route path={ROUTES_PATH.EDIT_RECIPE} element={<NewRecipePage />} />
            </Route>

            <Route path={ROUTES_PATH.LOG_IN} element={<LoginPage />} />
            <Route path={ROUTES_PATH.SIGN_IN} element={<SignInPage />} />
            <Route path={ROUTES_PATH.VERIFICATION} element={<VerificationPage />} />
            <Route path={ROUTES_PATH.NOT_FOUND} element={<NotFoundPage />} />
            <Route path='*' element={<Navigate to={ROUTES_PATH.NOT_FOUND} replace />} />
        </Route>,
    ),
    {
        basename: import.meta.env.BASE_URL,
    },
);
