/**
 * Created by Dave on 12/17/13.
 */
/*
processImage module

returns a Promise object with either an Error of an imageData Object as a value

tasks:
    -sets imageData.imagePath/imageData.thumbPath with a file name in the format:
        ISO-String-Date-four-random-chars.fileType
    -returns a chained Promise object
        - when makeImage resolves, call and return createThumb
        - when createThumb resolves, return imageData
        - iff either fail, return an error
 */


var Promise = require('es6-promise').Promise;
var makeImage = require('./makeImage');
var createThumb = require('./createThumb');
var randomString = require('./randomString');

var processImage = function(imageData){

    //create a filename in the format: ISO-String-Date-four-random-chars.fileType
    date = new Date();
    var fileName = date.toISOString().split("T")[0]+"-"+randomString(4)+".png";

    //set the image and thumb path, now that we know the filename
    imageData.imagePath = imageData.imagePath+fileName;
    imageData.thumbPath = imageData.thumbPath+fileName;

    return makeImage(imageData).then(function(imageData){
        //image has been saved. all logic that happens after image has been created goes here
        return createThumb(imageData);
    }).catch(function(err){
        //there was a problem with writing the image to the disk
        console.error(err);
        return err;
    }).then(function(imageData){
        //the thumbnail has been saved, process image is complete
        return imageData;
    }).catch(function(err){
       //there was a problem making the thumbnail
       console.error(err);
       return err;
    });

};

module.exports = processImage;