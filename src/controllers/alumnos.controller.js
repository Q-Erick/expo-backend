const alumnosService = require('../services/alumnos.service');

const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const size = parseInt(req.query.size) || 10;
        const id_rol = req.user.id_rol; 

        const result = await alumnosService.getAll(page, size, id_rol);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const result = await alumnosService.getById(id);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const { username, email, nombre, password, id_rol } = req.body;

        if (!username || !email || !password || !id_rol) {
        const err = new Error('username, email, password e id_rol son requeridos');
        err.status = 400;
        err.error = 'Bad Request';
        throw err;
        }

        const result = await alumnosService.create({ username, email, nombre, password, id_rol });
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { username, email, nombre, id_rol } = req.body;

        if (!username || !email || !id_rol) {
        const err = new Error('username, email e id_rol son requeridos');
        err.status = 400;
        err.error = 'Bad Request';
        throw err;
        }

        const result = await alumnosService.update(id, { username, email, nombre, id_rol });
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        await alumnosService.remove(id);
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