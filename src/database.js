const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });

// CONEXÃO MYSQL
const connectDatabase = async function () {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD, 
            database: process.env.DB_DATABASE
        })

        console.log('O MYSQL está conectado perfeitamente.');
        return connection;
    } catch (error) {
        console.error('A conexão gerou o seguinte erro:', error);
        return error;
    }
};


module.exports = connectDatabase;
