/**
 * Created by Dave on 12/17/13.
 */
/*
create thumb module

returns a Promise object with either an error of imageData Object

tasks:

    resizes the image specified in imageData.imagePath to the specified thumbnail size regardless
    writes the thumbnail to the file path specified in imageData.thumbPath
 */
var gm = require('gm');
var Promise = require('es6-promise').Promise;


var createThumb = function(imageData){
    var MAXTHUMB = {
        width: 350,
        height: 350
    };
    return new Promise(function(resolve, reject){
        gm(imageData.imagePath)
            .resize(MAXTHUMB.width, MAXTHUMB.height)
            .write(imageData.thumbPath, function(err){
                if(!err){
                    console.log("\t",imageData.thumbPath, "saved.")
                    resolve(imageData);
                }else{
                    reject(err);
                }
            });
    });

};

module.exports = createThumb;