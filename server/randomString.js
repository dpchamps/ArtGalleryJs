/**
 * Created by Dave on 12/17/13.
 */
/*
generates a random string of desired length
 */

var randomString = function(length){
    var chars = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        string = [];

    for(var i = 0; i < length; i++){
        var char = chars.charAt(Math.random()*chars.length-1);
        string.push(char);
    }

    return string.join("");
}

module.exports = randomString;