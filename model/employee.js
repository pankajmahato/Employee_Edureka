var mongoose = require('mongoose');
var Response = require("../response.js");
mongoose.connect('mongodb://employee:12345@ds059316.mlab.com:59316/employeedb');

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
		type: String
	},
	department: {
		type: String
	},
	gender: {
		type: String
	},
	age: {
		type: Number
	}
});

var Employee = mongoose.model('employee', empSchema);

var employeeDao = {

	findAll: findAll,
	updateEmployee: updateEmployee,
	addEmployee: addEmployee,
	deleteEmployee: deleteEmployee
};


function findAll(req, res) {
	var response = new Response();

	Employee.find().exec(function(err, employees) {
		if (!err) {
			response.data.employees = employees;
			response.status.statusCode = '200';
			response.status.message = 'fetched the employees';
			res.status(200).send(response);
		} else {
			response.status.statusCode = '500';
			response.status.message = 'unable to fetch blogs ';
			res.status(500).send(response);
		}
	});
}

function addEmployee(req, res) {
	var response = new Response();
	Employee.create(req.body, function(err, data) {
		if (!err) {
			response.data.employee = data;
			response.status.statusCode = '200';
			response.status.message = 'add the employee';
			res.status(200).send(response);
		} else {
			response.status.statusCode = '500';
			response.status.message = 'unable to add employee ';
			res.status(500).send(response);
		}
	});
}

function updateEmployee(req, res) {
	var response = new Response();


	var employee = req.body.employee;
	var searchQuery = {
		"_id": req.body.employeeId
	};
	var updateQuery = {
		$set: {
			name: employee.name,
			email: employee.email,
			dob: employee.dob,
			department: employee.department,
			gender: employee.gender
		}
	};
	var options = {
		new: true
	};

	Employee.findOneAndUpdate(searchQuery, updateQuery, options, function(err, updatedBlog) {
		if (!err) {
			response.data.employees = updatedBlog;
			response.status.statusCode = '200';
			response.status.message = 'updated the employee';
			res.status(200).send(response);
		} else {
			response.status.statusCode = '500';
			response.status.message = 'unable to update employee ';
			res.status(500).send(response);
		}
	});
}

function deleteEmployee(req, res) {
	var response = new Response();

	Employee.findOne({
		_id: req.params.employeeId
	}, function(err, employee) {
		if (!err) {
			employee.remove(function(err, data) {
				if (!err) {
					response.status.statusCode = '200';
					response.status.message = 'deleted the employee';
					res.status(200).send(response);
				} else {
					response.status.statusCode = '500';
					response.status.message = 'unable to delete employee ';
					res.status(500).send(response);
				}
			});

		} else {
			response.status.statusCode = '500';
			response.status.message = 'unable to delete employee ';
			res.status(500).send(response);
		}
	});
}

module.exports = employeeDao;