const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const { verificarToken } = require('./seguridad/auth');

const app = express();

// Conexión a MongoDB
connectDB();
app.use(cors());

// Middleware para leer JSON
app.use(express.json());

// Rutas API
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/peliculas', require('./routes/peliculas')); // ✅ NUEVO

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Vistas
app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/subir', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'subir.html'));
});

app.get('/ver_peliculas', (req, res) => {  
  res.sendFile(path.join(__dirname, 'public', 'ver_peliculas.html'));
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));



