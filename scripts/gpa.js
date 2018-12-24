var gpa = {

	//Flags
	firstMessage : false,
	
	//Variables
	numGPA : -100000000,
	GPAbacklog : 0.0,
	GPApermilli : 0.0,
	
	//Incrementers
	numAlarmClocks : 0,
	
	onload : function() {
		this.displayGPA();
	},
	
	update : function() {
		//Check flags
		if (!this.firstMessage) {
			if (this.numGPA >= -99999950) {
				this.getFirstMessage();
			}
		}
		
		//General updates
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
	
	getFirstMessage : function() {
		if (!this.firstMessage) {
			this.firstMessage = true;
			message.addMessage("Hi sweetie!<br><br>I logged into your MyStudentHub account and saw your GPA is going up. I'm so happy you're finally back on track. Dad and I are very proud of you. I've enclosed $5.00 as a reward for my little baby trying hard at school! If you keep up the good work, I'll talk with dad about sending more ;)<br><br>XOXO,<br>Mom");
			htmlManagement.setVisible("message");
			htmlManagement.setVisible("moneybody");
			money.numMoney += 500;
		}
	},
	
	getAlarmClock : function() {
		this.GPApermilli += 0.002;
		this.numAlarmClocks += 1;
	}
};