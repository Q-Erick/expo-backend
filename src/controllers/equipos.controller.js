const equiposService = require('../services/equipos.service');

// TODO: Implementar - GET /api/v1/equipos
const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const size = parseInt(req.query.size) || 10;
        const data = await equiposService.getAll(page, size);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - GET /api/v1/equipos/:id
const getById = async (req, res, next) => {
    try {
        const id   = parseInt(req.params.id);
        const data = await equiposService.getById(id);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - POST /api/v1/equipos
const create = async (req, res, next) => {
    try {
        const { nombre_equipo, id_grupo } = req.body;

        if (!nombre_equipo || !id_grupo) {
            const err = new Error('nombre_equipo e id_grupo son requeridos');
            err.status = 400;
            err.error  = 'Bad Request';
            return next(err);
        }

        const data = await equiposService.create({ nombre_equipo, id_grupo });
        res.status(201).json(data);
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - PUT /api/v1/equipos/:id
const update = async (req, res, next) => {
    try {
        const id               = parseInt(req.params.id);
        const { nombre_equipo, id_grupo } = req.body;

        if (!nombre_equipo || !id_grupo) {
            const err = new Error('nombre_equipo e id_grupo son requeridos');
            err.status = 400;
            err.error  = 'Bad Request';
            return next(err);
        }

        const data = await equiposService.update(id, { nombre_equipo, id_grupo });
        res.status(200).json(data);

    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - DELETE /api/v1/equipos/:id
const remove = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        await equiposService.remove(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - POST /api/v1/equipos/:id/alumnos
const addAlumno = async (req, res, next) => {
    try {
        const id_equipo = parseInt(req.params.id);
        const { id_alumno } = req.body;

        if (!id_alumno) {
            const err = new Error('id_alumno es requerido');
            err.status = 400;
            err.error  = 'Bad Request';
            return next(err);
        }

        const data = await equiposService.addAlumno(id_equipo, parseInt(id_alumno));
        res.status(200).json({ message: 'Alumno agregado al equipo exitosamente', data });
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - DELETE /api/v1/equipos/:id/alumnos/:id_alumno
const removeAlumno = async (req, res, next) => {
    try {
        const id_equipo = parseInt(req.params.id);
        const id_alumno = parseInt(req.params.id_alumno);
        await equiposService.removeAlumno(id_equipo, id_alumno);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - PATCH /api/v1/equipos/:id/jefe
const assignJefe = async (req, res, next) => {
    try {
        const id_equipo = parseInt(req.params.id);
        const { id_jefe } = req.body;

        if (!id_jefe) {
            const err = new Error('id_jefe es requerido');
            err.status = 400;
            err.error  = 'Bad Request';
            return next(err);
        }

        const data = await equiposService.assignJefe(id_equipo, parseInt(id_jefe));
        res.status(200).json({ message: 'Jefe asignado exitosamente', data });
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
    addAlumno,
    removeAlumno,
    assignJefe,
};