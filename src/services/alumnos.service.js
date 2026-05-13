const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');

const getAll = async (page, size, id_rol) => {
    const from = page * size;
    const to = from + size - 1;

    let query = supabase
        .from('usuarios')
        .select('id_usuario, username, email, nombre, id_rol, activo, fecha_creacion', { count: 'exact' })
        .eq('activo', true)
        .range(from, to);

    // MAESTRO no puede ver al ADMIN
    if (id_rol === 3) {
        query = query.neq('id_rol', 1);
    }

    const { data, error, count } = await query;

    if (error) {
        const err = new Error('Error al obtener alumnos');
        err.status = 500;
        err.error = 'Internal Server Error';
        throw err;
    }

    return {
        content: data,
        page,
        size,
        totalElements: count,
        totalPages: Math.ceil(count / size),
    };
};

const getById = async (id) => {
    const { data, error } = await supabase
        .from('usuarios')
        .select('id_usuario, username, email, nombre, id_rol, activo, fecha_creacion')
        .eq('id_usuario', id)
        .eq('activo', true)
        .single();

    if (error || !data) {
        const err = new Error('Alumno no encontrado');
        err.status = 404;
        err.error = 'Not Found';
        throw err;
    }

    return data;
};

const create = async (data) => {
    const { username, email, nombre, password, id_rol } = data;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data: alumno, error } = await supabase
        .from('usuarios')
        .insert({ username, email, nombre, password: hashedPassword, id_rol })
        .select('id_usuario, username, email, nombre, id_rol, activo, fecha_creacion')
        .single();

    if (error) {
        if (error.code === '23505') {
        const err = new Error('El username o email ya existe');
        err.status = 409;
        err.error = 'Conflict';
        throw err;
        }
        const err = new Error('Error al crear alumno');
        err.status = 500;
        err.error = 'Internal Server Error';
        throw err;
    }

    return alumno;
};

const update = async (id, data) => {
    const { username, email, nombre, id_rol } = data;

    const { data: alumno, error } = await supabase
        .from('usuarios')
        .update({ username, email, nombre, id_rol })
        .eq('id_usuario', id)
        .eq('activo', true)
        .select('id_usuario, username, email, nombre, id_rol, activo, fecha_creacion')
        .single();

    if (error || !alumno) {
        if (error?.code === '23505') {
        const err = new Error('El username o email ya existe');
        err.status = 409;
        err.error = 'Conflict';
        throw err;
        }
        const err = new Error('Alumno no encontrado');
        err.status = 404;
        err.error = 'Not Found';
        throw err;
    }

    return alumno;
};

const remove = async (id) => {
    const { data, error } = await supabase
        .from('usuarios')
        .update({ activo: false })
        .eq('id_usuario', id)
        .eq('activo', true)
        .select()
        .single();

    if (error || !data) {
        const err = new Error('Alumno no encontrado');
        err.status = 404;
        err.error = 'Not Found';
        throw err;
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};