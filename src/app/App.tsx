import { BrowserRouter as Router } from 'react-router';

import FullLoader from '~/components/FullLoader/FullLoader';
import { useAppSelector } from '~/store/hooks';

import AppRoutes from './AppRoutes';

function App() {
    const isLoading = useAppSelector((state) => state.app.isLoading);
    return (
        <Router>
            {isLoading && <FullLoader />}
            <AppRoutes />
        </Router>
    );
}

export default App;
