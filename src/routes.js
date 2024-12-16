// LINK DA POKEAPI
const URL = 'https://pokeapi.co/api/v2/pokemon'; 

// FUNÇÃO PARA PROCURAR POKÉMONS
async function postPoke (request, reply) {
    const identifier = request.body?.identifier || request.query?.identifier;

    if(!identifier) {
        return reply.status(400).send({error: 'É necessário o nome do Pokémon desejado.'});
    } else {
        try {
            let response = await fetch(`${URL}/${identifier}`);
            if(!response.ok) {
                return reply.status(404).send({ error: 'Pokémon não encontrado'});
            } 

            // ARMAZENA AS INFORMAÇÕES DO POKÉMON
            response = await response.json();
            const pokemon = {
                name: response.name,
                pokedexNumber: response.id,
                abilities: response.abilities.map((indexA) => indexA.ability.name).join(', '),
                types: response.types.map((indexT) => indexT.type.name).join(', ')
            }

            // QUERY USANDO O OBJETO POKEMON
            const query = `INSERT INTO pokemons (name, pokedexNumber, abilities, types) VALUES (?, ?, ?, ?)`;
            const values = [pokemon.name, pokemon.pokedexNumber, pokemon.abilities, pokemon.types];
            
            // ACESSA CONEXÃO DO MYSQL
            await request.server.database.query(query, values);

            // SUCESSO DO POST POKEMON
            console.log('Pokémon encontrado com sucesso:', pokemon);
            return reply.status(201).send({
                message: 'O Seu pokémon foi encontrado:',
                pokemon: pokemon,
            })

        } catch(error) {
            console.error('Erro ao salvar o Pokémon:', error);
            return reply.status(500).send({ error: 'Erro interno no servidor' });
        }
    }
}

// FUNÇÃO PARA LISTAR POKÉMONS
async function getPokes (request, reply) {
    try {
        const query = 'SELECT * FROM pokemons';
        const [listPokes] = await request.server.database.query(query);
        return reply.status(200).send(listPokes);

    } catch (error) {
        console.error('Erro ao buscar os pokémons do banco de dados:', error);
        return reply.status(500).send({error: 'Erro interno do Servidor'});
    }
}

// REGISTRA ROTAS DO FASTIFY
async function pokeRoutes(fastify) {
    fastify.post('/pokemon', postPoke);
    fastify.get('/pokemon', getPokes);
}

// EXPORTA AS ROTAS FASTIFY
module.exports = pokeRoutes;
