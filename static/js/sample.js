$(function () {

	$.get('../json/response.json', function (data) {
	    var testForm = new module.Form(data);
	    console.info('Public methods', testForm);
	    
	    // Then we can easily append it into whatever element
	    $('.container').append(testForm.form.get());

	    // or get array of fields and do stuff
	    console.info('fields here', testForm.fields.get())
	});
})
