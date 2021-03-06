$(function(){

// util func

// backbone stuff
    _.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g
    };

    var Spinner = Backbone.Model.extend({

        makeUpUrl: function(){
            var urlTemplate = _.template("make/type={{ type }}&width={{ width }}&height={{ height }}&bgc={{ backgroundColor }}");
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
            'click .show-code-btn': function(){
                var index = this.model.get("type") -1;
                var $target = $("#source-frame li:eq("+ parseInt(index, 10) +")");
                var cssTemplate = _.template($target.find(".css-code").html());
                var content = cssTemplate(this.model.attributes);
                $target.find(".css-code").html(content);
                showSourceForActiveSpinner(index);
            },
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

        serilize: function(){
            this.model.attributes.width = this.$el.find('.width').css("width");
            this.model.attributes.height = this.$el.find('.height').css("height");
            this.model.attributes.backgroundColor = this.$el.find('.bgc').css("background-color");
        },

        render: function(){
            var $spinner = this.$(".spinner");

            if($spinner.length == 0){
                this.switchSpinner();
                $spinner = this.$(".spinner");
            }


            this.$el.find('.width').css("width", this.model.get("width"));
            this.$el.find('.height').css("height", this.model.get("height"));
            this.$el.find('.bgc').css("background-color", this.model.get("backgroundColor"));
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

      function showSourceForActiveSpinner(index) {
        // Exit if the source-frame is already visible
        if ($("#source-frame").hasClass("visible")) return;

        // Show the corresponding li in the source list
        $("#source-frame li:eq("+ parseInt(index, 10) +")").addClass("visible");

        $("#source-frame").addClass("visible");
      }

      function dismissSourceFrame() {
        $("#source-frame .visible").removeClass("visible");
        $("#source-frame").removeClass("visible");
      }

      $("#source-frame ul").click(function(e) {
        dismissSourceFrame();
      });



    SPINNER.on("change:type", function(){
        var url = this.makeUpUrl();
        ROUTER.navigate(url);
        SPINNER_SHOW_VIEW.switchSpinner();
        SPINNER_SHOW_VIEW.serilize();
        SPINNER_FORM_VIEW.render();
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