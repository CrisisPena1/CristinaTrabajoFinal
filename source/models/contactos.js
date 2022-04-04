const conexion = require('../models/conexion.js');

let Contactos = {};

Contactos.insertar = function insertar(contacto) {
    let sqlConsulta = 'INSERT INTO contactos set ?';
    let response = [];
    try {
        response = conexion.query(sqlConsulta, contacto);
    } catch (error) {
        console.log(error);
        return error;
    }
    return response;
}
Contactos.mostrarTodos = function mostrarTodos() {
    let sqlConsulta = "SELECT * FROM contactos";
    let response = [];
    try {
        response = conexion.query(sqlConsulta);
    } catch (error) {
        console.log(error);
        return error;
    }
    return response;
}
Contactos.buscarId = function buscarId(id) {
    let sqlConsulta = "SELECT * FROM contactos WHERE idContactos = ?";
    let response = [];
    try {
        response = conexion.query(sqlConsulta, [id]);
    } catch (error) {
        console.log(error);
        return error;
    };
    return response;
}
Contactos.borrar = function borrar(id) {
    let sqlConsulta = "DELETE FROM contactos WHERE idContactos = ?";
    let response = [];
    try {
        response = conexion.query(sqlConsulta, [id]);
    } catch (error) {
        console.log(error);
        return error;
    }
    return response;
}
Contactos.actualizar = function actualizar(contacto) {
    let sqlConsulta = "UPDATE contactos SET nombre =?, domicilio =?, telefono =? WHERE idContactos =?";
    let data = [contacto.nombre, contacto.domicilio, contacto.telefono, contacto.idContactos];
    let response = [];
    try {
        response = conexion.query(sqlConsulta, data);
    } catch (error) {
        console.log(error);
        return error;
    }
    return response;
}
module.exports = { Contactos };