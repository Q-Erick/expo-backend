const supabase = require('../config/supabase');

// TODO: Implementar - Registrar evaluación completa
const create = async (data) => {
  const { id_exposicion, id_alumno_evaluador, detalles } = data;

    // 1. Verificar que la exposición existe y está ABIERTA
    const { data: expo } = await supabase
        .from('exposiciones')
        .select('id_exposicion, estado, id_equipo, id_rubrica, equipos(id_grupo)')
        .eq('id_exposicion', id_exposicion)
        .single();

    if (!expo) {
        const err = new Error('Exposición no encontrada');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }

    if (expo.estado !== 'ABIERTA') {
        const err = new Error('La exposición no está abierta para evaluaciones');
        err.status = 400;
        err.error  = 'Bad Request';
        throw err;
    }

    const id_grupo = expo.equipos?.id_grupo;

    // 2. Verificar que el evaluador pertenece al grupo de la exposición
    const { data: enGrupo } = await supabase
        .from('equipo_alumno')
        .select('id_alumno, equipos!inner(id_grupo)')
        .eq('id_alumno', id_alumno_evaluador)
        .eq('equipos.id_grupo', id_grupo);

    if (!enGrupo || enGrupo.length === 0) {
        const err = new Error('El evaluador no pertenece al grupo de esta exposición');
        err.status = 403;
        err.error  = 'Forbidden';
        throw err;
    }

    // 3. Evitar autoevaluación: el evaluador no puede ser miembro del equipo que expone
    const { data: enEquipo } = await supabase
        .from('equipo_alumno')
        .select('id_alumno')
        .eq('id_equipo', expo.id_equipo)
        .eq('id_alumno', id_alumno_evaluador)
        .single();

    if (enEquipo) {
        const err = new Error('No puedes evaluar a tu propio equipo');
        err.status = 400;
        err.error  = 'Bad Request';
        throw err;
    }

    // 4. Verificar que no existe evaluación duplicada
    const { data: duplicada } = await supabase
        .from('evaluaciones')
        .select('id_evaluacion')
        .eq('id_exposicion', id_exposicion)
        .eq('id_alumno_evaluador', id_alumno_evaluador)
        .single();

    if (duplicada) {
        const err = new Error('Ya registraste una evaluación para esta exposición');
        err.status = 409;
        err.error  = 'Conflict';
        throw err;
    }

    // 5. Obtener criterios de la rúbrica y validar que se enviaron todos
    const { data: criterios } = await supabase
        .from('criterios')
        .select('id_criterio, escala_min, escala_max')
        .eq('id_rubrica', expo.id_rubrica);

    const idsCriterios = (criterios || []).map(c => c.id_criterio);
    const idsEnviados  = detalles.map(d => d.id_criterio);

    const faltantes = idsCriterios.filter(id => !idsEnviados.includes(id));
    const sobrantes = idsEnviados.filter(id => !idsCriterios.includes(id));

    if (faltantes.length > 0) {
        const err = new Error(`Faltan criterios obligatorios: ${faltantes.join(', ')}`);
        err.status = 400;
        err.error  = 'Bad Request';
        throw err;
    }

    if (sobrantes.length > 0) {
        const err = new Error(`Criterios no pertenecen a la rúbrica: ${sobrantes.join(', ')}`);
        err.status = 400;
        err.error  = 'Bad Request';
        throw err;
    }

    // 6. Validar rango de calificación por criterio
    for (const detalle of detalles) {
        const criterio = criterios.find(c => c.id_criterio === detalle.id_criterio);
        const cal      = parseFloat(detalle.calificacion);

        if (cal < parseFloat(criterio.escala_min) || cal > parseFloat(criterio.escala_max)) {
            const err = new Error(
                `Calificación fuera de rango para criterio ${detalle.id_criterio} ` +
                `(${criterio.escala_min}–${criterio.escala_max})`
            );
            err.status = 400;
            err.error  = 'Bad Request';
            throw err;
        }
    }

    // 7. Insertar evaluación
    const { data: evaluacion, error: evalError } = await supabase
        .from('evaluaciones')
        .insert({ id_exposicion, id_alumno_evaluador })
        .select()
        .single();

    if (evalError) {
        const err = new Error('Error al registrar la evaluación');
        err.status = 500;
        err.error  = 'Internal Server Error';
        throw err;
    }

    // 8. Insertar detalles
    const detallesInsert = detalles.map(d => ({
        id_evaluacion: evaluacion.id_evaluacion,
        id_criterio:   d.id_criterio,
        calificacion:  d.calificacion,
    }));

    const { error: detError } = await supabase
        .from('detalle_evaluacion')
        .insert(detallesInsert);

    if (detError) {
        // Rollback manual: eliminar la evaluación recién creada
        await supabase
            .from('evaluaciones')
            .delete()
            .eq('id_evaluacion', evaluacion.id_evaluacion);

        const err = new Error('Error al registrar los detalles de la evaluación');
        err.status = 500;
        err.error  = 'Internal Server Error';
        throw err;
    }

    return evaluacion;
};


// TODO: Implementar - Obtener evaluación por ID
const getById = async (id) => {
  const { data, error } = await supabase
        .from('evaluaciones')
        .select(
            `id_evaluacion, id_exposicion, id_alumno_evaluador, fecha_evaluacion,
             usuarios!evaluaciones_id_alumno_evaluador_fkey(username, nombre),
             detalle_evaluacion(
               id_criterio, calificacion,
               criterios(descripcion, ponderacion)
             )`
        )
        .eq('id_evaluacion', id)
        .single();

    if (error || !data) {
        const err = new Error('Evaluación no encontrada');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }

    // Calcular calificación ponderada
    const detalles = data.detalle_evaluacion || [];
    const calificacion_ponderada = detalles.length
        ? parseFloat(
            (detalles.reduce(
                (s, d) => s + parseFloat(d.calificacion) * parseFloat(d.criterios.ponderacion), 0
            ) / 100).toFixed(2)
          )
        : 0;

    return {
        ...data,
        evaluador:            data.usuarios?.username,
        nombre_evaluador:     data.usuarios?.nombre,
        calificacion_ponderada,
        detalles: detalles.map(d => ({
            id_criterio:         d.id_criterio,
            descripcion_criterio: d.criterios?.descripcion,
            ponderacion:          d.criterios?.ponderacion,
            calificacion:         d.calificacion,
        })),
    };
};

module.exports = {
    create,
    getById,
};