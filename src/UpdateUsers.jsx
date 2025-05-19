import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateUsers() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3000/getusers/${id}`)
            .then((response) => {
                const { name, email, age } = response.data;
                setName(name || '');
                setEmail(email || '');
                setAge(age || '');
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching user:', err);
                setError('Failed to fetch user data. Please try again.');
                setLoading(false);
            });
    }, [id]);

    const update = (e) => {
        e.preventDefault();
        setError(null);
        axios
            .put(`http://localhost:3000/update-users/${id}`, { name, email, age })
            .then((response) => {
                console.log('Update successful:', response.data);
                navigate('/users');
            })
            .catch((err) => {
                console.error('Error updating user:', err);
                setError('Failed to update user. Please try again.');
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div className="error-message">
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    return (
        <div className="update-form-page">
            <div className="update-form">
                <form onSubmit={update}>
                    <div className="name">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="age">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            name="age"
                            id="age"
                            placeholder="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUsers;