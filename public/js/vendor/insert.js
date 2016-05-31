var woContent = document.getElementById("woNew");

console.log(woContent)

woContent.addEventListener("submit", function (e){
	e.preventDefault();

	console.log('here');

	var req = new XMLHttpRequest();

	var woParams ="name="+woContent.elements.Name.value+
						"&reps="+woContent.elements.Reps.value+
						"&weight="+woContent.elements.Weight.value+
						"&date="+woContent.elements.Date.value+
						"&lbs="+woContent.elements.Lbs.value+

	console.log(woParams);

	req.open("GET", '/insert' + "?" +woParams, true);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	req.addEventListener('load', function () {
		 if(req.status >= 200 && req.status < 400){
		 	console.log('request sent sucessfully');
		 	var response = req.responseText;
		 	console.log(req.response)
		 } 

		 else {
		 	console.log("error happened");
		 }
	});
	req.send('/insert' + "?"+ woParams);
});