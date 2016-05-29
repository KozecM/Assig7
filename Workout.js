var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

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
	 	context.results = JSON.stringify(rows);
	 	res.render('worksql',context);
	});
});

app.post('/', function (req, res, next) {
	var context = {}; 

	//if(req.body['add session']){
		console.log('here')
		var sql = "INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES('chuck', '3', '80', '2016-05-28', 1)";
		mysql.pool.query(sql, function (err,result){
			 if(err){
			 	console.log('bummer')
			 	next(err);
			 	return;
			 }
			 context.workout = JSON.parse(result);
			 console.log('result');
			 res.render('worksql',context);
		});
	//}
});

function deleteRow(TableID, curRow){
	var table = document.getElementById(tableID);
	var rowCount = table.rows.length;
	for (var i = 0; i<rowCount; i++){
		if (row == curRow.parentNode.parentNode){
			table.deleteRow(i);
			rowCount--;
			i--;
		}
	}
}

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