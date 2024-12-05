import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Style.css";

function Piletid() {
    const [piletid, setPiletid] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const userId = JSON.parse(localStorage.getItem('currentUser'))?.id;

    useEffect(() => {
        if (userId) {
            fetchPiletidByUserId(userId);
        } else {
            setMessage("User not logged in");
        }
    }, [userId]);

    const fetchPiletidByUserId = async (userId) => {
        try {
            const response = await fetch(`https://localhost:7050/Piletid/pilet/${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPiletid(Array.isArray(data) ? data : []);
        } catch (error) {
            setMessage("Error fetching tickets");
        }
    };

    return (
        <div className="App">
            <h1>Piletite Haldussüsteem</h1>
            <h2>Teie piletid</h2>

            {message && <div className="message">{message}</div>}

            <table>
                <thead>
                    <tr>
                        <th>Departure Location</th>
                        <th>Arrival Location</th>
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                    </tr>
                </thead>
                <tbody>
                    {piletid.length === 0 ? (
                        <tr>
                            <td colSpan="5">No tickets found for the current user.</td>
                        </tr>
                    ) : (
                        piletid.map((pilet) => (
                            <tr key={pilet.id}>
                                <td>{pilet.valjumiskoht}</td>
                                <td>{pilet.saabumiskoht}</td>
                                <td>{pilet.valjumisaeg}</td>
                                <td>{pilet.saabumisaeg}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Piletid;
