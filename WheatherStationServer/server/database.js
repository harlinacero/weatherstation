const mysql = require('mysql2');

const HOST = "127.0.0.1";
const USER = "root";
const PASSWORD = "1223";
const DATABASE = "WeatherStationDB";
const PORT = 3306;

const connection = mysql.createConnection({
    host: HOST,
    port: PORT,
    user: USER,
    password: PASSWORD,
    database: DATABASE
});


function insert(data, callback) {
    let sql = `INSERT INTO SensorData (
                sensor,
                location,
                humidity,
                temperature,
                pressure,
                altitude) 
                    VALUES (?, ?, ?, ?, ?, ?)`;


    let query = mysql.format(sql, [ data.sensor, data.location, data.humidity, data.temperature, data.pressure, data.altitude ]);

    connection.query(query, function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

function getData(callback) {
    const query = "SELECT Id, " +
        "DATE_FORMAT(reading_time, '%r') AS Hora, " +
        "DATE_FORMAT(reading_time, '%b %d') AS Dia, " +
        "concat(Humidity, ' %') AS Humedad, " +
        "concat(Temperature, ' °C') AS Temperatura, " +
        "concat(Pressure, ' hPa') AS Presure, " +
        "concat(Altitude, ' m') AS Altitud, " +
        "Sensor AS Sensor, " +
        "Location AS IP " +
        "FROM SensorData Order by reading_time desc";

    connection.query(query, function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

function getMinData(data, callback) {
    const query = "SELECT MIN(" + data.column + ") AS min_amount FROM SensorData";

    connection.query(query, function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

function getMaxData(data, callback) {
    const query = "SELECT MAX(" + data.column + ") AS max_amount FROM SensorData";

    connection.query(query, function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

function getAvgData(data, callback) {
    const query = "SELECT AVG(" + data.column + ") AS avg_amount FROM SensorData";

    connection.query(query, function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

function getTotalValues(data, callback) {
    const sufix = {
        pressure: ' hPa',
        humidity: ' %',
        temperature: ' °C'
    };


    const query = "SELECT day(reading_time) AS Dia, " +
        "CONCAT(ROUND(AVG(" + data.column + "), 2), ' " + sufix[ data.column ] + "') AS avg, " +
        "CONCAT(MIN(" + data.column + "), ' " + sufix[ data.column ] + "') AS min, " +
        "CONCAT(MAX(" + data.column + "), ' " + sufix[ data.column ] + "') as max  " +
        "FROM SensorData  " +
        "GROUP BY day(reading_time) " +
        "ORDER BY 1 DESC";

    connection.query(query, function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

module.exports = { insert, getData, getAvgData, getMinData, getMaxData, getTotalValues };