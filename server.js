var express = require('express'),
	employee = require('./model/employee'),
	app = express();

app.use(express.static('www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

app.get('/employee', employee.findAll);
app.post('/employee', employee.addEmployee);
app.put('/employee', employee.updateEmployee);
app.delete('/employee', employee.deleteEmployee);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});