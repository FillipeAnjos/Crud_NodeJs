const db = require('./db');

const Votars = db.sequelize.define('votars', {
    idlugar: {
        type: db.Sequelize.INTEGER
    },
    qtdvotos: {
        type: db.Sequelize.INTEGER
    }
});

//Votars.sync({force: true})//Criando a tabela postagens no banco de dados!

module.exports = Votars







