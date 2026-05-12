const express = require('express');
const errorMiddleware = require('./middlewares/error.middleware');
const routes = require('./routes/index');

const app = express();

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/v1', routes);

// Manejo global de errores (siempre al final)
app.use(errorMiddleware);

module.exports = app;