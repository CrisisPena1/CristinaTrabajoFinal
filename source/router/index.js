const express = require("express");
const dbContactos = require('../models/contactos.js');
const router = express.Router();
const mysql = require("mysql");

//Ruta de inicial
router.get('/', (req, res) => {
    res.send("Iniciamos Servidor");
});

//Ruta de index
router.get('/index', (req, res) => {
    res.render('index.html', { titulo: 'Index' })
});

//Ruta de acerca de
router.get('/acercade', (req, res) => {
    res.render('acercade.html', { titulo: 'Acerca de' })
});

//Ruta de Contactos
router.get('/contacto', (req, res) => {
    res.render('contacto.html', { titulo: 'Contactos', contactos: [], contacto: null })
});

//Ruta de MostrarTodos los contactos
router.post('/contacto', async (req, res) => {
    let contactos = await dbContactos.Contactos.mostrarTodos();
    if (!contactos.length) return res.render('contacto.html', { titulo: 'Mostrar Contactos', contactos: [], contacto: null });
    res.render('contacto.html', { titulo: 'Mostrar Contactos', contactos: contactos, contacto: null })
});

//Ruta para agregar un contacto
router.post('/contacto/nuevo', async (req, res) => {
    const { nombre, domicilio, telefono } = req.body;
    await dbContactos.Contactos.insertar({ nombre, domicilio, telefono });
    res.redirect('/contacto')
});

//Ruta de busqueda por id
router.get('/contacto/id', async (req, res) => {
    const { idContactos } = req.query;
    if (!idContactos) return res.redirect('/contacto');
    const contacto = await dbContactos.Contactos.buscarId(idContactos);
    res.render('contacto.html', { titulo: 'contactos de Contactos', contactos: [], contacto: contacto[0] });
});

//Ruta para actualizar contacto
router.post('/contacto/id', async (req, res) => {
    const { idContactos, nombre, domicilio, telefono } = req.body;
    if (!idContactos) return res.redirect('/contacto');
    await dbContactos.Contactos.actualizar({ nombre, domicilio, telefono, idContactos });
    res.redirect('/contacto');
});

//Ruta de Borrar contacto
router.post('/contacto/id/borrar', async (req, res) => {
    const { idContactos } = req.body;
    if (!idContactos) return res.redirect('/contacto');
    await dbContactos.Contactos.borrar(idContactos);
    res.redirect('/contacto');
});
router.get('/contacto/delete/:id', async(req, res)=>{
    const {id} = req.params;
    dbContactos.query('DELETE FROM contactos WHERE idContactos = ?', [id]);
    res.redirect('/contactos');
});

router.get('*', (req, res) => {
    res.send("No existe la pagina");
})

module.exports = router;