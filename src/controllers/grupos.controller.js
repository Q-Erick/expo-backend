const gruposService = require('../services/grupos.service');

const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const size = parseInt(req.query.size) || 10;

        const result = await gruposService.getAll(page, size);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const result = await gruposService.getById(id);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const { nombre_grupo, ids_materias } = req.body;

        if (!nombre_grupo) {
        const err = new Error('nombre_grupo es requerido');
        err.status = 400;
        err.error = 'Bad Request';
        throw err;
        }

        const result = await gruposService.create({ nombre_grupo, ids_materias });
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { nombre_grupo, ids_materias } = req.body;

        if (!nombre_grupo) {
        const err = new Error('nombre_grupo es requerido');
        err.status = 400;
        err.error = 'Bad Request';
        throw err;
        }

        const result = await gruposService.update(id, { nombre_grupo, ids_materias });
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        await gruposService.remove(id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

const addAlumno = async (req, res, next) => {
    try {
        const id_grupo = parseInt(req.params.id);
        const { id_alumno } = req.body;

        if (!id_alumno) {
        const err = new Error('id_alumno es requerido');
        err.status = 400;
        err.error = 'Bad Request';
        throw err;
        }

        await gruposService.addAlumno(id_grupo, id_alumno);
        res.status(200).json({ message: 'Alumno agregado al grupo correctamente' });
    } catch (err) {
        next(err);
    }
};

const removeAlumno = async (req, res, next) => {
    try {
        const id_grupo = parseInt(req.params.id);
        const id_alumno = parseInt(req.params.id_alumno);

        await gruposService.removeAlumno(id_grupo, id_alumno);
        res.status(204).send();
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
};