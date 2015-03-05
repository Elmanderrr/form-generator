// server 
global.app = require('express')();
var http = require('http').Server(app);

// helpers 
var serveStatic = require('./serve-static');


http.listen(3000, function () {
	console.log('Server is running on 3000 port')
});



