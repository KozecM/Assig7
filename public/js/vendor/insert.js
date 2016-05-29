
function Workout() {

	console.log("here");
	this.insert = function(){
		var woContent = document.getElementById("form_post");
		console.log(woContent.name);
	}
}

var wo = new Workout();