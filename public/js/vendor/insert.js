
function Workout() {

	this.insert = function(){
		var woContent = document.getElementById("form_post");
		console.log(woContent.value('name'));
	}
}

var wo = new Workout();