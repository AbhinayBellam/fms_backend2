const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = require('./app');
const mongoose = require('mongoose');
dotenv.config();



connectDB();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  });
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});