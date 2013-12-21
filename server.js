var express = require('express');
var fs = require('fs');
var gm = require('gm');
var processImage = require('./server/processImage');
var Promise = require('es6-promise').Promise;
var app = express();


app.use(express.bodyParser({limit: '10mb'}));
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/', function(req, res){
    var imageData = {
        imagePath: "img/",
        thumbPath: "img/thumb/",
        imageNumber: req.body.imageNumber,
        raw: decodeURIComponent(req.body.URI)
    };
    imageData.buffer = new Buffer(imageData.raw, 'base64');

    //processImage returns a Promise. Let's deal with that promise
    processImage(imageData).then(function(imageData){
        //success,
        //trim imageData down so we're not slinging needless data around
        delete imageData.raw;
        delete imageData.bffer;
        res.send(JSON.stringify(imageData));
    }).catch(function(err){
        //uh oh, send the error back to the client
        res.send(err);
    });
});

port = 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port)