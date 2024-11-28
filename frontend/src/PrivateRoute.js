import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, role, userRole, ...rest }) => {
    // Проверка, авторизован ли пользователь
    if (!role && !userRole) {
        // Если пользователь не авторизован, перенаправляем на страницу входа
        return <Navigate to="/login" />;
    }

    // Если роль пользователя не соответствует требуемой роли, перенаправляем на главную
    if (role && userRole !== role) {
        return <Navigate to="/" />;
    }

    return element;
};

export default PrivateRoute;
