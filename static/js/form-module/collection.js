function Collection () {
    var self = this;

    //Inject each taken attr into fields;
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


Collection.prototype.getOptions = function (options) {
   return Object.keys(options).map(function (choice) {
        return '<option value="'+choice+'" label="'+options[choice]+'">'+options[choice]+'</option>'
    }).join('')       
}
