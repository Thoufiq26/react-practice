const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const verifyToken = require('./middlewares/verifyToken');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'Uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Seed admin and test users
const seedUsers = async () => {
  try {
    console.log('Starting user seeding...');
    // Clear existing users (optional, for testing)
    // await User.deleteMany({});

    // Seed admin
    await User.deleteOne({ email: 'admin@example.com' });
    const adminHashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      email: 'admin@example.com',
      password: adminHashedPassword,
      role: 'admin',
    });
    console.log('Admin user seeded');

    // Seed test user 1
    await User.deleteOne({ email: 'user@example.com' });
    const user1HashedPassword = await bcrypt.hash('user123', 10);
    await User.create({
      email: 'user@example.com',
      password: user1HashedPassword,
      role: 'user',
    });
    console.log('Test user 1 seeded');

    // Seed test user 2
    await User.deleteOne({ email: 'ms@gmail.com' });
    const user2HashedPassword = await bcrypt.hash('12345678', 10);
    await User.create({
      email: 'ms@gmail.com',
      password: user2HashedPassword,
      role: 'user',
    });
    console.log('Test user 2 (ms@gmail.com) seeded');
  } catch (err) {
    console.error('Error seeding users:', err);
  }
};
seedUsers();

// ... (rest of the routes remain unchanged, included for completeness)
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, role: 'admin' });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/users/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role: 'user' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request:', { email, password });
  try {
    const user = await User.findOne({ email, role: 'user' });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/admin/users', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  try {
    const users = await User.find({ role: 'user' });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/admin/users', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role: 'user' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/admin/users/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/admin/products', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/admin/products', verifyToken, upload.single('image'), async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  const { name, price, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';
  try {
    const product = await Product.create({ name, price, description, image });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/admin/products/:id', verifyToken, upload.single('image'), async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  const { name, price, description } = req.body;
  const updateData = { name, price, description };
  if (req.file) updateData.image = `/uploads/${req.file.filename}`;
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/admin/products/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/admin/admins', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  try {
    const admins = await User.find({ role: 'admin' });
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/admin/admins', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await User.create({ email, password: hashedPassword, role: 'admin' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/admin/admins/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Admin deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/admin/orders', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
  try {
    const orders = await Order.find().populate('user products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/cart', verifyToken, async (req, res) => {
  try {
    const cart = await Order.findOne({ user: req.user.id, status: 'cart' }).populate('products.product');
    res.json(cart || { products: [] });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/cart', verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Order.findOne({ user: req.user.id, status: 'cart' });
    if (!cart) {
      cart = await Order.create({ user: req.user.id, products: [{ product: productId, quantity }], status: 'cart' });
    } else {
      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      await cart.save();
    }
    await cart.populate('products.product');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/orders', verifyToken, async (req, res) => {
  try {
    const cart = await Order.findOne({ user: req.user.id, status: 'cart' });
    if (!cart) return res.status(400).json({ message: 'Cart is empty' });
    cart.status = 'ordered';
    await cart.save();
    await cart.populate('products.product');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(process.env.PORT || 5000, () => console.log('Server running on port 5000'));