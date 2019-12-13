<h1>Projeto NodeJs</h1>
Projeto desenvolvido do zero com as funções que um formulário pode ter (Cadastrar, editar e remover) essas funções
só poderão ser executadas quando o usuário estiver logado e estão ligada as postagens das imagens dos lugares
existentes em Senhor dos anéis(MiddleEarth).<br/>
No projeto os usuários cadastrados ou não poderão votar em qual lugar é o melhor para se viver em MiddleEarth.

<hr>

<h2>Instalações das Ferramentas, Bibliotecas e Módulos</h2>

Excute os comandos abaixo na linha de comando (Prompt - cmd) na pasta do projeto.
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
