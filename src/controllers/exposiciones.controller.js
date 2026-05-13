const exposicionesService = require('../services/exposiciones.service');

// TODO: Implementar - GET /api/v1/exposiciones
const getAll = async (req, res, next) => {
    try {
        const page     = parseInt(req.query.page)  || 0;
        const size     = parseInt(req.query.size)  || 10;
        const filters  = {
            estado:     req.query.estado     || null,
            id_equipo:  req.query.id_equipo  ? parseInt(req.query.id_equipo) : null,
            titulo:     req.query.titulo     || null,
        };
        const data = await exposicionesService.getAll(page, size, filters);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - GET /api/v1/exposiciones/:id
const getById = async (req, res, next) => {
    try {
        const id   = parseInt(req.params.id);
        const data = await exposicionesService.getById(id);
        res.status(200).json(data);    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - POST /api/v1/exposiciones
const create = async (req, res, next) => {
    try {
        const { titulo, descripcion, id_equipo, id_rubrica, fecha_inicio, fecha_fin } = req.body;

        if (!titulo || !id_equipo || !id_rubrica || !fecha_inicio || !fecha_fin) {
            const err = new Error('titulo, id_equipo, id_rubrica, fecha_inicio y fecha_fin son requeridos');
            err.status = 400;
            err.error  = 'Bad Request';
            return next(err);
        }

        const data = await exposicionesService.create({
            titulo, descripcion, id_equipo, id_rubrica, fecha_inicio, fecha_fin,
        });
        res.status(201).json(data);    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - PUT /api/v1/exposiciones/:id
const update = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { titulo, descripcion, id_equipo, id_rubrica, fecha_inicio, fecha_fin } = req.body;

        if (!titulo || !id_equipo || !id_rubrica || !fecha_inicio || !fecha_fin) {
            const err = new Error('titulo, id_equipo, id_rubrica, fecha_inicio y fecha_fin son requeridos');
            err.status = 400;
            err.error  = 'Bad Request';
            return next(err);
        }

        const data = await exposicionesService.update(id, {
            titulo, descripcion, id_equipo, id_rubrica, fecha_inicio, fecha_fin,
        });
        res.status(200).json(data);    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - DELETE /api/v1/exposiciones/:id
const remove = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        await exposicionesService.remove(id);
        res.status(204).send();    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - PATCH /api/v1/exposiciones/:id/estado
const changeEstado = async (req, res, next) => {
    try {
        const id     = parseInt(req.params.id);
        const { estado } = req.body;

        if (!estado) {
            const err = new Error('estado es requerido');
            err.status = 400;
            err.error  = 'Bad Request';
            return next(err);
        }

        const data = await exposicionesService.changeEstado(id, estado);
        res.status(200).json({ message: `Exposición ${estado.toLowerCase()} exitosamente`, data });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    changeEstado,
};