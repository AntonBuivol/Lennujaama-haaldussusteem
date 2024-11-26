import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration'
import LennujaamAdmin from './lennujaamAdmin'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/lennujaamad" element={<LennujaamAdmin />} />
        </Routes>
    </BrowserRouter>
);
