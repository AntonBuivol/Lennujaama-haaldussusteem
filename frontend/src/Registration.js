import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Style.css";

function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const registerUser = async () => {
        try {
            const response = await fetch("https://localhost:7050/Kasutaja/register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, isAdmin }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setTimeout(() => navigate('/login'), 2000);
            }
            else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    return (
        <div className="App">
            <h1>Registration</h1>
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
                <label>
                    <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                    Admin
                    <br />
                </label>
                <button onClick={registerUser}>Register</button>
            </div>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Registration;
