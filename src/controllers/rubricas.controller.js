const rubricasService = require('../services/rubricas.service');

// GET /api/v1/rubricas - Listar rúbricas paginadas
const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const size = parseInt(req.query.size) || 10;
        const data = await rubricasService.getAll(page, size);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

// GET /api/v1/rubricas/:id - Obtener rúbrica por ID
const getById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const data = await rubricasService.getById(id);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

// POST /api/v1/rubricas - Crear rúbrica
const create = async (req, res, next) => {
    try {
        const { nombre, descripcion, publicada } = req.body;
        const data = await rubricasService.create({ nombre, descripcion, publicada });
        res.status(201).json(data);
    } catch (err) {
        next(err);
    }
};

// PUT /api/v1/rubricas/:id - Actualizar rúbrica
const update = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { nombre, descripcion, publicada } = req.body;
        const data = await rubricasService.update(id, { nombre, descripcion, publicada });
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

// DELETE /api/v1/rubricas/:id - Eliminar rúbrica
const remove = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const data = await rubricasService.remove(id);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

// PUT /api/v1/rubricas/:id/publicar - Publicar rúbrica
const publish = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const data = await rubricasService.publish(id);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

// GET /api/v1/rubricas/:id/criterios - Listar criterios de una rúbrica
const getCriterios = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const data = await rubricasService.getCriterios(id);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

// POST /api/v1/rubricas/:id/criterios - Agregar criterio a rúbrica
const addCriterio = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { descripcion, ponderacion, escala_min, escala_max } = req.body;
        const data = await rubricasService.addCriterio(id, {
            descripcion,
            ponderacion,
            escala_min,
            escala_max
        });
        res.status(201).json(data);
    } catch (err) {
        next(err);
    }
};

// PUT /api/v1/rubricas/:id/criterios/:id_criterio - Actualizar criterio
const updateCriterio = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const id_criterio = parseInt(req.params.id_criterio);
        const { descripcion, ponderacion, escala_min, escala_max } = req.body;
        const data = await rubricasService.updateCriterio(id, id_criterio, {
            descripcion,
            ponderacion,
            escala_min,
            escala_max
        });
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

// DELETE /api/v1/rubricas/:id/criterios/:id_criterio - Eliminar criterio
const removeCriterio = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const id_criterio = parseInt(req.params.id_criterio);
        const data = await rubricasService.removeCriterio(id, id_criterio);
        res.status(200).json(data);
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
    publish,
    getCriterios,
    addCriterio,
    updateCriterio,
    removeCriterio,
};