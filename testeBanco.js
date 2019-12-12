//Conexão com o banco de dados
    const Sequelize = require('sequelize')
    const sequelize = new Sequelize('app', 'root', '', {
        host: "localhost",
        dialect: 'mysql'
    });

/*
sequelize.authenticate().then(function(){
    console.log("Conectado com sucesso!!!");
}).catch(function(erro){
    console.log("Falha ao se conectar: "+ erro);
});
*/

//model - Gerando tabela no banco de dados 
const Postagem = sequelize.define('postagem', {
   titulo: {
       type: Sequelize.STRING
   },
   conteudo: {
       type: Sequelize.TEXT
   }
    
});

const Usuario = sequelize.define('usuarios', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    idade: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    }
});

/* 
    Abaixo é para criar as tabelas postagens e usuarios    
        Postagem.sync({force: true});
        Usuario.sync({force: true});
*/

/*
    Abaixo é a realização de um insert nas tabelas postagens e usuarios
        Postagem.create({
            titulo: "Um titulo qualquer",
            conteudo: "Show de Bola"
        });


        Usuario.create({
            nome: "Fillipe dos Anjos",
            sobrenome: "Siqueira",
            idade: 31,
            email: "fillipe.anjos.2000@hotmail.com"
        });
*/


