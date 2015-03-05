function Input(props,methods) {
    var self = this;
    self.elm = $(tpls.input);
    self.attrs = {
        'input':['required','name','type'].reduce(function (o,i) { o[i]=props[i]; return o; }, {})
    }

    // Inject each taken attr into input and set fill text.
    // Then set custom validation if necessarily      
    methods
      .injectProps(self.elm,self.attrs,props.label)
      .setValidation(self.elm,props.constraints)
      .isHidden(self.elm,props.type)

    return self;
}