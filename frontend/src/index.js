import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration'
import LennujaamAdmin from './LennujaamAdmin'
import Lennujaamkasutaja from './LennujaamKasutaja'
import MainPage from './MainPage'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/lennujaamadAdmin" element={<LennujaamAdmin />} />
            <Route path="/lennujaamad" element={<Lennujaamkasutaja />} />
        </Routes>
    </BrowserRouter>
);
