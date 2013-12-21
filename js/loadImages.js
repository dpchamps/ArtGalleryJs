/**
 * Created by Dave on 12/14/13.
 * loadImages module
    HTML5 api, supports multiple files.

    Fired when a user attempts to upload files to web page

    uses:
        var data = {
            imageNumber: the images place in the array of files uploaded, it's id
            mimeType: self
            imagePath: where the big image is saved (empty until processed)
            thumbPath: where the thumbnail is saved (default AJAX spinner)
            URI: encodeURIComponent(ReadDataAsURL)
         }
        imageModule
            a data structure that keeps track of images loaded into the DOM,
            and responds to changes of images.
        post(data)
            returns a Promise object with a value either processedImageData or an Error.
                    processedImageData: a data json object, altered by the server to contain the
                    file/thumbnail path of the saved images
                    Error: an error status of what failed.

 tasks:
    -Takes an array of all the files, verifies that they are images by checking mime types.
    -Modifies data object for each file in array
    -Adds data to the imageModule data structure
    -Creates a new FileReader object, reads each image file as DataUrl.
    -post(data).then
        -adds updated image information to imageModule
    -post(data).catch
        -error, remove the image from imageModule

 */
var post = require('./post');
var Promise = require('es6-promise').Promise;

var loadImages = function(fileArray, imageModule) {
    imageModule.setFileArrayLength(fileArray.length);
    //get an offset, if there are already images on the page
    var offset = imageModule.getLength() - fileArray.length;
    for(var i = 0, image; image = fileArray[i]; i++){
        //verify image
        if(!image.type.match(/^image\/[bmp|jpg|jpeg|png|gif]/)){
            imageModule.decreaseFileArrayLength();
            continue;
        }

        //create a new FileReader object
        var readFile = new FileReader();
        var data = {
            imageNumber: i+offset,
            mimeType: image.type,
            imagePath: "",
            thumbPath: "asyncLoad.gif"
        };
        imageModule.add(data);

        readFile.onload = (function(fileData, imageModule){
            return function(loadedImage){
                fileData.URI = encodeURIComponent( loadedImage.target.result.split(',')[1] );

                post(fileData).then(function(processedImageData){
                    /*
                        request has returned from the server
                        here, we're getting back a JSON object that contains the newly saved image
                        qualities.
                        So, we'll add it into the imageModule...
                     */
                    imageModule.add(processedImageData);

                }).catch(function(err){
                    //the post to the server has failed.
                    console.error(err);
                    imageModule.remove(data);
                });

            }
        })(data, imageModule);

        readFile.readAsDataURL(image);
    }
};

module.exports = loadImages;