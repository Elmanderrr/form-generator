var serverStatic = require('serve-static');
var server = require('./server');


app.use(serverStatic(__dirname + '/node_modules' ))
app.use(serverStatic(__dirname + '/static' ))
app.use(serverStatic(__dirname + '/view', {'index':['index.html']}))

