/**
 * Created by Dave on 12/15/13.
 */
var dragAndDrop = function(){
    var loadImages = require('./loadImages');

    return {
        onDragOver : function(e){
            e.stopPropagation();
            e.preventDefault();

            e.dataTransfer.effectAllowed = "copy";
            e.dataTransfer.dropEffect = "copy";
        },
        onDrop : function(e){
            e.stopPropagation();
            e.preventDefault();

            loadImages(e.dataTransfer.files);
        }
    }
};

module.exports = dragAndDrop();