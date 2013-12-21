/**
 * Created by Dave on 12/14/13.
 */
/*
makeXmlHttp module

accepts a JSON object and posts it to the server
returns a Promise object with either an error or parsed JSON status from the server
 */

var Promise = require('es6-promise').Promise;

var post = function(post){
    return new Promise(function(resolve, reject){
        var req = new XMLHttpRequest();

        req.onload = function(){
            if(req.status === 200){
                resolve(JSON.parse(req.response));
            }else{
                reject(Error(req.statusText));
            }
        };

        req.onerror = function(){
            reject(Error("Network Error"));
        };

        req.open("POST", "http://localhost:3000", true);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(post));
    });
};

module.exports = post;