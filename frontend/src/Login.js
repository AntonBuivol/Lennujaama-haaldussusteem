import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Style.css";

function Login({ setCurrentUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [url, setUrl] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState(null);

    const navigate = useNavigate();

    const loginUser = async () => {
        try {
            const response = await fetch("https://localhost:7050/Kasutaja/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setCurrentUser({ username, isAdmin: data.isAdmin });
                if (data.isAdmin) {
                    setTimeout(() => navigate('/lennujaamadAdmin'), 2000);
                } else {
                    setTimeout(() => navigate('/lennujaamad'), 2000);
                }
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    const logoutUser = () => {
        setCurrentUser(null);
        setMessage("Logged out successfully.");
        navigate('/login');
    };

    return (
        <div className="App">
            <h1>Login</h1>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <div>
                    <label>Password:</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button id="showPass"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                <br />
                <button onClick={loginUser}>Login</button>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;