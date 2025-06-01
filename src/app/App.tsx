import { Outlet, useLocation } from 'react-router';

import { AppAlert } from '~/components/ErrorAlert/ErrorAlert';
import { FullLoader } from '~/components/FullLoader/FullLoader';
import { CustomModal } from '~/components/Modal/CustomModal';
import { userAlertSelector, userLoadingSelector, userModalSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

import { ROUTES_PATH } from './routes';

function App() {
    const location = useLocation();
    const isNotFound = location.pathname === ROUTES_PATH.NOT_FOUND;
    const isLoading = useAppSelector(userLoadingSelector);
    const modal = useAppSelector(userModalSelector);
    const alert = useAppSelector(userAlertSelector);

    return (
        <>
            {modal && <CustomModal />}
            {!isNotFound && isLoading && <FullLoader />}
            {alert?.sourse === 'global' && <AppAlert />}
            <Outlet />
        </>
    );
}

export default App;
