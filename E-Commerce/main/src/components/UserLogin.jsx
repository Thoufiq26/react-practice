import React, { useState } from 'react';

const UserLogin = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({ username: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { username: '', email: '', password: '' };

        if (!formData.username) {
            newErrors.username = 'Username is required';
            isValid = false;
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
            isValid = false;
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
                console.log('Signup attempted with:', formData);
                setIsLoading(false);
                setFormData({ username: '', email: '', password: '' });
            }, 1000);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    return (
        <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Join Us</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        className={`mt-1 w-full px-4 py-3 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition`}
                        placeholder="Your username"
                    />
                    {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition`}
                        placeholder="your@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`mt-1 w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 transition`}
                        placeholder="••••••"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 rounded-lg text-white font-semibold ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700'} transition duration-300`}
                >
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account? <a href="#" className="text-gray-800 font-semibold hover:underline">Sign In</a>
            </p>
        </div>
    );
};

export default UserLogin;