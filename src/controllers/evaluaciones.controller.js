const evaluacionesService = require('../services/evaluaciones.service');

// TODO: Implementar - POST /api/v1/evaluaciones
const create = async (req, res, next) => {
    try {
        // TODO: obtener id_exposicion, id_alumno_evaluador y detalles de req.body y llamar evaluacionesService.create
        // TODO: validar que detalles sea un array con id_criterio y calificacion
        // TODO: validar que calificacion este entre 0 y 10
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - GET /api/v1/evaluaciones/:id
const getById = async (req, res, next) => {
    try {
        // TODO: obtener id de req.params y llamar evaluacionesService.getById
    } catch (err) {
        next(err);
    }
};

module.exports = {
    create,
    getById,
};