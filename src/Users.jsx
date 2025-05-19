import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Users.css';
function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    // Fetch users on mount
    useEffect(() => {
        axios
            .get('http://localhost:3000/users')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((err) => {
                console.error('Error fetching users:', err);
                setError('Failed to fetch users. Please try again.');
            });
    }, []);

    // Handle delete action
    const handleDelete = (id, name) => {
        if (!window.confirm(`Are you sure you want to delete ${name || 'this user'}?`)) {
            return;
        }

        axios
            .delete(`http://localhost:3000/delete-users/${id}`)
            .then(() => {
                setUsers(users.filter((user) => user._id !== id));
            })
            .catch((err) => {
                console.error('Error deleting user:', err);
                setError('Failed to delete user. Please try again.');
            });
    };

    if (error) {
        return (
            <div className="error-message">
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    return (
        <>
        <h1>CRUD USING MONGODB</h1>
        <div className="users-page">
            <button className="add-button">
                <Link className="add-link" to="/create-users">
                    Add
                </Link>
            </button>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name || 'N/A'}</td>
                                <td>{user.email || 'N/A'}</td>
                                <td>{user.age || 'N/A'}</td>
                                <td>
                                    <button className="update-button">
                                        <Link to={`/update-users/${user._id}`}>Update</Link>
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(user._id, user.name)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div></>
    );
}

export default Users;