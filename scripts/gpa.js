var gpa = {
	//Flags
	hasAlarmClock : false,
	
	//Variables
	numGPA : -100000000,
	GPAbacklog : 0.0,
	GPApermilli : 0.0,
	
	//Incrementers
	numAlarmClocks : 0,
	alarmClockPrice : 500,
	alarmClockIncrement : 0.002,
	
	onload : function() {
		this.displayGPA();
	},
	
	update : function() {
		//Flags
		if (!this.hasAlarmClock) {
			if (money.numMoney >= this.alarmClockPrice) {
				htmlManagement.setVisible("alarmclock");
				this.hasAlarmClock = true;
				this.affordAlarmClock = true;
			}
		}
		
		//Buttons
		if (money.numMoney < this.alarmClockPrice) {htmlManagement.disable("alarmclock");}
		else {htmlManagement.enable("alarmclock");}
		
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
	
	getAlarmClock : function() {
		this.GPApermilli += this.alarmClockIncrement;
		this.numAlarmClocks += 1;
		money.numMoney -= this.alarmClockPrice;
	}
	
};