const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tasksRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRoutes);

mongoose.connect('mongodb://localhost:27017/rpgfit')
  .then(() => console.log('🟢 MongoDB conectado'))
  .catch(err => console.error('🔴 Erro no MongoDB:', err));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('API RPGFIT 🛡️'));

app.listen(5000, '0.0.0.0', () => console.log('🔵 Servidor backend rodando em http://localhost:5000'));
