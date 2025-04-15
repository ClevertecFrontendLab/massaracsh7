import { BrowserRouter as Router, Route, Routes } from 'react-router';

import Layout from '~/layout/Layout';
import CategoryPage from '~/pages/CategoryPage/CategoryPage';
import JuicyPage from '~/pages/JuicyPage/JuicyPage';
import MainPage from '~/pages/MainPage/MainPage';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                    <Route path='/:category/:subcategory' element={<CategoryPage />} />
                    <Route path='/juicy' element={<JuicyPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
