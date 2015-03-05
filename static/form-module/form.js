;+function () {
    'use strict';


    var response = {
        "method": "POST",
        "url": "/foo.php",
        "fields": [
            {

                "type": "text",
                "label": "Name",
                "required": true,
                "name": "name",
                "constraints": [
                    {
                        "type": "notblank",
                        "length":4,
                        "message": "4 characters minimum"
                    }
                ]

            }, 

            {

                "type": "text",
                "label": "Title",
                "name": "title"

            },

            {

                "type": "hidden",
                "label": "hidden",
                "name": "hidden"

            },

            {

                "type": "email",
                "label": "Email",
                "required": true,
                "name": "email",
                "constraints": [

                    {
                        "type": "notblank",
                        "message": "This value can not be empty"
                    }

                ]

            },

            {

                "type": "choice",
                "label": "Category",
                "required": true,
                "name": "category",
                "options": {
                    "choices": {
                        "html": "HTML",
                        "css": "CSS",
                        "js": "JavaScript"
                    }
                },

                "constraints": [
                    {
                        "type": "notblank",
                        "message": "This value can not be empty"
                    }
                ]
            }
        ]
    };


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

    function Collection () {
        var self = this;

        self.injectProps = function (element,attrs,label) {

            // Fill label and placeholder for better usability
            element
                .find('label')
                    .text(label).end()
                .find('input')
                    .attr('placeholder',label);

            Object.keys(attrs).forEach(function (attr) {
                element.find(attr).attr(attrs[attr])
            });

            return self;   
        }

        self.setValidation = function (element, constraints) {
            if (!constraints) return self;

            var input = element.find('input');
            input.attr('title',constraints[0].message)

            if (constraints[0].length) {
                input.attr('pattern', '.{'+constraints[0].length+',}')
            }

            return self;
        }

        self.isHidden = function (element,type) {
            if (type === 'hidden') element.css('display', 'none');
        }
    }

    Collection.prototype.createSelect = Select;
    Collection.prototype.createInput = Input;

    function Select(props) {
        var opts,attrs,elm, self = this;
        opts = props.options.choices;
        attrs = {
            'select':['required','name'].reduce(function (o,i) { o[i]=props[i]; return o; }, {})
        }
        elm = $(tpls.select);

        // Inject each taken prop into input
        self.injectProps(elm,attrs,props.label)
        
        // Collect options
        elm.find('select').html(self.getOptions(opts))
        
        return elm;
    }

    function Input(props) {
        var elm,attrs,self = this;
        elm = $(tpls.input);
        attrs = {
            'input':['required','name','type'].reduce(function (o,i) { o[i]=props[i]; return o; }, {})
        }

        // Inject each taken attr into input and set fill text.
        // Then set custom validation if necessarily      
        self
          .injectProps(elm,attrs,props.label)
          .setValidation(elm,props.constraints)
          .isHidden(elm,props.type)

        return elm;
    }

    Collection.prototype.getOptions = function (options) {
       return Object.keys(options).map(function (choice) {
            return '<option value="'+choice+'" label="'+options[choice]+'">'+options[choice]+'</option>'
        }).join('')       
    }

    // Imagine we get response. Then we create our custom form;
    var testForm = new Form(response);

    // Then we can easily append it into whatever element
    $('body').append(testForm.form.get());

    // or get array of fields and do stuff
    console.info('fields here', testForm.field.get())
}();