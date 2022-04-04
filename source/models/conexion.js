const mysql = require("mysql");
const { promisify } = require('util');

var sqlConnecion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: "3306",
    database: 'khalifas'
});

sqlConnecion.connect(function (err) {
    if (err) {
        console.log(err.message);
        console.log("No PUEDO MARTHA");
    }
    else {
        console.log("si pude Martha");
    }

});

sqlConnecion.query = promisify(sqlConnecion.query)

module.exports = sqlConnecion;
