import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StyleLennujaamad.css';

function LennujaamKasutaja() {
    const [lennujaamad, setLennujaamad] = useState([]);
    const [valjumiskoht, setValjumiskoht] = useState('');
    const [saabumiskoht, setSaabumiskoht] = useState('');
    const [valjumisaeg, setValjumisaeg] = useState('');
    const [saabumisaeg, setSaabumisaeg] = useState('');
    const [message, setMessage] = useState('');
    const [sort, setSort] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetchLennujaamad();
    }, []);

    const fetchLennujaamad = async () => {
        try {
            const response = await fetch("https://localhost:7050/Lennujaam");
            const data = await response.json();
            setLennujaamad(data);
        } catch(error) {
            setMessage("Error fetching data: " + error.message);
        }
    };



    return (
        <div className="App">
            <h1>Lennujaama Haldussüsteem</h1>
            <h2>Lennujaamad</h2>
            <form>
                <label for="searchValjumiskoht">Search Väljumiskoht:</label>
                <input type="text" id="searchValjumiskoht" name="searchValjumiskoht" placeholder="Serach Väljumiskoht" />
                <br/>
                <label for="searchSaabumiskoht">Search Saabumiskoht:</label>
                <input type="text" id="searchSaabumiskoht" name="searchSaabumiskoht" placeholder="Serach Saabumiskoht" />
                <br/>
                <label for="searchValjumisaeg">Search Väljumisaeg:</label>
                <input type="datetime-local" id="searchValjumisaeg" name="searchValjumisaeg" />
                <br/>
                <label for="searchSaabumisaeg">Search Saabumisaeg:</label>
                <input type="datetime-local" id="searchSaabumisaeg" name="searchSaabumisaeg" />
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Väljumiskoht</th>
                        <th>Saabumiskoht</th>
                        <th>Valjumisaeg</th>
                        <th>Saabumisaeg</th>
                    </tr>
                </thead>
                {lennujaamad.map(lennujaam => (
                    <tr key={lennujaam.id}>
                        <td>{lennujaam.valjumiskoht}</td>
                        <td>{lennujaam.saabumiskoht}</td>
                        <td>{lennujaam.valjumisaeg}</td>
                        <td>{lennujaam.saabumisaeg}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default LennujaamKasutaja;