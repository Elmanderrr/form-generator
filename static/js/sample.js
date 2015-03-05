$(function () {

	$.get('../json/response.json', function (data) {
	    var testForm = new Form(data);
	    console.info('Public methods', testForm)
	    // Then we can easily append it into whatever element
	    $('body').append(testForm.form.get());

	    // or get array of fields and do stuff
	    console.info('fields here', testForm.fields.get())
	});
})
