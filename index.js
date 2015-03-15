$(function(){

// util func

// backbone stuff
    var Spinner = Backbone.Model.extend({

        makeUpUrl: function(){
            var urlTemplate = _.template("make/type=<%= type %>&width=<%= width %>&height=<%= height %>&bgc=<%= backgroundColor %>");
            return urlTemplate(this.attributes);
        },

        getSpinnerShowerId: function(){
            return "spinner" + this.attributes.type;
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
            'keyup #width-input': 'updateWidth',
            'keyup #height-input': 'updateHeight',
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
            $("#width-input").val(this.model.get('width').slice(0,-2));
            $("#height-input").val(this.model.get('height').slice(0,-2));
            $("#type-select").val(this.model.get('type'));
            $('#bgc-input').val(this.model.get("backgroundColor"));
            $('.color-picker').colorpicker('setValue', this.model.get("backgroundColor")).colorpicker('update');
        }



    }))({el: $("#spinner-form"), model: SPINNER});

    var SPINNER_SHOW_VIEW = new (Backbone.View.extend({

        switchSpinner: function(){
            var spinnerHTML = $("#" + SPINNER.getSpinnerShowerId()).html();
            this.$el.html(spinnerHTML);
        },

        render: function(){
            var $spinner = this.$(".spinner");

            if($spinner.length == 0){
                this.switchSpinner();
                $spinner = this.$(".spinner");
            }


            $spinner.css("width", this.model.get("width"));
            $spinner.css("height", this.model.get("height"));
            var bgcClass = $spinner.attr('bgc-class');
            var $target = $spinner;
            if(bgcClass){
                $target = $spinner.find(bgcClass);
            }
            $target.css("background-color", this.model.get("backgroundColor"));
            return this;
        }


    }))({el: $('#spinner-shower'), model: SPINNER});

    var ROUTER = new (Backbone.Router.extend({
              routes: {
                '': 'init',
                'show-code/:spinnertype': 'showCode',
                'make/type=:type&width=:width&height=:height&bgc=:bgc': 'make',
              },

              init: function(){
                ROUTER.navigate(SPINNER.makeUpUrl());
                SPINNER_FORM_VIEW.render();
                SPINNER_SHOW_VIEW.render();
              },


              make: function(type, width, height, bgc){
                    if(type){SPINNER.attributes.type = type;}
                    if(width){SPINNER.attributes.width = width;}
                    if(height){SPINNER.attributes.height = height;}
                    if(bgc){SPINNER.attributes.backgroundColor = bgc;}
                    SPINNER_FORM_VIEW.render();
                    SPINNER_SHOW_VIEW.render();
              }


    }))();


    SPINNER.on("change:type", function(){
        var url = this.makeUpUrl();
        ROUTER.navigate(url);
        SPINNER_SHOW_VIEW.switchSpinner();
        SPINNER_SHOW_VIEW.render();
    })

    SPINNER.on("change", function(){
        var url = this.makeUpUrl();
        ROUTER.navigate(url);
        SPINNER_SHOW_VIEW.render();
    })





    



// start

$('.color-picker').colorpicker({
    format: "rgba",

});


Backbone.history.start();


})