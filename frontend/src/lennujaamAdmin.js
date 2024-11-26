import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StyleLennujaamad.css';

function LennujaamAdmin() {
    const [lennujaamad, setLennujaamad] = useState([]);
    const [valjumiskoht, setValjumiskoht] = useState('');
    const [saabumiskoht, setSaabumiskoht] = useState('');
    const [valjumisaeg, setValjumisaeg] = useState('');
    const [saabumisaeg, setSaabumisaeg] = useState('');
    const [message, setMessage] = useState('');
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLennujaamad();
    }, []);

    const fetchLennujaamad = async () => {
        try {
            const response = await fetch("https://localhost:7050/Lennujaam");
            const data = await response.json();
            setLennujaamad(data);
        } catch (error) {
            setMessage("Error fetching data: " + error.message);
        }
    };

    const Add = async () => {
        const newLennujaam = { valjumiskoht, saabumiskoht, valjumisaeg, saabumisaeg };
        try {
            const response = await fetch("https://localhost:7050/Lennujaam/lisa", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newLennujaam),
            });

            const data = await response.json();

            if (response.ok) {
                fetchLennujaamad();
                setMessage("Lennujaam added successfully.");
                clearForm();
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    const Delete = async (id) => {
        try {
            const response = await fetch(`https://localhost:7050/Lennujaam/kustuta/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok) {
                fetchLennujaamad();
                setMessage("Lennujaam deleted successfully.");
            } else {
                setMessage("Error deleting Lennujaam.");
            }
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    const Edit = (id) => {
        const lennujaamToEdit = lennujaamad.find(l => l.id === id);
        if (lennujaamToEdit) {
            setValjumiskoht(lennujaamToEdit.valjumiskoht);
            setSaabumiskoht(lennujaamToEdit.saabumiskoht);
            setValjumisaeg(lennujaamToEdit.valjumisaeg);
            setSaabumisaeg(lennujaamToEdit.saabumisaeg);
            setEditId(id);
        }
    };

    const Update = async () => {
        const updatedLennujaam = { valjumiskoht, saabumiskoht, valjumisaeg, saabumisaeg };
        try {
            const response = await fetch(`https://localhost:7050/Lennujaam/muuda/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedLennujaam),
            });
            const data = await response.json();
            if (response.ok) {
                fetchLennujaamad();
                setMessage("Lennujaam updated successfully.");
                clearForm();
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    const clearForm = () => {
        setValjumiskoht('');
        setSaabumiskoht('');
        setValjumisaeg('');
        setSaabumisaeg('');
        setEditId(null);
    };

    return (
        <div className="App">
            <h1>Lennujaama Haldussüsteem</h1>
            <div>
                <input
                    type="text"
                    placeholder="Valjumiskoht"
                    value={valjumiskoht}
                    onChange={(e) => setValjumiskoht(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Saabumiskoht"
                    value={saabumiskoht}
                    onChange={(e) => setSaabumiskoht(e.target.value)}
                />
                <br />
                <input
                    type="datetime-local"
                    placeholder="Valjumisaeg"
                    value={valjumisaeg}
                    onChange={(e) => setValjumisaeg(e.target.value)}
                />
                <br />
                <input
                    type="datetime-local"
                    placeholder="Saabumisaeg"
                    value={saabumisaeg}
                    onChange={(e) => setSaabumisaeg(e.target.value)}
                />
                <br />
                {editId ? (
                    <button onClick={Update}>Update Lennujaam</button>
                ) : (
                    <button onClick={Add}>Add Lennujaam</button>
                )}
                <button onClick={clearForm}>Clear</button>
            </div>

            {message && <p>{message}</p>}

            <h2>Lennujaamad</h2>
            <table>
                <thead>
                    <tr>
                        <th>Väljumiskoht</th>
                        <th>Saabumiskoht</th>
                        <th>Valjumisaeg</th>
                        <th>Saabumisaeg</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {lennujaamad.map(lennujaam => (
                    <tr key={lennujaam.id}>
                        <td>{lennujaam.valjumiskoht}</td>
                        <td>{lennujaam.saabumiskoht}</td>
                        <td>{lennujaam.valjumisaeg}</td>
                        <td>{lennujaam.saabumisaeg}</td>
                        <td>
                            <button onClick={() => Edit(lennujaam.id)}>Edit</button>
                            <button id="delete" onClick={() => Delete(lennujaam.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default LennujaamAdmin;
