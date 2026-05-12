const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
        timestamp: new Date().toISOString(),
        status: 401,
        error: 'Unauthorized',
        message: 'Token no proporcionado',
        path: req.originalUrl,
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
        timestamp: new Date().toISOString(),
        status: 401,
        error: 'Unauthorized',
        message: 'Token inválido o expirado',
        path: req.originalUrl,
        });
    }
};

const checkRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
        return res.status(401).json({
            timestamp: new Date().toISOString(),
            status: 401,
            error: 'Unauthorized',
            message: 'No autenticado',
            path: req.originalUrl,
        });
        }

        if (!roles.includes(req.user.id_rol)) {
        return res.status(403).json({
            timestamp: new Date().toISOString(),
            status: 403,
            error: 'Forbidden',
            message: 'No tienes permisos para realizar esta acción',
            path: req.originalUrl,
        });
        }

        next();
    };
};

module.exports = { authMiddleware, checkRole };