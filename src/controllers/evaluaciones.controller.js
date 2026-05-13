const evaluacionesService = require('../services/evaluaciones.service');

// TODO: Implementar - POST /api/v1/evaluaciones
const create = async (req, res, next) => {
    try {
        const { id_exposicion, id_alumno_evaluador, detalles } = req.body;

        if (!id_exposicion || !id_alumno_evaluador) {
            const err = new Error('id_exposicion e id_alumno_evaluador son requeridos');
            err.status = 400;
            err.error  = 'Bad Request';
            return next(err);
        }

        if (!Array.isArray(detalles) || detalles.length === 0) {
            const err = new Error('detalles debe ser un array con al menos un criterio');
            err.status = 400;
            err.error  = 'Bad Request';
            return next(err);
        }

        // Validar estructura de cada detalle
        for (const d of detalles) {
            if (d.id_criterio === undefined || d.calificacion === undefined) {
                const err = new Error('Cada detalle debe tener id_criterio y calificacion');
                err.status = 400;
                err.error  = 'Bad Request';
                return next(err);
            }
            if (d.calificacion < 0 || d.calificacion > 10) {
                const err = new Error('La calificacion debe estar entre 0 y 10');
                err.status = 400;
                err.error  = 'Bad Request';
                return next(err);
            }
        }

        const data = await evaluacionesService.create({
            id_exposicion:       parseInt(id_exposicion),
            id_alumno_evaluador: parseInt(id_alumno_evaluador),
            detalles,
        });
        res.status(201).json(data);

    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - GET /api/v1/evaluaciones/:id
const getById = async (req, res, next) => {
    try {
        const id   = parseInt(req.params.id);
        const data = await evaluacionesService.getById(id);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    create,
    getById,
};