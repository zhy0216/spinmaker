$(function(){

// util func

// backbone stuff
    var Spinner = Backbone.Model.extend({

        makeUpUrl: function(){
            var urlTemplate = _.template("make/type=<%= type %>&width=<%= width %>&height=<%= height %>&bgc=<%= backgroundColor %>");
            return urlTemplate(this.attributes);
        },

        defaults: {
            type: "1", // start from "1"
            width: "30px",
            height: "30px",
            backgroundColor: "rgba(25,1,1,0.27)",
        }
    })

    var SPINNER = new Spinner();

    var SPINNER_FORM_VIEW = new (Backbone.View.extend({



    }))({el: $("#spinner-form"), model: SPINNER});

    var SpinnerShowView = Backbone.View.extend({

    });

    var ROUTER = new (Backbone.Router.extend({
              routes: {
                '': 'make',
                'show-code/:spinnertype': 'showCode',
                'make/type=:type&width=:width&height=:height&bgc=:bgc': 'make',
              },

              make: function(type, width, height, bgc){
                    if(type){SPINNER.type = type;}
                    if(width){SPINNER.width = width;}
                    if(height){SPINNER.height = height;}
                    if(bgc){SPINNER.backgroundColor = bgc;}

                    if(!type || !width || !height || !bgc){
                        this.navigate(SPINNER.makeUpUrl());
                    }

              }


    }))();





    



// start

$('.color-picker').colorpicker({
    format: "rgba",

});


Backbone.history.start();


})