function Select(props, methods) {
    var opts,elm,self = this;
    opts = props.options.choices;
    self.attrs = {
        'select':['required','name'].reduce(function (o,i) { o[i]=props[i]; return o; }, {})
    }
    self.elm = $(tpls.select);

    // Inject each taken prop into input
    methods.injectProps(self.elm,self.attrs,props.label)
    
    // Collect options
    self.elm.find('select').html(self.getOptions(opts))
    
    return self;
}

// return string with html
Select.prototype.getOptions = function (options) {
   return Object.keys(options).map(function (choice) {
        return '<option value="'+choice+'" label="'+options[choice]+'">'+options[choice]+'</option>'
    }).join('')       
}
