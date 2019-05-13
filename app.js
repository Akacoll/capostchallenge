// grab the packages we need
let express = require('express');
const fs = require('fs');
let jsonGen = require('./jsonGenerator.js');

let app = express();
let port = process.env.PORT || 8080;

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// POST http://localhost:8080/api/csv
app.post('/api/csv', function(req, res) {
    let csv = req.body.csvFile;
    // receives the csv path and writes in output.json
    jsonGen.json(csv);
    let json;
    // reads output.json and saves in var json
    fs.readFile('./output.json', function (err, data) {
        if (err) throw err;
        json = data;
    });
    setTimeout(function(){
        res.send(JSON.parse(json));
    },100);
});
// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);