// App.js
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import LennujaamAdmin from './LennujaamAdmin';
import Lennujaamkasutaja from './LennujaamKasutaja';
import MainPage from './MainPage';
import Navbar from './Navbar';
import PrivateRoute from './PrivateRoute'; // Импортируем PrivateRoute

const App = () => {
    const [currentUser, setCurrentUser] = useState(null); // Состояние для текущего пользователя
    const navigate = useNavigate();

    // Функция выхода (logout)
    const handleLogout = () => {
        setCurrentUser(null); // Убираем текущего пользователя
        navigate('/'); // Перенаправляем на главную страницу
    };

    return (
        <>
            <Navbar user={currentUser} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />

                {/* Защищенные маршруты */}
                <Route
                    path="/lennujaamad"
                    element={
                        <PrivateRoute
                            element={<Lennujaamkasutaja />}
                            role={null} // Не требуется роль для доступа
                            userRole={currentUser ? currentUser.isAdmin : null} // Проверка на роль
                        />
                    }
                />
                <Route
                    path="/lennujaamadAdmin"
                    element={
                        <PrivateRoute
                            element={<LennujaamAdmin />}
                            role="admin" // Требуется роль admin
                            userRole={currentUser ? (currentUser.isAdmin ? 'admin' : 'user') : null}
                        />
                    }
                />
            </Routes>
        </>
    );
};

export default App;
