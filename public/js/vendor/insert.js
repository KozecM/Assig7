
function Workout() {

	this.insert = function(){
		var woContent = document.getElementsByName("woName").value;
		console.log(woContent);
	}
}

var wo = new Workout();