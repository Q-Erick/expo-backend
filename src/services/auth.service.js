const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (username, password) => {
    const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('username', username)
        .eq('activo', true)
        .single();

    if (error || !usuario) {
        const err = new Error('Credenciales inválidas');
        err.status = 401;
        err.error = 'Unauthorized';
        throw err;
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (!passwordValido) {
        const err = new Error('Credenciales inválidas');
        err.status = 401;
        err.error = 'Unauthorized';
        throw err;
    }

    const token = jwt.sign(
        {
        id_usuario: usuario.id_usuario,
        username: usuario.username,
        id_rol: usuario.id_rol,
        },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );

    return { token };
};

module.exports = {
    login,
};