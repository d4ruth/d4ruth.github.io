var gpa = {

	//General Variables
	numGPA : -100000000,
	GPAbacklog : 0.0,
	GPApermilli : 0.0,
	
	//Incrementers
	numAlarmClocks : 0,
	
	onload : function() {
		this.displayGPA();
	},
	
	update : function() {
		this.GPAbacklog += this.GPApermilli;
		if (this.GPAbacklog >= 1) {
			var total = Math.trunc(this.GPAbacklog);
			this.GPAbacklog -= total;
			this.numGPA += total;
		}
		this.displayGPA();
	},
	
	doHomework : function() {
		this.numGPA += 1;
		this.displayGPA();
	},
	
	displayGPA : function() {
		document.getElementById("gpa").innerHTML = this.numGPA / 100;
	},
	
	getAlarmClock : function() {
		this.GPApermilli += 0.002;
		this.numAlarmClocks += 1;
	}
};