var express = require('express');
var app = express();

var Employee = require('./model/employee.js');

var employee1 = new Employee({
	name: 'Raju',
	username: 'check123',
	city: 'Bangalore',
	mobile: 9987654321,
	other: {
		designation: 'Manager',
		email: 'raju@abc.com'
	}
});

// to add a document
employee1.save(function(err, employ, num) {
	if (err) {
		console.log('error occured');
	} else {
		console.log('saved ' + num + ' record');
		console.log('Details ' + employ);
	}
});

// to retrieve all documents
Employee.find({}, function(err, data) {
	if (err) {
		console.log('error occured');
	}
	console.log(data);
});

// to retrieve one document
Employee.findOne({
	name: 'Raju'
}, function(err, data) {
	if (err) {
		console.log('error occured');
	}
	console.log(data);
});

// to update all documents
Employee.update({
	city: 'Bangalore'
}, {
	city: 'Bengaluru'
}, function(err) {
	if (err) {
		console.log('error occured');
	}
	console.log('updated ');
});

// To find one document and update it
Employee.findOneAndUpdate({
	name: 'Raju'
}, {
	mobile: 9797979797
}, function(err, data) {
	if (err) {
		console.log('error occured');
	}
	console.log('updated ' + data);
});

// to remove a document
Employee.remove({
	name: 'Ram'
}, function(err) {
	if (err) {
		console.log('error occured');
	}
});