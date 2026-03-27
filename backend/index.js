const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5011;

// CORS — allow all origins (Vercel, Railway, localhost)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors()); // pre-flight

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/categories', require('./routes/categories'));
app.use('/api/products', require('./routes/products'));
app.use('/api/news', require('./routes/news'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/videos', require('./routes/videos'));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Gan Tu API is running' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Gan Tu Backend API', docs: '/api/health' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Gan Tu Backend running on port ${PORT}`);
});
