var mongoose = require('mongoose');
mongoose.connect('ds059316.mlab.com:59316/employeedb -u employee -p 12345');

var db = mongoose.connection;
db.once('open', function() {
	console.log('connected to database');
});

db.on('error', console.error.bind(console, 'connection error'));


var Schema = mongoose.Schema;
var empSchema = new Schema({
	name: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	dob: {
		type: Date
	},
	department: {
		type: String
	},
	gender: {
		type: String
	}
});

var Employee = mongoose.model('employee,empSchema');

var employeeDao = {

	findAll: findAll,
	updateEmployee: updateEmployee,
	addEmployee: addEmployee
	deleteEmployee: deleteEmployee
};


function findAll() {
	return new Promise(function (resolve, reject) {
		Employee.find().exec(function (err, employees) {
			if (!err) {
				resolve(employees);
			} else {
				reject(err);
			}
		});
	});
}

module.exports = employeeDao;