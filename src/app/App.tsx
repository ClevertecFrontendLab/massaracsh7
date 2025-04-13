import { BrowserRouter as Router, Route, Routes } from 'react-router';

import Layout from '~/layout/Layout';
import JuicyPage from '~/pages/JuicyPage/JuicyPage';
import MainPage from '~/pages/MainPage/MainPage';
import VeganPage from '~/pages/VeganPage/VeganPage';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/vegan' element={<VeganPage />} />
                    <Route path='/vegan/*' element={<VeganPage />} />
                    <Route path='/juicy' element={<JuicyPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
