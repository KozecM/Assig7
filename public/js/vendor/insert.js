
function Workout() {

	console.log("here");
	this.insert = function(){
		var woContent = document.getElementById("form_post");
		console.log(woContent.value.indexOf("name"));
	}
}

var wo = new Workout();