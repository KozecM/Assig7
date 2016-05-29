
function Workout() {

	this.insert = function(){
		var woContent = document.getElementsByName("name").value;
		console.log(woContent);
	}
}

var wo = new Workout();