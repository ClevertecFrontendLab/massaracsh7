import { Navigate, Route, Routes, useLocation } from 'react-router';

import { FullLoader } from '~/components/FullLoader/FullLoader';
import { Layout } from '~/layout/Layout';
import { CategoryPage } from '~/pages/CategoryPage/CategoryPage';
import { JuicyPage } from '~/pages/JuicyPage/JuicyPage';
import { MainPage } from '~/pages/MainPage/MainPage';
import { NotFoundPage } from '~/pages/NotFoundPage/NotFoundPage';
import { RecipePage } from '~/pages/RecipePage/RecipePage';
import { useAppSelector } from '~/store/hooks';

import { ROUTES_PATH } from './routes';

const AppRoutes = () => {
    const isLoading = useAppSelector((state) => state.app.isLoading);
    const location = useLocation();

    const isNotFound = location.pathname === ROUTES_PATH.NOT_FOUND;

    return (
        <>
            {isLoading && !isNotFound && <FullLoader />}
            <Routes>
                <Route path={ROUTES_PATH.HOME} element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path={ROUTES_PATH.CATEGORY} element={<CategoryPage />} />
                    <Route path={ROUTES_PATH.RECIPE} element={<RecipePage />} />
                    <Route path={ROUTES_PATH.JUICY} element={<JuicyPage />} />
                </Route>

                <Route path={ROUTES_PATH.NOT_FOUND} element={<NotFoundPage />} />
                <Route path='*' element={<Navigate to={ROUTES_PATH.NOT_FOUND} />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
