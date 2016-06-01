var woContent = document.getElementById("woNew");
var ajaxTable = [];

woContent.addEventListener("submit", function (e){
	e.preventDefault();

	console.log('here');

	var req = new XMLHttpRequest();

	var name = woContent.elements.Name.value;
	var reps = woContent.elements.Reps.value;
	var weight = woContent.elements.Weight.value;
	var date = woContent.elements.Date.value;
	var lbs = woContent.elements.Lbs.value;	

	var woParams ="name="+name+
						"&reps="+reps+
						"&weight="+weight+
						"&date="+date+
						"&lbs="+lbs;

	console.log(woParams);

	req.open("GET", '/insert' + "?" +woParams, true);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	req.addEventListener('load', function () {
		 if(req.status >= 200 && req.status < 400){
		 	console.log('request sent sucessfully');
		 	var response = JSON.parse(req.response);
		 	var id = response.workouts;

		 	ajaxTable = [];
		 	ajaxTable.push(id, name, reps, weight, date, lbs);

		 	var tableMaker = document.getElementById('worktable');
		 	tableMaker.style.display = 'inherit' ;
		 	var newRow = tableMaker.insertRow(-1);

		 	var Cell = [];
		 	for(var i=0; i<ajaxTable.length; i++){
		 		Cell.push(document.createElement('td'));
		 		Cell[i].textContent = ajaxTable[i];
		 		newRow.appendChild(Cell[i]);
		 	}

		 	//Cell[0].style.display = "none";

		 	var updatebtn = '<input type="button" value="Update" onclick="updateRow(\x27worktable\x27,this,'+ id +')">';
		 	var deletebtn = '<input type="button" value="Delete" onclick="deleteRow(\x27worktable\x27,this,'+ id +')"/>';

		 	Cell.push(document.createElement('td'));
		 	Cell[6].innerHTML = updatebtn;
		 	newRow.appendChild(Cell[6]);

		 	Cell.push(document.createElement('td'));
		 	Cell[7].innerHTML = deletebtn;
		 	newRow.appendChild(Cell[7]);

		 	var theform = tableMaker.insertRow(-1);
		 	theform.id = "ajaxupdate";
		 	theform.style.display = 'none';

		 	theform.innerHTML = "\
		 	<td></td>\
			<td><label>Name:\
				<input type=\x27text\x27 name=\x27Name\x27 id=\x27Name\x27 value=\x27" + name +"\x27>\
			</label></td>\
	\
			<td><label>Reps:\
				<input type=\x27number\x27 name=\x27Reps\x27 id=\x27Reps\x27 value=\x27"+ reps +"\x27>\
			</label></td>\
	\
			<td><label>Weight:\
				<input type\x27number\x27 name=\x27Weight\x27 id=\x27Weight\x27 value=\x27"+ weight +"\x27>\
			</label></td>\
	\
			<td><label>Date\
				<input type=\x27date\x27 name=\x27Date\x27 id=\x27Date\x27 value=\x27"+ date +"\x27>\
			</label></td>\
	\
			<td><label>Lbs:1, Kg:0\
				<input type=\x27boolean\x27 name=\x27Lbs\x27 id=\x27Lbs\x27 value=\x27"+ lbs +"\x27>\
			</label></td>\
			<td><input type=\x27button\x27 value=\x27Update\x27 onclick=\x27updateRow(\x27worktable\x27,this,"+ id +")\x27></td>\ "
		 	
		 } 
		 else {
		 	console.log("error happened");
		 }
	});
	req.send('/insert' + "?"+ woParams);
});

function deleteRow(tableID, curRow, wID){
	var table = document.getElementById(tableID);
	var rows = table.rows.length;

	var req = new XMLHttpRequest();

	req.open("GET",'/delete'+ "?id=" + wID, true);
	req.setRequestHeader('Content-Type', 'appication/x-www-form-urlencoded');
	req.addEventListener('load', function () {
		 if (req.status >= 200 && req.status < 400) {
		 	console.log('Request to delete was sent')
		 } else {
		 	console.log('There was an error');
		 } 
	});

	req.send('/delete', "?id=" + wID);

	for (var i = 0; i <= rows; i++) {
		var mainRow = table.rows[i];

		if(mainRow == curRow.parentNode.parentNode){
			table.deleteRow(i);
		}
	}
}

function updateRow(tableID, curRow, wID){
	var update = document.getElementById(tableID);
	var rows = update.rows.length;

	for (var i = 0; i < rows; i++) {
		var mainRow = update.rows[i];

		if(mainRow == curRow.parentNode.parentNode){
			update.rows[i].style.display = 'none';
			update.rows[i+1].style.display = 'table-row';

		}
	}

}

function update(tableID, curRow, wID){
	var table = document.getElementById(tableID);
	var rows = table.rows.length;

	var req = new XMLHttpRequest();

	var name;
	var reps;
	var weight;
	var date;
	var lbs;

	for (var i = 0; i < rows; i++) {
		var mainRow = table.rows[i];

		if(mainRow == curRow.parentNode.parentNode){
			name=table.rows[i].Name.value
			reps =table.rows[i].Reps.value;
			weight =table.rows[i].Weight.value;
			date =table.rows[i].Date.value;			
			lbs =table.rows[i].Lbs.value;
		}
	}

	var woParams ="name="+name+
						"&reps="+reps+
						"&weight="+weight+
						"&date="+date+
						"&lbs="+lbs;

	req.open("GET", '/update', "?" + woParams, true);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	req.addEventListener('load', function () {
		if(req.status >= 200 && req.status < 400){
			console.log('update sent successfully');

			var updatetbl = [];

			updatetbl.push(name, reps, weight, date, lbs);

			for (var i = 0; i < rows; i++) {
				var mainRow = table.rows[i];

				if(mainRow == curRow.parentNode.parentNode){
					table.rows[i-1].Name.textContent = name;
					table.rows[i-1].Reps.textContent = reps;
					table.rows[i-1].Weight.textContent = weight;
					table.rows[i-1].Date.textContent = date;
					table.rows[i-1].Lbs.textContent = lbs;	
					update.rows[i].style.display = 'none';
					update.rows[i-1].style.display = 'table-row';		
				}
			}

		} else {
			console.log("error happened");
		}
	});

}