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
		 	var response = req.response
		 	console.log("here ", response.workouts)
		 	var id = response.workouts;

		 	ajaxTable.push(id, name, reps, weight, date, lbs);

		 	console.log(ajaxTable);

		 	var tableMaker = document.getElementById(ajxTbl);
		 	tableMaker.style.display = 'inherit' ;
		 	var newRow = tableMaker.insertRow(-1);

		 	var Cell = [];
		 	for(var i=0; i<ajaxTable.length; i++){
		 		Cell.push(document.createElement('td'));
		 		Cell[i].textContent = ajaxTable[i];
		 		newRow.appendChild(Cell[i]);
		 	}

		 	Cell[0].style.display = "none";

		 	var updatebtn = '<input type="button" value="Update" onclick="updateRow(\x27worktable\x27,this,{{this.id}})">';
		 	var deletebtn = '<input type="button" value="Delete" onclick="deleteRow(\x27worktable\x27,this,{{this.id}})"/>';

		 	Cell.push(document.createElement('td'));
		 	Cell[6].innerHTML = updatebtn;
		 	newRow.appendChild(Cell[6]);

		 	Cell.push(document.createElement('td'));
		 	Cell[7].innerHTML = deletebtn;
		 	newRow.appendChild(Cell[7]);

		 	var serverTable = document.getElementById(worktable);
		 	serverTable.style.display = 'none';
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

}