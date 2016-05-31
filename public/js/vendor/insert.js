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
		 	var response = req.responseText;
		 	console.log("here" +req.responseText)
		 	var id = response.workouts;

		 	ajaxTable.push(id, name, reps, weight, date, lbs);

		 	console.log(ajaxTable);
		 } 
		 else {
		 	console.log("error happened");
		 }
	});
	req.send('/insert' + "?"+ woParams);
});

function deleteRow(TableID, curRow, wID){
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