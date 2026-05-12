const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Error interno del servidor';

    res.status(status).json({
        timestamp: new Date().toISOString(),
        status,
        error: err.error || 'Internal Server Error',
        message,
        path: req.originalUrl,
    });
};

module.exports = errorMiddleware;