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
