import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

function Cart() {
  const [cart, setCart] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to view your cart');
      setLoading(false);
      navigate('/login');
      return;
    }

    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data);
        setError('');
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('Failed to load cart. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [navigate]);

  const handleBuy = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to place an order');
      navigate('/login');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/orders', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Generate PDF
      const doc = new jsPDF();
      doc.text('Order Receipt', 10, 10);
      doc.text(`Order ID: ${res.data._id}`, 10, 20);
      let y = 30;
      res.data.products.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.product.name} - $${item.product.price} x ${item.quantity}`, 10, y);
        y += 10;
      });
      doc.text(`Total: $${res.data.products.reduce((sum, item) => sum + item.product.price * item.quantity, 0)}`, 10, y);
      doc.save(`order_${res.data._id}.pdf`);

      navigate('/');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError('Failed to place order. Please try again.');
      }
    }
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
      <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-red-500">Close</button>
      <h2 className="text-xl font-bold p-4">Cart</h2>
      {loading ? (
        <p className="p-4">Loading...</p>
      ) : error ? (
        <p className="p-4 text-red-500">{error}</p>
      ) : cart && cart.products.length > 0 ? (
        <div>
          <ul className="p-4">
            {cart.products.map(item => (
              <li key={item.product._id} className="mb-4 flex items-center">
                {item.product.image && (
                  <img src={`http://localhost:5000${item.product.image}`} alt={item.product.name} className="w-12 h-12 object-cover mr-4" />
                )}
                <div>
                  <p>{item.product.name}</p>
                  <p className="text-sm">${item.product.price} x {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handleBuy} className="bg-green-500 text-white p-2 m-4 w-[calc(100%-2rem)]">Buy Now</button>
        </div>
      ) : (
        <p className="p-4">Cart is empty</p>
      )}
    </div>
  );
}

export default Cart;