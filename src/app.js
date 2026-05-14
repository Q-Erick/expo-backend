const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./middlewares/error.middleware');
const routes = require('./routes/index');

const app = express();

// Middlewares globales
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

// Rutas
app.use('/api/v1', routes);

// Manejo global de errores (siempre al final)
app.use(errorMiddleware);

module.exports = app;