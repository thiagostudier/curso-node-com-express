var express = require('express');
var path = require('path');
// var http = require('http');
var app = express();
var routes = require('./routes');
var bodyParser = require('body-parser'); //TRAZ INFORMAÇÕES DO BODY DENTRO DO REQUEST

// TEMPLATE ENGINE - PUG TEMPLATE
app.set('view engine', 'pug');

//MIDDLEWARES (ANTES DAS ROTAS)
app.use(function(req, res, next){
    req.name = 'REQUEST DO MIDDLEWARE'; //PASSANDO VARIÁVEL POR MIDDLEWARE
    console.log('I AM A CUSTOM MIDDLEWARE');
    next();
});

/*app.get('/', function(req, res, next){
    // res.send('Hello world from express by Thiago Studier: ' + req.name); //PEGANDO VARIÁVEL DA MIDDLEWARE
    // TESTANDO ERRO DO MIDDLEWARE
    next(new Error('custom error'))
});*/

// RENDERIZANDO NO PUB
app.get('/', function(req, res, next){
    res.render('index', {
        message: 'Hello world from express by SON'
    });
});

app.get('/world', function(req, res){
    res.send('world');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use('/hello', routes);

app.listen(3000, function(){
    console.log('Express started');
});

// DEFINIR DIRETORIO 'PUBLIC' COMO ESTÁTICO PARA SER ACESSADO
app.use('/public', express.static(path.join(__dirname, 'public')));

// MIDDLEWARE DE ERRO - INDICADORES PELOS QUATRO PARÂMETROS
app.use(function(err, req, res, next){
    res.status(500).json({
        message: 'Something wrong happens'
    })
});