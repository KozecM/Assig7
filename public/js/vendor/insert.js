var woContent = document.getElementById("woNew");

console.log(woContent)

woContent.addEventListener("submit", function (e){
	e.preventDefault();

	console.log('here');

	var req = new XMLHttpRequest();

	var woParams ="Name"+woContent.elements.name.value+
						"&reps="+woContent.elements.reps.value+
						"&weight="+woContent.elements.weight.value+
						"&date="+woContent.elements.date.value+
						"&lbs="+woContent.elements.lbs.value+


	req.open("GET", '/insert' + "?" +woParams, true);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	req.addEventListener('load', function () {
		 if(req.status >= 200 && req.status < 400){
		 	console.log('request sent sucessfully');
		 	var response = JSON.parse(req.responseText);
		 	console.log(req.responseText)
		 } 

		 else {
		 	console.log("error happened");
		 }
	});
	req.send('/insert' + "?"+ woParams);
});