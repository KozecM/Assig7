
function Workout() {

	this.insert = function(){
		var woContent = document.getElementById("form_post");
		console.log(woContent('name').value);
	}
}

var wo = new Workout();