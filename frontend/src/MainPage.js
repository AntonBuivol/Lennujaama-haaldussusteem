import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Style.css";

function MainPage() {
    return (
        <div className="App">
            <h1>Lennujaama Haaldussüsteem</h1>
            <div>
                <button><a href="http://localhost:3000/lennujaamad">Kasutaja</a></button>
                <br/>
                <button><a href="http://localhost:3000/lennujaamadAdmin">Admin</a></button>
                <br/>
                <button><a href="http://localhost:3000/login">Login</a></button>
                <br/>
                <button><a href="http://localhost:3000/registration">Registration</a></button>
            </div>
        </div>
    );
}

export default MainPage;