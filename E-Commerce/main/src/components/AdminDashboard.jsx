import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', password: '' });
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, description: '' });
  const [newAdmin, setNewAdmin] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/admin/login');

    const fetchData = async () => {
      try {
        const [usersRes, productsRes, adminsRes, ordersRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:5000/api/admin/products', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:5000/api/admin/admins', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:5000/api/admin/orders', { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setUsers(usersRes.data);
        setProducts(productsRes.data);
        setAdmins(adminsRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error(err);
        navigate('/admin/login');
      }
    };
    fetchData();
  }, [navigate]);

  const handleAddUser = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.post('http://localhost:5000/api/admin/users', newUser, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers([...users, res.data]);
    setNewUser({ email: '', password: '' });
  };

  const handleDeleteUser = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(users.filter(user => user._id !== id));
  };

  const handleAddProduct = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.post('http://localhost:5000/api/admin/products', newProduct, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts([...products, res.data]);
    setNewProduct({ name: '', price: 0, description: '' });
  };

  const handleDeleteProduct = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(products.filter(product => product._id !== id));
  };

  const handleAddAdmin = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.post('http://localhost:5000/api/admin/admins', newAdmin, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAdmins([...admins, res.data]);
    setNewAdmin({ email: '', password: '' });
  };

  const handleDeleteAdmin = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/admin/admins/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAdmins(admins.filter(admin => admin._id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Users Section */}
        <div>
          <h2 className="text-xl font-semibold">Users</h2>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="border p-2 mr-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="border p-2 mr-2"
            />
            <button onClick={handleAddUser} className="bg-blue-500 text-white p-2">Add User</button>
          </div>
          <ul>
            {users.map(user => (
              <li key={user._id} className="flex justify-between p-2">
                {user.email}
                <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white p-1">Delete</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-xl font-semibold">Products</h2>
          <div>
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border p-2 mr-2"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="border p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="border p-2 mr-2"
            />
            <button onClick={handleAddProduct} className="bg-blue-500 text-white p-2">Add Product</button>
          </div>
          <ul>
            {products.map(product => (
              <li key={product._id} className="flex justify-between p-2">
                {product.name} - ${product.price}
                <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-500 text-white p-1">Delete</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Admins Section */}
        <div>
          <h2 className="text-xl font-semibold">Admins</h2>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={newAdmin.email}
              onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
              className="border p-2 mr-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={newAdmin.password}
              onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
              className="border p-2 mr-2"
            />
            <button onClick={handleAddAdmin} className="bg-blue-500 text-white p-2">Add Admin</button>
          </div>
          <ul>
            {admins.map(admin => (
              <li key={admin._id} className="flex justify-between p-2">
                {admin.email}
                <button onClick={() => handleDeleteAdmin(admin._id)} className="bg-red-500 text-white p-1">Delete</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Orders Section */}
        <div>
          <h2 className="text-xl font-semibold">Orders</h2>
          <ul>
            {orders.map(order => (
              <li key={order._id} className="p-2">
                User: {order.user.email} - Products: {order.products.map(p => p.product.name).join(', ')}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;