var woContent = document.getElementById("woNew");
var ajaxTable = [];

console.log(woContent)

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
						"&lbs="+lbs+

	console.log(woParams);

	req.open("GET", '/insert' + "?" +woParams, true);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	req.addEventListener('load', function () {
		 if(req.status >= 200 && req.status < 400){
		 	console.log('request sent sucessfully');
		 	var response = JSON.parse(req.response);
		 	console.log("here ", response);
		 	var id = response.workouts;

		 	ajaxTable = [];
		 	ajaxTable.push(id, name, reps, weight, date, lbs);

		 	console.log(ajaxTable);

		 	var tableMaker = document.getElementById('worktable');
		 	tableMaker.style.display = 'inherit' ;
		 	tableMaker.innerHTML = thediv;
		 	var newRow = tableMaker.insertRow(-1);

		 	var Cell = [];
		 	for(var i=0; i<ajaxTable.length; i++){
		 		Cell.push(document.createElement('td'));
		 		Cell[i].textContent = ajaxTable[i];
		 		newRow.appendChild(Cell[i]);
		 	}

		 	//Cell[0].style.display = "none";

		 	var updatebtn = '<input type="button" value="Update" onclick="updateRow(\x27ajxTbl\x27,this,{{this.id}})">';
		 	var deletebtn = '<input type="button" value="Delete" onclick="deleteRow(\x27ajxTbl\x27,this,{{this.id}})"/>';

		 	Cell.push(document.createElement('td'));
		 	Cell[6].innerHTML = updatebtn;
		 	newRow.appendChild(Cell[6]);

		 	Cell.push(document.createElement('td'));
		 	Cell[7].innerHTML = deletebtn;
		 	newRow.appendChild(Cell[7]);

		 	var theform = tableMaker.insertRow(-1);
		 	theform.id = "ajaxupdate";
		 	theform.style.display = 'none';
		 	theform.appendChild ("<div id=ajaxupdate style=\x27display: none\x27>\
		<form>\
			<label>Name:\
				<input type=\x27text\x27 name=\x27Name\x27 id=\x27Name\x27 value=\x27{{this.name}}\x27>\
			</label>\
	\
			<label>Reps:\
				<input type=\x27number\x27 name=\x27Reps\x27 id=\x27Reps\x27 value=\x27{{this.reps}}\x27>\
			</label>\
	\
			<label>Weight:\
				<input type\x27number\x27 name=\x27Weight\x27 id=\x27Weight\x27 value=\x27{{this.weight}}\x27>\
			</label>\
	\
			<label>Date\
				<input type=\x27date\x27 name=\x27Date\x27 id=\x27Date\x27 value=\x27{{this.date}}\x27>\
			</label>\
	\
			<label>Lbs:1, Kg:0\
				<input type=\x27boolean\x27 name=\x27Lbs\x27 id=\x27Lbs\x27 value=\x27{{this.lbs}}\x27>\
			</label>\
			<input type=\x27Submit\x27 name=\x27Submit\x27 value=\x27Update\x27>\
		</form>\
	</div>\ ");

		 	
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

	table.rows[wID].style.display ='none';
}

function updateRow(TableID, curRow, wID){
	var dissapear = document.getElementById(serverTable)
	var updater = document.getElementById(ajaxupdate);
	updater.style.display = 'inherit';
	dissapear.style.display = 'inherit';

	updater.addEventListener('submit', function (a) {
		  a.preventDefault()
	});

}