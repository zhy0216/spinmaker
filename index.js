$(function(){


// backbone stuff
    var Spinner = Backbone.Model.extend({
        defaults: {

            type: null, // start from "1"
            width: "30px",
            height: "30px",
            backgroundColor: "#333",

        }

    })

    var spinnerCollection = new Backbone.Collection([

        ], {
            model: Spinner,
        })



    var SpinnerFormView = Backbone.View.extend({



    })

    var SpinnerShowView = Backbone.View.extend({

    })



// start

$('.color-picker').colorpicker({
    format: "rgba",

});





})