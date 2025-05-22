import { BrowserRouter as Router, useLocation } from 'react-router';

import { AppAlert } from '~/components/ErrorAlert/ErrorAlert';
import { FullLoader } from '~/components/FullLoader/FullLoader';
import { CustomModal } from '~/components/Modal/CustomModal';
import { useAppSelector } from '~/store/hooks';
import {
    userAlertSelector,
    userLoadingSelector,
    userModalSelector,
} from '~/store/selectors/appSelectors';

import AppRoutes from './AppRoutes';
import { ROUTES_PATH } from './routes';

function App() {
    const location = useLocation();
    const isNotFound = location.pathname === ROUTES_PATH.NOT_FOUND;
    const isLoading = useAppSelector(userLoadingSelector);
    const modal = useAppSelector(userModalSelector);
    const alert = useAppSelector(userAlertSelector);
    return (
        <Router basename={import.meta.env.BASE_URL}>
            {modal && <CustomModal />}
            {!isNotFound && isLoading && <FullLoader />}
            {alert?.sourse === 'global' && <AppAlert />}
            <AppRoutes />
        </Router>
    );
}

export default App;
