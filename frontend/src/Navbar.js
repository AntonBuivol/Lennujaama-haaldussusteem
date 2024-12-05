import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ currentUser, onLogout }) => {
    return (
        <nav>
            <ul>
                {!currentUser && (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/registration">Register</Link>
                        </li>
                    </>
                )}
                {currentUser && (
                    <>
                        {currentUser.isAdmin && (
                            <li>
                                <Link to="/lennujaamadAdmin">Admin Page</Link>
                                <Link to="/piletidAdmin">Piletid Admin</Link>
                            </li>
                        )}
                        <li>
                            <Link to="/lennujaamad">Lennujaamad</Link>
                            <Link to="/piletid">Piletid</Link>
                        </li>
                        <li>
                            <button onClick={onLogout}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
