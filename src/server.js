require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT}/api/v1`);
});