import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    try {
      await axios.post('http://localhost:5000/api/cart', { productId, quantity: 1 }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/cart');
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };


 return <div className="bg-blue-500 text-white p-4 rounded-lg">Test Tailwind</div>;

}

export default LandingPage;