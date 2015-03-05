# form-generator

#Usage
	in terminal - nodejs server.js 
	>> http://localhost:3000/ 
	<div>Use Form constructor with your custom props for getting <br /> Form object with some public methods.</div>     
	var yourForm = new Form(yourprops);

#Example:
	$.get('../json/response.json', function (data) {
	    var testForm = new Form(data);
	    $('body').append(testForm.form.get());
	});

#Methods:
	Public:
	yourForm.fields.get() - return array with created fields. Each part is jQuery object;
	yourForm.form.get() - return whole form which you can append whatever you want;
<!-- 	Private:
		Form.wrap() - Wrap all fields in form and add prepared jQuery object to form array;
		Form.createFields - Run through given .type props, create and push each maked field in fields array;
		Collection.injectProps - Inject each taken attr into fields;
		Collection.setValidation - Set validation if needed;
		Collection.isHidden - hide field element if it's hidden;
		Collection.getOptions - return html string with bunch of options for select; -->

#Typical structure should be like here:

	{
	    "method": "POST",
	    "url": "/foo.php",
	    "fields": [{
	
	            "type": "text",
	            "label": "Name",
	            "required": true,
	            "name": "name",
	            "constraints": [{
	                "type": "notblank",
	                "length": 4,
	                "message": "4 characters minimum"
	            }]
	
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
	
	            "constraints": [{
	                "type": "notblank",
	                "message": "This value can not be empty"
	            }]
	        }
	    ]
	}

	
#Scaffolding:
	/form-module
		collection.js - Factory wich return fields that you want (input,select etc.)
			/elements-constructors
				input.js - Part that respond for creating inputs;
				select.js - Same but select with options;

		form.js - main Class which provides you to create and wrap form;
