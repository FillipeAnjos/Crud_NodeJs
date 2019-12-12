const db = require('./db');

const Post = db.sequelize.define('postagens', {
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
});

//Post.sync({force: true})//Criando a tabela postagens no banco de dados!

module.exports = Post







