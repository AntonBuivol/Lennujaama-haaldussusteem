import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/lennujaamad">Lennujaamad</Link></li>
                {user?.isAdmin && (
                    <li><Link to="/lennujaamadAdmin">Admin</Link></li>
                )}
                <li><Link to="/registration">Register</Link></li>
                {user ? (
                    <>
                        <li>
                            <button onClick={onLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
