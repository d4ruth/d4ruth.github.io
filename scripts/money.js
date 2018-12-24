var money = {
	
	//Variables
	numMoney : 0,
	moneyBacklog : 0.00,
	moneyPerMilli : 0.00,
	
	
	//Functions
	onload : function() {
		this.displayMoney();
	},
	
	update : function() {
		this.moneyBacklog += this.moneyPerMilli;
		if (this.moneyBacklog >= 1) {
			var total = Math.trunc(this.moneyBacklog);
			this.moneyBacklog -= total;
			this.moneyBacklog += total;
		}
		this.displayMoney();
	},
	
	displayMoney : function() {
		document.getElementById("money").innerHTML = this.numMoney / 100;
	}
};