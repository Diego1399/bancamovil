require('dotenv').config({path: 'database.env'})

const mysql2 = require('mysql2')

// Configuracion para conectarse a la base de datos de bancamovil
const connection = mysql2.createPool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

module.exports = connection;