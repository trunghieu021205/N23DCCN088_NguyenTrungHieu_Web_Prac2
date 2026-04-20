const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const morgan = require('morgan');

// dùng middleware morgan
app.use(morgan('dev'));
// Middleware
app.use(cors());
app.use(express.json()); // Cho phép server đọc JSON từ request body

// Import routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch(err => console.error('❌ Connection error:', err));

// Route kiểm tra server
app.get('/', (req, res) => {
  res.send('API Quản lý Đơn hàng đang hoạt động...');
});
// Route kiểm tra kết nối DB
app.get("/test-db", async (req, res) => {
  try {
    if (!mongoose.connection.db) {
      return res.status(500).json({ message: "DB not connected yet" });
    }

    const result = await mongoose.connection.db.admin().ping();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});
// Khởi chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});