var bodyParser = require("body-parser");
var express = require('express'),
	employee = require('./model/employee'),
	app = express();

app.use(express.static('www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	"extended": false
}));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE');
	res.header('Access-Control-Max-Age', '3600');
	res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
	next();
});

app.get('/employee', employee.findAll);
app.get('/employee/:id', employee.findById);
app.post('/employee', employee.addEmployee);
app.put('/employee', employee.updateEmployee);
app.delete('/employee/:employeeId', employee.deleteEmployee);

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});