var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/', function (req, res, next) {
	 var context = {};
	 mysql.pool.query('SELECT * FROM workouts', function (err,rows,fields) {
	 	 if (err) {
	 	 	next(err);
	 	 	return;
	 	}
	 	var workTable = [];

	 	for(var i in rows){
	 		workTable.push(rows[i]);
	 	}
	 	context.workout = workTable;
	 	context.results = JSON.stringify(rows);
	 	res.render('worksql',context);
	})
});

app.get('/insert', function (req, res, next) {
	var context = {}; 

		var sql = "INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES(?, ?, ?, ?, ?)";
		mysql.pool.query(sql,[req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs], function (err, result){
			 if(err){
			 	console.log('bummer');
			 	next(err);
			 	return;
			 }
			 context.workout = result.insertId; 
			 console.log(context.workout)
			 res.render('worksql',context);
		});
});

app.get('/delete', function(req,res,next){
	var context = {};

	var sql = "DELETE FROM workouts WHERE id = ?"
	mysql.pool.query(sql,[req.query.id], function (err, result) {
		 if(err){
		 	next(err);
		 	return;
		 }
		 sql = "SELECT * FROM workouts"
		 mysql.pool.query(sql, function (err, rows, fields) {
		 	if (err) {
		 		next(err);
		 		return;
		 	}
		 	context.workout = JSON.stringify(rows);
		 	res.render('worksql', context);
		 }); 
	});
});

app.get('update', function (req, res, next) {
	 var context {};

	 var sql = "SELECT * FROM workouts WHere id=?"

	 mysql.pool.query(sql,[req.query.id], function(err, result){
	 	if(err){
	 		next(err);
	 		return;
	 	}
	 	if (result.length == 1) {
	 		var curVals = result[0];
	 		sql = "UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=?"

	 		mysql.pool.query(sql, [req.query.name || curVals.name, req.query.reps || curVals.reps, req.query.weight || curVals.weight, req.query.date || curVals.date, req.query.lbs || curVals.lbs],
	 			function (err, result) {
	 				 if (err) {
	 				 	next(err);
	 				 	return;
	 				 }
	 				 context.workout = JSON.stringify(result.changedRows);
	 				 res.render('worksql', context);
	 			})
	 	}
	 }) 
})

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});