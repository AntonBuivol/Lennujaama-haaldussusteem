import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import LennujaamAdmin from './LennujaamAdmin';
import LennujaamKasutaja from './LennujaamKasutaja';
import MainPage from './MainPage';
import Navbar from './Navbar';
import PiletidAdmin from './PiletidAdmin';
import Piletid from './Piletid';

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            setCurrentUser(storedUser);
        }
    }, []);

    const handleLogin = (user) => {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    };

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    return (
        <>
            <Navbar currentUser={currentUser} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route
                    path="/login"
                    element={
                        currentUser ? (
                            <Navigate to={currentUser.isAdmin ? '/lennujaamadAdmin' : '/lennujaamad'} />
                        ) : (
                            <Login setCurrentUser={handleLogin} />
                        )
                    }
                />
                <Route path="/registration" element={<Registration />} />
                <Route
                    path="/lennujaamadAdmin"
                    element={
                        currentUser && currentUser.isAdmin ? (
                            <LennujaamAdmin />
                        ) : (
                                <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/lennujaamad"
                    element={
                        currentUser ? (
                            <LennujaamKasutaja currentUser={currentUser} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/piletid"
                    element={
                        currentUser ? (
                            <Piletid />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/piletidAdmin"
                    element={
                        currentUser && currentUser.isAdmin ? (
                            <PiletidAdmin />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </>
    );
};

export default App;
