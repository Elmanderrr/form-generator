
'use strict';

var tpls = {

    input: 
        [
            '<div class="form-group">',
                '<label class="col-sm-2 control-label"></label>',
                '<div class="col-sm-10"><input class="form-control"></div>',
            '</div>'
        ].join(' '),

    select: 
        [
            '<div class="form-group">',
                '<label class="col-sm-2 control-label"></label>',
                '<div class="col-sm-10"><select class="form-control"></select></div>',
            '</div>'
        ].join(' '),

    form: 
        [
            '<form class="form form-horizontal col-sm-8">',
                '<div class="form-group smb-holder">',
                    '<div class="col-sm-offset-2 col-sm-8">',
                        '<button class="btn btn-primary" type="submit">Submit</button>',
                    '</div>',
                '</div>',
            '</form>'
        ].join('')
};



function Form(response) {
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
        field:self.fields,
        form:self.form
    }

}

Form.prototype.createFields = function (response) {
    var self = this;
    var collection = new Collection();

    response.fields.forEach(function (field) {

            switch (field.type) {

                case 'text':                
                case 'email':
                case 'hidden':
                    self.fields.add(collection.createInput(field));
                    break;

                case 'choice':
                    self.fields.add(collection.createSelect(field));
                    break;

            }

    });
    return self;
}

Form.prototype.wrap = function (props) {
    var self = this;
    var form = $(tpls.form);

    form.attr(props)

    self.fields.get().forEach(function (f) {
        form.find('.smb-holder').before(f);
    });
    
    self.form.set(form)
}



