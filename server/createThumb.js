/**
 * Created by Dave on 12/17/13.
 */
var gm = require('gm');

var createThumb = function(imageData, callback){
    var MAXTHUMB = {
        width: 350,
        height: 350
    };

    gm(imageData.imagePath)
        .resize(MAXTHUMB.width, MAXTHUMB.height)
        .write(imageData.thumbPath, function(err){
            if(!err){
                //thumbnail saved
                callback();
            }else{
                console.log(err);
            }
        })
};

module.exports = createThumb;