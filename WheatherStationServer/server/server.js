const database = require('./database');
const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

const getClientIp = (req, res, next) => {
    const clientIp = req.headers[ 'x-forwarded-for' ] || req.socket.remoteAddress;
    req.customIp = clientIp;
    next();
};


app.get('/weather', getClientIp, (req, res) => {
    const temp = req.query.temp;
    const humidity = req.query.humity;
    const preasure = req.query.preasure;
    const altitude = req.query.altitude;
    const sensor = req.query.sensor;
    const clientIP = req.customIp;
    console.log(clientIP);
    database.insert({
        sensor: sensor, location: clientIP,
        humidity: humidity, temperature: temp, pressure: preasure,
        altitude: altitude
    }, (result) => {
        res.json(result);
    });

});

app.get("/read", (req, res) => {
    database.getData((result) => {
        res.json(result);
    });
});

app.get("/readMin", (req, res) => {
    const column = req.query.column;
    database.getMinData({ column: column }, (result) => {
        res.json(result);
    });
});

app.get("/readMax", (req, res) => {
    const column = req.query.column;
    database.getMaxData({ column: column }, (result) => {
        res.json(result);
    });
});

app.get("/readAvg", (req, res) => {
    const column = req.query.column;
    database.getAvgData({ column: column }, (result) => {
        res.json(result);
    });
});

app.get("/readTotalValues", (req, res) => {
    const column = req.query.column;
    database.getTotalValues({ column: column }, (result) => {
        res.json(result);
    });
});

// Execution server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

