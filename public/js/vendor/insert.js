var wocontent = document.getElementById(woNew)

wocontent.addEventListener("submit", function (e){
	e.preventDefault();

	var req = new XMLHttpRequest();

	var woParams ="Name"+wocontent.elements.name.value+
						"&reps="+wocontent.elements.reps.value+
						"&weight="+wocontent.elements.weight.value+
						"&date="+wocontent.elements.date.value+
						"&lbs="+wocontent.elements.lbs.value+


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