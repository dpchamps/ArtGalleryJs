/**
 * Created by Dave on 12/14/13.
 */
/*
    post : a JSON object
    callback: onreadystatechange

 */
var processedImage = require('processedImage');

var makeXmlHttp = function(post, callback){
    var xmlHttp = new XMLHttpRequest();
    var post = JSON.stringify(post);
    //TODO make variable 'post' into a variable that can be sent to the server. i.e. post = 'imageData='post;
    xmlHttp.onreadystatechange = function(){
        var image = processedImage(xmlHttp);
        if(image){
            callback(image);
        }
    };

    xmlHttp.open("POST", "processImage.js", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    xmlHttp.send(post);
};

module.exports = makeXmlHttp;