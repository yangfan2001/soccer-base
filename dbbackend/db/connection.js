const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'yf123456',
    database: 'SoccerBase'
});

connection.connect((err) => {
    if (err) throw (err);
    console.log("Database connected");
});

connection.query('select 1 + 1 as `solution`', (err, rows, fields) => {
    if (err) throw (err);
    console.log('The solution is: ', rows[0].solution);
})

module.exports = connection;