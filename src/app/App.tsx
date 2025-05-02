import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router';

import Layout from '~/layout/Layout';
import CategoryPage from '~/pages/CategoryPage/CategoryPage';
import JuicyPage from '~/pages/JuicyPage/JuicyPage';
import MainPage from '~/pages/MainPage/MainPage';
import NotFoundPage from '~/pages/NotFoundPage/NotFoundPage';
import RecipePage from '~/pages/RecipePage/RecipePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<MainPage />} />
                    <Route path='/:category/:subcategory' element={<CategoryPage />} />
                    <Route path='/:category/:subcategory/:id' element={<RecipePage />} />
                    <Route path='/the-juiciest' element={<JuicyPage />} />
                </Route>

                <Route path='/not-found' element={<NotFoundPage />} />
                <Route path='*' element={<Navigate to='/not-found' />} />
            </Routes>
        </Router>
    );
}

export default App;
