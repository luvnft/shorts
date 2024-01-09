import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import FirstPage from './pages/FirstPage.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<FirstPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
