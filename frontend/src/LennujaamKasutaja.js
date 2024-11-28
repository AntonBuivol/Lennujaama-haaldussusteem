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
    const navigate = useNavigate();
    const [filteredLennujaamad, setFilteredLennujaamad] = useState([])
    const [sorting, setSort] = useState({ key: '', direction: 'asc' });

    useEffect(() => {
        fetchLennujaamad();
    }, []);

    const fetchLennujaamad = async () => {
        try {
            const response = await fetch("https://localhost:7050/Lennujaam");
            const data = await response.json();
            setLennujaamad(data);
            setFilteredLennujaamad(data);
        } catch(error) {
            setMessage("Error fetching data: " + error.message);
        }
    };

    const filterLennujaamad = () => {
        let filtered = lennujaamad;

        if (valjumiskoht) {
            filtered = filtered.filter(l =>
                l.valjumiskoht.toLowerCase().includes(valjumiskoht.toLowerCase())
            );
        }

        if (saabumiskoht) {
            filtered = filtered.filter(l =>
                l.saabumiskoht.toLowerCase().includes(saabumiskoht.toLowerCase())
            );
        }

        if (valjumisaeg) {
            filtered = filtered.filter(l =>
                new Date(l.valjumisaeg) >= new Date(valjumisaeg)
            );
        }

        if (saabumisaeg) {
            filtered = filtered.filter(l =>
                new Date(l.saabumisaeg) <= new Date(saabumisaeg)
            );
        }

        setFilteredLennujaamad(filtered);
    };

    const ResetFilter = () => {
        setValjumiskoht('');
        setSaabumiskoht('');
        setValjumisaeg('');
        setSaabumisaeg('');
        filterLennujaamad();
    };

    const Sort = (key) => {
        const direction = sorting.key === key && sorting.direction === 'asc' ? 'desc' : 'asc';
        setSort({ key, direction });

        const sorted = [...filteredLennujaamad].sort((a, b) => {
            if (key === 'valjumisaeg' || key === 'saabumisaeg') {
                return direction === 'asc'
                    ? new Date(a[key]) - new Date(b[key])
                    : new Date(b[key]) - new Date(a[key]);
            } else {
                return direction === 'asc'
                    ? a[key].localeCompare(b[key])
                    : b[key].localeCompare(a[key]);
            }
        });
        setFilteredLennujaamad(sorted);
    };

    return (
        <div className="App">
            <h1>Lennujaama Haldussüsteem</h1>
            <h2>Lennujaamad</h2>
            <form>
                <label for="searchValjumiskoht">Search Väljumiskoht:</label>
                <input type="text" value={valjumiskoht} onChange={(e) => setValjumiskoht(e.target.value)} placeholder="Serach Väljumiskoht" onKeyUp={filterLennujaamad} />
                <br/>
                <label for="searchSaabumiskoht">Search Saabumiskoht:</label>
                <input type="text" value={saabumiskoht} onChange={(e) => setSaabumiskoht(e.target.value)} placeholder="Serach Saabumiskoht" onKeyUp={filterLennujaamad} />
                <br/>
                <label for="searchValjumisaeg">Search Väljumisaeg:</label>
                <input type="date" value={valjumisaeg} onChange={(e) => setValjumisaeg(e.target.value)} onKeyUp={filterLennujaamad} />
                <br/>
                <label for="searchSaabumisaeg">Search Saabumisaeg:</label>
                <input type="date" value={saabumisaeg} onChange={(e) => setSaabumisaeg(e.target.value)} onKeyUp={filterLennujaamad} />
                <br />
                <button onClick={ResetFilter}>Reset</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => Sort('valjumiskoht')}>Väljumiskoht</th>
                        <th onClick={() => Sort('saabumiskoht')}>Saabumiskoht</th>
                        <th onClick={() => Sort('valjumisaeg')}>Valjumisaeg</th>
                        <th onClick={() => Sort('saabumisaeg')}>Saabumisaeg</th>
                    </tr>
                </thead>
                {filteredLennujaamad.map(lennujaam => (
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