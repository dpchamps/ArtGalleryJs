/**
 * Created by Dave on 12/17/13.
 */
/*
data structure for working with objects sent back from the server in this form:

imageData = {
    imagePath: where the full image is located
    thumbPath: where the thumbnail image is located
    imageNumber: the unique id of the image sent back
}
 */

var imageModule = function($){
    var length = undefined;
    //the items loaded
    var items = {};
    //cache the image area
    var imageArea = $('#imageDock');

    var _setFileArrayLength = function(_fileArrayLength){
        if(length === undefined){
            length = _fileArrayLength;
        }else{
            length += _fileArrayLength;
        }

    };

    var getItemsLength = function(_items){
        var length = 0;
        for(var key in _items){
            length++;
        }

        return length;
    };

    var _loadComplete = function(){
        return (length === getItemsLength(items));
    };

    var insertImageIntoDOM = function(imageData){
        var selector = "#image_"+imageData.imageNumber;
        var node = $(selector);
        console.log(node);
        if(node.length === 0){
            //it doesn't exist
            var newDiv = $('<div>',{
               id: 'image_'+imageData.imageNumber
            }).appendTo(imageArea);
            $('<img>', {
                src: imageData.thumbPath
                //the big picture doesn't exist yet... so we won't set an href
            }).appendTo(newDiv);
        }else{
            //it already exists, so the default action is to just update the thumbnail
            // and href of the image
            node.children('img').attr({
                src: imageData.thumbPath,
                href: imageData.imagePath
            });
        }
    };

    var _add = function(imageData){
        var idx = imageData.imageNumber;
        items[idx] = imageData;

        insertImageIntoDOM(items[idx]);
    };



    var _getImageURL = function(idx){
        return items[idx].imagePath;
    };

    var _getThumbURL = function(idx){
        return items[idx].thumbPath;
    };

    return {
        add : function(imageData){
            _add(imageData);
        },
        loadComplete : function(){
            _loadComplete();
        },
        getImageURL: function(idx){
            _getImageURL(idx);
        },
        getThumbURL: function(idx){
            _getThumbURL(idx);
        },
        setFileArrayLength: function(fileArrayLength){
            _setFileArrayLength(fileArrayLength);
        },
        decreaseFileArrayLength: function(){
            length--;
        },
        getLength: function(){
            return length;
        }

    };
};

module.exports = imageModule;