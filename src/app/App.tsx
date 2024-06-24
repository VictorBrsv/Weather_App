import { Routes, Route } from 'react-router-dom';
import { MainPage } from '../pages/MainPage/MainPage';
import { Details } from '../pages/Details/Details';

export function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/:name' element={<Details />} />
    </Routes>
  );
}
