const db = require('./db');

const Users = db.sequelize.define('users', {
    email: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    },
    nome: {
        type: db.Sequelize.STRING
    }
});

//Users.sync({force: true})//Criando a tabela users no banco de dados!

module.exports = Users