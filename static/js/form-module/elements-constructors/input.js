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