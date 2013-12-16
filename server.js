var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.bodyParser({limit: '15mb'}));
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
        imagePath: "",
        thumbPath: "",
        imageNumber: req.body.imageNumber,
        raw: decodeURIComponent(req.body.URI)
    };
    /*
    fs.writeFile('test.png',imageData.raw, 'base64', function(err){
        console.log(err);
    })
    */
    res.send(JSON.stringify(imageData));
});

port = 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port)