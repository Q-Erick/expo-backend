const materiasService = require('../services/materias.service');

const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const size = parseInt(req.query.size) || 10;
        const nombre = req.query.nombre || null;

        const result = await materiasService.getAll(page, size, nombre);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const result = await materiasService.getById(id);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const { clave_materia, nombre_materia } = req.body;

        if (!clave_materia || !nombre_materia) {
        const err = new Error('clave_materia y nombre_materia son requeridos');
        err.status = 400;
        err.error = 'Bad Request';
        throw err;
        }

        const result = await materiasService.create({ clave_materia, nombre_materia });
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { clave_materia, nombre_materia } = req.body;

        if (!clave_materia || !nombre_materia) {
        const err = new Error('clave_materia y nombre_materia son requeridos');
        err.status = 400;
        err.error = 'Bad Request';
        throw err;
        }

        const result = await materiasService.update(id, { clave_materia, nombre_materia });
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        await materiasService.remove(id);
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
};