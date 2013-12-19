/**
 * Created by Dave on 12/17/13.
 */
/*
resize image
save big image
return thumb and image path
 */

var gm = require('gm');
var randomString = require('./randomString');
var createThumb = require('./createThumb');
var processImage = function(imageData, callback){
    var MAX_DIMENSION = {
            width: 1600,
            height: 1200
        },
        IMG_DIMENSION = {},
        date = new Date(),
        fileName = date.toISOString().split("T")[0]+"-"+randomString(4)+".png";

    imageData.imagePath = imageData.imagePath+fileName;
    imageData.thumbPath = imageData.thumbPath+fileName;

    gm(imageData.buffer)

        .size(function(err, dimensions){
            IMG_DIMENSION.width = dimensions.width;
            IMG_DIMENSION.height = dimensions.height;

            if(IMG_DIMENSION.width > MAX_DIMENSION.width){
                IMG_DIMENSION.width = MAX_DIMENSION.width;
            }
            if(IMG_DIMENSION.height > MAX_DIMENSION.height){
                IMG_DIMENSION.height = MAX_DIMENSION.height;
            }
            gm(imageData.buffer)
                .resize(IMG_DIMENSION.width, IMG_DIMENSION.height)
                .write(imageData.imagePath, function(err){
                    if(!err){
                        //file saved, create temp thumbnail
                        createThumb(imageData, callback);
                    }else{
                        console.log(imageData.imageNumber +"\t"+ err);
                    }
                });
        })


    return imageData;
};

module.exports = processImage;