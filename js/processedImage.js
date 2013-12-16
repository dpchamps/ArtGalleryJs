/**
 * Created by Dave on 12/15/13.
 */
/*
    a sub module, to be used by xmlhttprequest.
    this function fires when onreadystatechange

    checks to see that the readystate has completed and has been a successful request

    on success, we'll get this object:

    response = {
        imagePath - the full image location,
        thumbPath - the thumbnail location,
        imageNum  - the 'id' of the image, to identify which image has come back, as they won't necessarily be in order.
    }

    which will be returned... No need to do anything specific here
 */

var processedImage = function(xmlHttp){
    if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
        //the request is done, and we have a status of OK

        var response = JSON.parse(xmlHttp.response);
        console.log(response);
        xmlHttp = null; // is this necessary?

        //return the object
        return response;
    }else{
        if(xmlHttp.readyState > 1){
            /*
             some basic error handling to keep me sane
             */
            if(xmlHttp.status >= 400 && xmlHttp.status < 500){
                console.error("On readyState: "+xmlHttp.readyState+" Client Error. Read: HTTP Status: "+xmlHttp.status);
            }else if(xmlHttp.status >= 500 && xmlHttp < 600){
                console.error("On readyState: "+xmlHttp.readyState+" Server Error. Read: HTTP Status: "+xmlHttp.status);
            }
        }


        //error
        return false;
    }
};

module.exports = processedImage;