# API POKEDEX - CONSUMO POKEAPI

### Descrição
Criação de uma API que consome informações da PokeAPI através de Fetch. Armazena os pokémons pesquisados pelas rotas dentro de um banco de dados MySQL e permite a visualização da lista. Cada pokémon adicionado no banco de dados possui os seguintes atributos.
- `id:` Identificador do pokémon dentro da Database
- `name:` Nome do Pokémon
- `pokedexNumber:` Número da Pokedex
- `abilities:` Habilidades que ele possui
- `types:` O tipo(s) que o pokémon possui

<hr>

### Endpoints da API
#### 1. Buscar Pokémon
- Rota: `POST /pokemon`
- **Descrição** Permite ao usuário pesquisar um pokémon e armazenar as informações deles na Database. Pegando o pokémon tanto do request.body como do request.query
- Corpo JSON para caso de request.body:
```
{
  "identifier": "nome do Pokemon ou ID da Pokedex"
}
```
- Rota de exemplo de Query para caso de request.query:
```
http://localhost:3000/pokemon?identifier=nome do pokemon ou ID da pokedex
```

#### 2. Listar Pokémons
- Rota: `GET /pokemons`
- **Descrição** Permite ao usuário pesquisar listar todos pokémons armazenados na Database.
- Exemplo de resposta de sucesso:
```
[
  {
    "id": 1,
    "name": "pikachu",
    "pokedexNumber": 25,
    "abilities": "static",
    "types": "electric"
  }
]
```

<hr>

### Tecnologias Utilizadas
- **Node.JS** - Utilizado para Construção da API
- **Fastify** - Framework usada
- **MySQL** - Banco de dados relacional
### Dependências Utilizadas
- **Fastify 5.1.0** - Framework de construção de APIs
- **MySQL2 3.11.5** - Conector MySQL com suporte a Promises.
<br>
*Mais informações no arquivo package.json*

<hr>

### Requisitos de Instalação
- **Node.JS** - Recomendado versão mais recente
- **MySQL** - Para fazer o banco de Dados
- **Postman** - Recomendação pessoal para fazer teste dos Endpoints e da API

<hr>

### Como configurar o Banco de Dados

#### 1. Crie o Banco de Dados
```
CREATE DATABASE pokedex;
USE pokedex;
```

#### 2. Crie a Tabela 
```
CREATE TABLE pokemons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    pokedexNumber INT NOT NULL,
    abilities TEXT,
    types TEXT
);
```

#### 3. Verifique se a tabela foi devidamente criada
```
DESCRIBE pokemons;
```