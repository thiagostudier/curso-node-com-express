var express = require('express');
var router = express.Router();

//MIDDLEWARES
router.use(function(req, res, next){
    console.log('I AM A CUSTOM MIDDLEWARE - INTERNO');
    next();
});

router.get('/', function(req, res){
    res.json({
        message: 'hello word'
    })
});

router.get('/a?r', function(req, res){
    res.send('router a?r');
});

router.get('/a+r', function(req, res){
    res.send('router a+r');
});

router.get('/a*r', function(req, res){
    res.send('router a*r');
});

router.get('/params/:name', function(req, res){
    res.json({
        params: req.params,
        host: req.host,
        headers: req.headers,
    })
});

router.post('/body', function(req, res){
    res.json(req.body);
});

router.get('/res', function(req, res){
    // res.status(201).send('test');
    // res.status(201).json({
    //     name: 'Thiago',
    //     lastname: 'Studier'
    // });
    res.render('index', {});
});

module.exports = router;