# form-generator

#Usage
Use Form constructor with your custom props for getting Form object with some public methods. <br />
var yourForm = new Form(yourprops);

#Methods:
	Public:
		yourForm.fields.get() - return array with created fields. Each part is jQuery object;
		yourForm.form.get() - return whole form which you can append whatever you want;
	Private:
		test

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
