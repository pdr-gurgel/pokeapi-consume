const mysql = require('mysql2/promise');

// CONEXÃO MYSQL
const connectDatabase = async function () {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '', 
            database: 'pokedex'
        })

        console.log('O MYSQL está conectado perfeitamente.');
        return connection;
    } catch (error) {
        console.error('A conexão gerou o seguinte erro:', error);
        return error;
    }
};


module.exports = connectDatabase;
