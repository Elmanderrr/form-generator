function Factory () {
    var self = this;

    //Inject each taken attr into fields;
    function injectProps (element,attrs,label) {

        // Fill label and placeholder for better usability
        element
            .find('label')
                .text(label).end()
            .find('input')
                .attr('placeholder',label);

        Object.keys(attrs).forEach(function (attr) {
            element.find(attr).attr(attrs[attr])
        });

        return self.methods;   
    }

    function setValidation (element, constraints) {
        if (!constraints) return self.methods;

        var input = element.find('input');
        input.attr('title',constraints[0].message)

        if (constraints[0].length) {
            input.attr('pattern', '.{'+constraints[0].length+',}')
        }

        return self.methods;
    }

    function isHidden (element,type) {
        if (type === 'hidden') element.css('display', 'none');

        return self.methods;
    }

    self.methods = {
        isHidden:isHidden,
        setValidation:setValidation,
        injectProps:injectProps
    }
};


// Use Factory to create our element and give them bunch of methods from self;
Factory.prototype.create = function (type,field) {
    var self = this;
    switch (type) {

        case 'input':
            return new Input(field, self.methods);
            break;

        case 'select':
            return new Select(field, self.methods);
            break;
            
        default:
            break;
    }
    
};


