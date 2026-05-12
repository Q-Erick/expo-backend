const authService = require('../services/auth.service');

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
        const err = new Error('Username y password son requeridos');
        err.status = 400;
        err.error = 'Bad Request';
        throw err;
        }

        const result = await authService.login(username, password);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    login,
};