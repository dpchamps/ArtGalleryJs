/**
 * Created by Dave on 12/20/13.
 */
/*
makeImage module,

returns a promise with either an Error or imageData Object as a value

preforms tasks:

    gets the height/width of raw image data,
    compares that height/width with specified maximum height/width
    resizes the image (regardless, who knows how long this takes. TODO: benchmarks
    writes the image to a file path specified in imageData.imagePath
 */

var gm = require('gm');
var Promise = require('es6-promise').Promise;

var makeImage = function(imageData){
    var MAX_DIMENSION = {
            width: 1600,
            height: 1200
        };

    var compareMaxDimensions = function(dimensions){
        var imgXY = {
            width: dimensions.width,
            height: dimensions.height
        };

        if(imgXY.width > MAX_DIMENSION.width){
            imgXY.width = MAX_DIMENSION.width;
        }
        if(imgXY.height > MAX_DIMENSION.height){
            imgXY.height = MAX_DIMENSION.height;
        }
        return imgXY;
    };

    /*
        Create an initial promise to get the width/height of the raw image data
     */
    var createImagePromise = new Promise(function(resolve, reject){
        gm(imageData.buffer).size(function(err, dimensions){
           if(!err){
               resolve(dimensions);
           }else{
               reject(Error(err));
           }
        });
    });

    /*
        return a promise object that:
            resolves to returning an error of imageData object

        by,
            1  - then: got the dimensions, check how big the image is,
                        resize image, write image.
            1a - return a new promise object with either an Error object of imageData Object
            3  - catch: couldn't get image dimensions, return an error
     */
    return createImagePromise.then(function(dimensions){
        dimensions = compareMaxDimensions(dimensions);
        console.log("Got image number", imageData.imageNumber, "'s width and height");
        //this is required because .write takes a callback, and we need to keep track of
        //  it's success/failure before we do the next thing.
        return new Promise(function(resolve, reject){
            gm(imageData.buffer)
                .resize(dimensions.width, dimensions.height)
                .write(imageData.imagePath, function(err){
                    if(!err){
                        console.log("\t",imageData.imagePath, "saved");
                        resolve(imageData);
                    }else{
                        reject(err);
                    }
                });
        });
    }).catch(function(err){
        return err;
    });

};

module.exports = makeImage;