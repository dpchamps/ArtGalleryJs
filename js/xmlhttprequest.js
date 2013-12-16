/**
 * Created by Dave on 12/14/13.
 */
/*
    post : a JSON object
    callback: onreadystatechange

 */
var processedImage = require('./processedImage');

var makeXmlHttp = function(post, callback){
    var xmlHttp = new XMLHttpRequest();
    var post = JSON.stringify(post);
    xmlHttp.onreadystatechange = function(){
        var image = processedImage(xmlHttp);
        if(image){
            callback(image);
        }
    };

    xmlHttp.open("POST", "http://localhost:3000", true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(post);
};

module.exports = makeXmlHttp;