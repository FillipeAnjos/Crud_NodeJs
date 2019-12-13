<h1>Projeto NodeJs</h1>
Projeto desenvolvido do zero com as funções que um formulário pode ter (Cadastrar, editar e remover) essas funções
só poderão ser executadas quando o usuário estiver logado e estão ligada as postagens das imagens dos lugares
existentes em Senhor dos anéis(MiddleEarth).<br/>
No projeto os usuários cadastrados ou não poderão votar em qual lugar é o melhor para se viver em MiddleEarth.

<h2>Passo a Passo</h2>

<b>Projeto</b><br/>

1° Clone o projeto aqui mesmo no Github ou pela linha de comando(Prompt, cmd - Windows).<br/>
2° Apois clonar navegue pelo prompt de comando(Windows) até a pasta 'Crud_NodeJs' que é a pasta clonada.<br/>
3° Chegando na pasta 'Crud_NodeJs' entre nela e execute o projeto no arquivo index.js<br/>
4° Para rodar o arquivo 'index.js' execute o seguinte comando ' nodemon index.js '<br/>
5° Pronto o projeto já está rodando em sua maquina!<br/>
<br/>
<b>Base de Dados</b><br/>

1° Para gerar a base de dados com as tabelas 'postagens', 'users' e 'Votars' siga o seguinte passo a passo.<br/>
2° Vá até a pasta do projeto 'Crud_NodeJs', terá uma pasta com o nome 'models' e dentro dela terá 4 arquivos.<br/>
3º No arquivo 'Post.js', 'Users.js' e 'Votars' terá uma linha comentada em cada arquivo.<br/>
4º Descomentea e execute o comando 'nodemon index.js'(OBS: Verifique os dados da sua conexão "Database, password, host e user" antes de rodar o projeto, caso contrário não irá funcionar).<br/>
5° Executou o comando, rodou o projeto e gerou as tabelas, volte nos arquivos e comente novamente as linhas.<br/>
6° Pronto já gerou as tabelas!

<h2>Instalações das Ferramentas, Bibliotecas e Módulos</h2>

Foram executados os seguintes comandos abaixo na linha de comando (Prompt - cmd) na pasta do projeto.
<br/><br/>
<i><b>npm install express</b></i>
<br/>
Foi utilizado o framework Express, importante para o desenvolvimento em node.

Instalação do nodemon <i><b>npm install nodemon -g</b><i>
<br/>
O nodemon é uma ferramenta que ajuda a desenvolver aplicativos baseados no
nodejs reiniciando automaticamente o aplicativo do nó quando alterações
de arquivo no diretório são detectadas.

Sequelize <i><b>npm install --save sequelize</b></i> e <i><b>npm install mysql2</b></i>
<br/>
Foi utilizado o Sequelize que é um módulo que ajuda a trabalhar com banco de
dados diretamente do nodejs e também foi usado a biblioteca do MySQL.

Handlebars - Template Engine <i><b>npm install --save express-handlebars</b></i>
<br/>
No projeto foi usado o template engine Handlebars. O Handlebars é um
template que abstrai o cabeçalho e o rada pé preenchendo apenas uma vez,
como os outros templates fazem, porém ele é bem parecido com o template
engine Blade do Laravel e por isso a minha preferência por ele.

Body parser - Recebendo dados do formulário <i><b>npm install --save body-parser</b></i>
<br/>
O Body parser serve para pegar dados de formulário, trabalhando com models.
Corpo do Node.js analisando o middleware.
<br/>
Analise os corpos de solicitações recebidas em um middleware antes de seus
manipuladores, disponíveis na req.bodypropriedade

Instalação do multer <i><b>npm install --save multer</b></i>
<br/>
Multer é um middleware node.js para manipulação multipart/form-data, usado
principalmente para o upload de arquivos. Está escrito em cima do busboy
para máxima eficiência.

Sessões e Flash <i><b>npm install --save express-session</b></i> e o <i><b>npm install --save connect-flash</b></i>
<br/>
A Express-session é uma forma de armazenar valores em sessões em nodejs, usado aqui
no projeto para armazenar dados do usuário logado. Foi utilizado também o connect-flash
que basicamente foi utilizado para dar um retorno de algumas requisições, um exemplo seriam os alert's.
