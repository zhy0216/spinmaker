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

        events: {
            'keypress #width-input': 'updateWidth',
            'keypress #height-input': 'updateHeight',
            'change #type-select': 'updateType',
            'changeColor .color-picker': 'updateBGC',
        },

        updateWidth: function(){
            this.model.set("width", $('#width-input').val() + "px");
        },

        updateHeight: function(){
            this.model.set("height", $('#height-input').val() + "px");
        },

        updateType: function(){
            this.model.set("type", $('#type-select').val());
        },

        updateBGC: function(){
            if($("#bgc-input").val()){
                this.model.set("backgroundColor", $("#bgc-input").val());
            }
        },

        render: function(){
            $("#width-input").val(this.model.get('width'));
            $("#height-input").val(this.model.get('height'));
            $("#type-select").val(this.model.get('type'));
            $('#bgc-input').val(this.model.get("backgroundColor"));
            $('.color-picker').colorpicker('update');
        }



    }))({el: $("#spinner-form"), model: SPINNER});

    var SpinnerShowView = Backbone.View.extend({

    });

    var ROUTER = new (Backbone.Router.extend({
              routes: {
                '': 'init',
                'show-code/:spinnertype': 'showCode',
                'make/type=:type&width=:width&height=:height&bgc=:bgc': 'make',
              },

              init: function(){
                ROUTER.navigate(SPINNER.makeUpUrl());
                SPINNER_FORM_VIEW.render();
              },


              make: function(type, width, height, bgc){
                    SPINNER_FORM_VIEW.render();
              }


    }))();

    SPINNER.on("change", function(){
        var url = this.makeUpUrl();
        ROUTER.navigate(url);
    })





    



// start

$('.color-picker').colorpicker({
    format: "rgba",

});


Backbone.history.start();


})