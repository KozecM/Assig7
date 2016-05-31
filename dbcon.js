var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit	: 10,
	host			: 'localhost',
	user			: 'root',
	password		: 'default',
	database		: 'workoutdb'
});

module.exports.pool = pool;