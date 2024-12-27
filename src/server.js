const fastify = require('fastify')({ logger: true });
const connectDatabase = require('./database.js');
const pokeRoutes = require('./routes.js');


const start = async function () {
    try {
        // CONEXÃO COM BANCO DE DADOS
        let database = await connectDatabase();
        console.log('Banco de dados MySQL está conectado.');

        // ROTAS DO FASTIFY
        fastify.decorate('database', database);
        fastify.register(pokeRoutes);

        // START NO SERVIDOR
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Servidor rodando em: http://localhost:3000');
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

start()