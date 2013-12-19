/**
 * Created by Dave on 12/15/13.
 */
(function($){


    $(function(){
        var dragAndDrop = require('./js/dragAndDrop')($);
        //the place where the user can drop some files is the entire webpage
        var imageArea = document.getElementById("imageDock");

        imageArea.addEventListener('dragover', dragAndDrop.onDragOver, false);
        imageArea.addEventListener('drop', dragAndDrop.onDrop, false);
    });
})(jQuery);