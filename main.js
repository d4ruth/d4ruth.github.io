var main = {
	
	//Variables
	numGPA : 0,
	
	//Functions
	onload : function() {
		this.displayGPA();
	},
	doHomework : function() {
		this.numGPA += 1;
		this.displayGPA();
	},
	
	displayGPA : function() {
		document.getElementById("gpa").innerHTML = this.numGPA / 100;
	}
};

window.onload = main.onload.bind(main);