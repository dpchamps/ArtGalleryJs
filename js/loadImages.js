/**
 * Created by Dave on 12/14/13.
    uses HTML5 api, supports multiple files\

 This provides some logic for a user to load Images onto the page.

 Dependencies are as follows:
    -loadImages
     |-xmlHTTP
      |-processedImage

 loadImages takes an array of all the files, verifies that they are images by checking mime types,
 creates a new FileReader object, and reads each image file as DataUrl.

 as each file loads, it's encoded with UTF-8 characters and sent to the server via the xmlHttp function.

 xmlHttp requires two parameters,
    fileData - the file that was just encoded, to be sent to the server.
    callback - what exactly you want to do with the data that comes back from the server
 */
var xmlHttp = require('xmlhttprequest');

var loadImages = function(e) {
    //array of all files
    var fileArray = e.target.files;

    for(var i = 0, image; image = fileArray[i]; i++){
        //verify image
        if(!image.type.match(/^image\/[bmp|jpg|jpeg|png|gif]/)){
            continue;
        }
        //create a new FileReader object
        var readFile = new FileReader();
        var data = {
            imageNumber: i,
            mimeType: image.type
        };
        readFile.onload = (function(fileData){
            return function(loadedImage){
                fileData.URI = encodeURIComponent( loadedImage.target.result.split(',')[1] );

                xmlHttp(fileData, function(processedImage){
                    /*
                        This Fires if and only if:
                            the XMLHttpRequest has been created,
                            filedata has been sent via post to the server,
                            the XMLHttpRequest has come back,
                            the XMLHttpRequest was successful.

                     parameter: processedImage.
                        -See processedImage for more info.
                     */
                });
            }
        })(data);

        readFile.readAsDataURL(image);
    }
};

module.exports = loadImages;