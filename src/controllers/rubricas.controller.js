const rubricasService = require('../services/rubricas.service');

// TODO: Implementar - GET /api/v1/rubricas
const getAll = async (req, res, next) => {
    try {
        // TODO: obtener page y size de req.query y llamar rubricasService.getAll
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - GET /api/v1/rubricas/:id
const getById = async (req, res, next) => {
    try {
        // TODO: obtener id de req.params y llamar rubricasService.getById
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - POST /api/v1/rubricas
const create = async (req, res, next) => {
    try {
        // TODO: obtener nombre y descripcion de req.body y llamar rubricasService.create
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - PUT /api/v1/rubricas/:id
const update = async (req, res, next) => {
    try {
        // TODO: obtener id de req.params y body de req.body y llamar rubricasService.update
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - DELETE /api/v1/rubricas/:id
const remove = async (req, res, next) => {
    try {
        // TODO: obtener id de req.params y llamar rubricasService.remove
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - GET /api/v1/rubricas/:id/criterios
const getCriterios = async (req, res, next) => {
    try {
        // TODO: obtener id de req.params y llamar rubricasService.getCriterios
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - POST /api/v1/rubricas/:id/criterios
const addCriterio = async (req, res, next) => {
    try {
        // TODO: obtener id de req.params y body de req.body y llamar rubricasService.addCriterio
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - PUT /api/v1/rubricas/:id/criterios/:id_criterio
const updateCriterio = async (req, res, next) => {
    try {
        // TODO: obtener id e id_criterio de req.params y body de req.body y llamar rubricasService.updateCriterio
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - DELETE /api/v1/rubricas/:id/criterios/:id_criterio
const removeCriterio = async (req, res, next) => {
    try {
        // TODO: obtener id e id_criterio de req.params y llamar rubricasService.removeCriterio
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
    getCriterios,
    addCriterio,
    updateCriterio,
    removeCriterio,
};