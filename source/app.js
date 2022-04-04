const http = require('http');
const express = require('express');
const puerto = 3000;
const path = require('path');
const misRutas = require('./router/index');
const bodyParser = require('body-parser');

const app = express();

// Configuraciones
// Motor de vistas
app.set('views engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

// Recursos públicos
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router
app.use(misRutas);

app.listen(puerto, () => {
    console.log('Iniciando el puerto');
})
