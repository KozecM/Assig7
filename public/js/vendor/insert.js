
function Workout() {

	this.insert = function(){
		var woContent = document.getElementsById("Name").value;
		console.log(woContent);
	}
}

var wo = new Workout();