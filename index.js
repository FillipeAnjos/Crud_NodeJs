const express = require("express");
const cors = require('cors')
const app = express();//Cria uma instancia para dentro da variavel app.

const http = require('http').createServer(app)
const io = require('socket.io')(http)
io.set('origins', '*:*');


    /* *************************************************************************** */
    /* *************************************************************************** */
    /* *************************************************************************** */
        //npm install --save multer
        app.use(express.static(__dirname + '/'));//Importante rota das imagens!
        const multer = require('multer');
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'imagens/')
            },
            filename: (req, file, cb) => {
                cb(null, Date.now()+'-'+file.originalname)
            }
        })
        const upload = multer({ storage });
    /* *************************************************************************** */
    /* *************************************************************************** */
    /* *************************************************************************** */

const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const session = require("express-session");
const flash = require("connect-flash");

const Post = require('./models/Post');
const Users = require('./models/Users');
const Votars = require('./models/Votars');

app.use(cors())

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

// Config
    //Template Engine
        app.engine('handlebars', handlebars({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');

    //Body Parser
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
        
    //Conexão com o banco de dados
        /*const Sequelize = require('sequelize')
        const sequelize = new Sequelize('app', 'root', '', {
            host: "localhost",
            dialect: 'mysql'
        });*/

        //npm install mysql
        const mysql = require('mysql');
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'app'
        });

    //Sessão
        app.use(session({
            secret: "playerum",
            resave: true,
            saveUninitialized: true
        }))

    //Flash
        app.use(flash());

/* ****************************************************************************************************** */
/* ****************************************************************************************************** */
/* ****************************************************************************************************** */
    
    //Public
    //Middlewares 
        app.use((req, res, next) => {
            console.log(req.session);
            console.log(req.session.userId);
            console.log(req.session.userEmail);
            console.log(req.session.userNome);
            console.log(req.session.userSenha);
            
                var email = req.session.userEmail;
                var senha = req.session.userSenha;

                if(email == undefined && senha == undefined){
                    console.log('Você está deslogado. Favor logar-se!!');
                    next();
                }else{
                    console.log("Usuario autenticado com sucesso!");
                    next();
                }
                //console.log(" ----------- Estou dentro do Middlewares  ----------- ");
        })


    //ROTAS

        //Home Page
        app.get('/', function(req, res){

            var selecionar = "select pos.id as idpost, titulo, conteudo, vot.id as idvot, idlugar, qtdvotos from postagens as pos left join votars as vot on pos.id = vot.idlugar";
            connection.query(selecionar, function(erro, posts){
                var emailUserLog = req.session.userEmail;
                var nomeUserLog = req.session.userNome;
                res.render('home', {posts: posts, emailUserLogado: emailUserLog, nomeUserLogado: nomeUserLog});
            })

            /*
            //findAl() <-- Serve para listar todos os os dados da tabela!
            Post.findAll({order: [['id', 'asc']]}).then(function(posts){
                var emailUserLog = req.session.userEmail;
                var nomeUserLog = req.session.userNome;
                res.render('home', {posts: posts, emailUserLogado: emailUserLog, nomeUserLogado: nomeUserLog});
            })  
            */
            
            
        });

        //Socket.io
        app.get('/io', (req, res) =>{
            res.render('io');
        });

        //Deletar
        app.get('/deletar/:id', (req, res) =>{
            Post.destroy({ where: {'id': req.params.id} }).then(function(){
                
                var success = "Lugar deletado com sucesso!";

                var selecionar = "select pos.id as idpost, titulo, conteudo, vot.id as idvot, idlugar, qtdvotos from postagens as pos left join votars as vot on pos.id = vot.idlugar";
                connection.query(selecionar, function(erro, posts){
                    var emailUserLog = req.session.userEmail;
                    var nomeUserLog = req.session.userNome;
                    res.render('home', {posts: posts, emailUserLogado: emailUserLog, nomeUserLogado: nomeUserLog, sucesso: success});
                })

            }).catch(function(erro){
                res.send("Erro ao deletar a postagem!");
            })
        });

        //Editar
        app.get('/ed/:id', (req, res) => {
            Post.findAll({ where: {'id': req.params.id} }).then(function(postagem){
                res.render('editar', {postagem: postagem});
            })                        
        });

        //Editar - 2 
        app.post('/editar', upload.single('conteudo'), (req, res) => {

            var iddd = req.body.id
            var titu = req.body.titulo
            var cont = req.file.path

            connection.query("UPDATE postagens SET titulo = "+ mysql.escape(titu) +", conteudo = "+ mysql.escape(cont) +" WHERE id = "+ mysql.escape(iddd), 
            function(err, result){
                if(!err){
                    var success = "Lugar alterado com sucesso!";

                    var selecionar = "select pos.id as idpost, titulo, conteudo, vot.id as idvot, idlugar, qtdvotos from postagens as pos left join votars as vot on pos.id = vot.idlugar";
                    connection.query(selecionar, function(erro, posts){
                        var emailUserLog = req.session.userEmail;
                        var nomeUserLog = req.session.userNome;
                        res.render('home', {posts: posts, emailUserLogado: emailUserLog, nomeUserLogado: nomeUserLog, sucesso: success});
                    })

                }else{
                    console.log('Erroooo na hora de atualizar!!!!');
                    res.redirect('/');
                }
            });

        })

        //Login
        app.get('/login', (req, res) => {
            res.render('usuarios/login');
        });

        //Login - 2
        app.post('/login2', (req, res) => {
            
            var email = req.body.email;
            var senha = req.body.senha;

            var sqlIserir = "select * from users where email = " + mysql.escape(email) + " and senha = " + mysql.escape(senha);
            connection.query(sqlIserir, function(erro, result){
                if(result.length){
                    req.session.userId = result[0].id;
                    req.session.userEmail = result[0].email;
                    req.session.userSenha = result[0].senha;
                    req.session.userNome = result[0].nome;
                    res.redirect('/');
                }else{
                    console.log("Errooooooooooooooooo!!!!!!!!!!!!!!!!!!!");
                }
            })

        });

        //Deslogar
        app.get('/logout', (req, res) => {
            req.session.destroy();
            res.redirect('/');
        })

        //Form de Cadastrar Lugares
        app.get('/cad', function(req, res){
            res.render('formulario');
        });

        //Cadastrar conta
        app.get('/criarConta', function(req, res){
            res.render('usuarios/criarContaForm');
        });

        //Cadastrar conta - 2
        app.post('/criarConta2', function(req, res){
            
            Users.create({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
            }).then(function(){
                var success = "Usuário cadastrado com sucesso!!";
                
                var selecionar = "select pos.id as idpost, titulo, conteudo, vot.id as idvot, idlugar, qtdvotos from postagens as pos left join votars as vot on pos.id = vot.idlugar";
                connection.query(selecionar, function(erro, posts){
                    var emailUserLog = req.session.userEmail;
                    var nomeUserLog = req.session.userNome;
                    res.render('home', {posts: posts, emailUserLogado: emailUserLog, nomeUserLogado: nomeUserLog, sucesso: success});
                }) 

            }).catch(function(erro){
                var error = "Aconteceu um erro ao cadastrar o usuário =/";

                var selecionar = "select pos.id as idpost, titulo, conteudo, vot.id as idvot, idlugar, qtdvotos from postagens as pos left join votars as vot on pos.id = vot.idlugar";
                connection.query(selecionar, function(erro, posts){
                    var emailUserLog = req.session.userEmail;
                    var nomeUserLog = req.session.userNome;
                    res.render('home', {posts: posts, emailUserLogado: emailUserLog, nomeUserLogado: nomeUserLog, erro: error});
                })
            })

        });

        //Votação do melhor Lugar em MiddleEarth
        app.post('/votacao', (req, res) => {
            
            //var idlugar = req.params.idlugar;
            var idlugar = req.body.idlugar;

            var selecionarVoto = "select * from votars where idlugar = "+ mysql.escape(idlugar);
            connection.query(selecionarVoto, function(erro, votos){
                if(votos.length){

                    //update
                    var qtdvotosMaisUm = votos[0].qtdvotos + 1;
                    
                    connection.query("UPDATE votars SET idlugar = "+ mysql.escape(idlugar) +", qtdvotos = "+ mysql.escape(qtdvotosMaisUm) +" WHERE idlugar = "+ mysql.escape(idlugar), 
                    function(err, result){
                        if(!err){
                            
                            //console.log("Imagem atualizada e computada com sucesso. Id: "+ idlugar);
                            res.redirect('/');

                        }else{
                            //console.log('Erroooo ao atualizar a imagem com o id: '+ idlugar);
                            res.redirect('/');
                        }
                    });

                }else{

                    //Insert
                    var qtd = 1;
                    Votars.create({
                        idlugar: idlugar,
                        qtdvotos: qtd
                    }).then(function(){
                        res.redirect('/');
                    }).catch(function(erro){
                        res.redirect('/');
                    })
                }

            })

            //res.render('');
        })

        //Query de Cadastrar Lugares
        app.post('/add', upload.single('conteudo'), (req, res) => {

            //console.log(req.file);

            Post.create({
                titulo: req.body.titulo,
                conteudo: req.file.path
            }).then(function(){
                var success = "Lugar cadastrado com sucesso!";

                var selecionar = "select pos.id as idpost, titulo, conteudo, vot.id as idvot, idlugar, qtdvotos from postagens as pos left join votars as vot on pos.id = vot.idlugar";
                connection.query(selecionar, function(erro, posts){
                    var emailUserLog = req.session.userEmail;
                    var nomeUserLog = req.session.userNome;
                    res.render('home', {posts: posts, emailUserLogado: emailUserLog, nomeUserLogado: nomeUserLog, sucesso: success});
                })
            }).catch(function(erro){
                var error = "Aconteceu um erro ao cadastrar o lugar =/";

                var selecionar = "select pos.id as idpost, titulo, conteudo, vot.id as idvot, idlugar, qtdvotos from postagens as pos left join votars as vot on pos.id = vot.idlugar";
                connection.query(selecionar, function(erro, posts){
                    var emailUserLog = req.session.userEmail;
                    var nomeUserLog = req.session.userNome;
                    res.render('home', {posts: posts, emailUserLogado: emailUserLog, nomeUserLogado: nomeUserLog, erro: error});
                })
            })

                //https://devpleno.com/multer-upload-de-imagens-com-nodejs-e-express/
                        
        });

        












/*
    app.get("/", function(req, res){
        res.sendFile(__dirname + "/html/index.html");//Chanar um arquivo html!
    });

    app.get("/sobre", function(req, res){
        res.sendfile(__dirname + "/html/sobre.html");
    });

    app.get("/blog", function(req, res){
        res.send("Estou na página blog");
    });

    app.get("/ola/:cargo/:nome", function(req, res){
        res.send(
        "<h1> Olá: " + req.params.nome + "</h1><h2>Seu cargo é: " + req.params.cargo + "</h2>"
        );
    });
*/

app.listen(8000);//Essa função tem que ser a ultima linha do meu código
//loacalhost:8000