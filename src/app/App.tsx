import { BrowserRouter as Router, Route, Routes } from 'react-router';

import Layout from '~/layout/Layout';
import MainPage from '~/pages/MainPage/MainPage';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
