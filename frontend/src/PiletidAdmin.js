import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Style.css";

function PiletidAdmin() {
    const [piletid, setPiletid] = useState([]);
    const [message, setMessage] = useState("");
    const [lennujaamId, setLennujaamId] = useState("");
    const [kasutajaId, setKasutajaId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchPiletid();
    }, []);

    const fetchPiletid = async () => {
        try {
            const response = await fetch("https://localhost:7050/Piletid");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPiletid(Array.isArray(data) ? data : []);
        } catch (error) {
            setMessage("");
        }
    };

    const addTicket = async () => {
        if (!lennujaamId || !kasutajaId) {
            setMessage("Please provide both LennujaamId and KasutajaId");
            return;
        }

        try {
            const response = await fetch(`https://localhost:7050/Piletid/Lisa/${lennujaamId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(kasutajaId),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                fetchPiletid();
            } else {
                setMessage(data.message || "An error occurred. Please try again.");
            }
        } catch (error) {
            setMessage("Error adding ticket: " + error.message);
        }
    };

    const deleteTicket = async (piletId) => {
        try {
            const response = await fetch(`https://localhost:7050/Piletid/kustuta/${piletId}`, {
                method: "DELETE"
            });

            if (response.ok) {
                setMessage("Ticket deleted successfully.");
                window.location.reload();
            } else {
                const data = await response.json();
                setMessage(data.message || "Error deleting ticket.");
            }
        } catch (error) {
            setMessage("Error deleting ticket: " + error.message);
        }
    };


    return (
        <div className="App">
            <h1>Piletite Haldussüsteem</h1>
            <h2>Piletid</h2>
            <div>
                <label htmlFor="lennujaamId">Lennujaam ID:</label>
                <input
                    type="number"
                    value={lennujaamId}
                    onChange={(e) => setLennujaamId(e.target.value)}
                    placeholder="Enter Lennujaam ID"
                />
                <br />

                <label htmlFor="kasutajaId">Kasutaja ID:</label>
                <input
                    type="number"
                    value={kasutajaId}
                    onChange={(e) => setKasutajaId(e.target.value)}
                    placeholder="Enter Kasutaja ID"
                />
                <br />

                <button onClick={addTicket}>Add Ticket</button>
            </div>

            {message && <div className="message">{message}</div>}

            <table>
                <thead>
                    <tr>
                        <th>Departure Location</th>
                        <th>Arrival Location</th>
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                        <th>Username(s)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {piletid.map((pilet) => (
                        pilet.kasutajad.map((kasutaja) => (
                            <tr key={`${pilet.id}-${kasutaja.id}`}>
                                <td>{pilet.valjumiskoht}</td>
                                <td>{pilet.saabumiskoht}</td>
                                <td>{pilet.valjumisaeg}</td>
                                <td>{pilet.saabumisaeg}</td>
                                <td>{kasutaja.username}</td>
                                <td>
                                    <button onClick={() => deleteTicket(pilet.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default PiletidAdmin;
