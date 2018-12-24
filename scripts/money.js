var money = {

	//Flags
	firstMessage : false,
	
	//Variables
	numMoney : 0,
	moneyBacklog : 0.00,
	moneyPerMilli : 0.00,
	
	
	//Functions
	onload : function() {
		this.displayMoney();
	},
	
	update : function() {
		//Check flags
		if (!this.firstMessage) {
			if (gpa.numGPA >= -99999950) {
				this.getFirstMessage();
			}
		}
		
		//General updates
		this.moneyBacklog += this.moneyPerMilli;
		if (this.moneyBacklog >= 1) {
			var total = Math.trunc(this.moneyBacklog);
			this.moneyBacklog -= total;
			this.moneyBacklog += total;
		}
		this.displayMoney();
	},
	getFirstMessage : function() {
		if (!this.firstMessage) {
			this.firstMessage = true;
			message.addMessage("Hi sweetie!<br><br>I logged into your MyStudentHub account and saw your GPA is going up. I'm so happy you're finally back on track. Dad and I are very proud of you. I've enclosed $5.00 as a reward for my little baby trying hard at school! If you keep up the good work, I'll talk with dad about sending more ;)<br><br>XOXO,<br>Mom");
			htmlManagement.setVisible("message");
			htmlManagement.setVisible("moneybody");
			this.numMoney += 500;
		}
	},
	
	displayMoney : function() {
		document.getElementById("money").innerHTML = this.numMoney / 100;
	}
};