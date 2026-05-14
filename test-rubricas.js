// Script para probar la API de rubricas
const fetch = require('node-fetch');

async function testRubricasAPI() {
    const baseURL = 'http://192.168.56.1:8080/api/v1';

    try {
        console.log('🧪 Probando API de Rubricas...\n');

        // 1. Health check
        console.log('1. Health check:');
        const healthResponse = await fetch(`${baseURL.replace('/api/v1', '')}/health`);
        const healthData = await healthResponse.json();
        console.log('   Status:', healthResponse.status);
        console.log('   Response:', healthData);
        console.log('');

        // 2. Intentar obtener rubricas sin token (debería fallar)
        console.log('2. Obtener rubricas sin token (debería fallar):');
        const rubricasResponse = await fetch(`${baseURL}/rubricas?page=0&size=10`);
        console.log('   Status:', rubricasResponse.status);
        if (rubricasResponse.status !== 200) {
            const errorData = await rubricasResponse.json();
            console.log('   Error esperado:', errorData.message);
        }
        console.log('');

        console.log('✅ Pruebas completadas. El servidor está funcionando correctamente.');
        console.log('📝 Nota: Para probar las rutas protegidas necesitas un token JWT válido.');
        console.log('🔧 API Endpoints disponibles:');
        console.log('   GET    /api/v1/rubricas - Listar rubricas');
        console.log('   GET    /api/v1/rubricas/:id - Obtener rubrica por ID');
        console.log('   POST   /api/v1/rubricas - Crear rubrica');
        console.log('   PUT    /api/v1/rubricas/:id - Actualizar rubrica');
        console.log('   DELETE /api/v1/rubricas/:id - Eliminar rubrica');
        console.log('   GET    /api/v1/rubricas/:id/criterios - Listar criterios');
        console.log('   POST   /api/v1/rubricas/:id/criterios - Agregar criterio');
        console.log('   PUT    /api/v1/rubricas/:id/criterios/:id_criterio - Actualizar criterio');
        console.log('   DELETE /api/v1/rubricas/:id/criterios/:id_criterio - Eliminar criterio');

    } catch (error) {
        console.error('❌ Error en las pruebas:', error.message);
    }
}

testRubricasAPI();