
function Workout() {

	this.insert = function(){
		var woContent = document.getElementById("Name").value;
		woContent += ", " +document.getElementById("Reps").value;
		woContent += ", " +document.getElementById("Weight").value;
		woContent += ", " +document.getElementById("Date").value;
		woContent += ", " +document.getElementById("Lbs/Kg").value;

		console.log(woContent);
	}
}

var wo = new Workout();