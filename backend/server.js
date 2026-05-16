const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiLimiter = require('./middleware/rateLimiter.cjs');
const { notFound, errorHandler } = require('./middleware/errorHandler');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiLimiter);

connectDB();

app.get('/', (req, res) => {
  res.send('ProjectMaker AI Backend Running');
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/folders', require('./routes/folderRoutes'));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(
      `Port ${PORT} is already in use. The backend is probably already running.`
    );
    console.log(
      'Stop the existing backend process before starting another one, or change PORT in backend/.env.'
    );
    process.exit(1);
  }

  throw error;
});
