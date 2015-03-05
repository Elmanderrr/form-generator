;+function () {
    'use strict';
    var module = {};

    module.Form = function (response) {
        var self = this,fields = [],form = null

        self.fields = {
            add: function (field) {
                fields.push(field);
                return self;
            },
            get: function () {
                return fields;
            }
        }

        self.form = {
            get: function () {
                return form;
            },
            set: function (val) {
                form = val;
                return self;
            }
        }


        function __init () {
            self
              .createFields(response)
              .wrap({action:response.url, method:response.method});
        }
        __init();

        return {
            fields:{
                get:self.fields.get
            },
            form:{
                get:self.form.get
            }
        }

    }

    //Run through given .type props, create and push each maked field in fields array
    module.Form.prototype.createFields = function (response) {
        var self = this;
        var factory = new module.Factory();

        response.fields.forEach(function (field) {

                switch (field.type) {

                    case 'text':                
                    case 'email':
                    case 'hidden':
                        self.fields.add(factory.create('input',field));
                        break;

                    case 'choice':
                        self.fields.add(factory.create('select',field));
                        break;

                    default:
                        break;

                }

        });
        return self;
    }

    //Wrap all fields in form and add prepared jQuery object to form array
    module.Form.prototype.wrap = function (props) {
        var self = this;
        var form = $(module.tpls.form);

        form.attr(props)

        self.fields.get().forEach(function (f) {
            form.find('.smb-holder').before(f.elm);
        });
        
        self.form.set(form)
    }
    

    window.module = module;

}();




