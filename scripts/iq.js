var iq = {
	
	//Variables
	numiq : 0,
	iqBacklog : 0.00,
	iqPerMilli : 0.00,
	
	//Functions
	onload : function() {
		this.displayiq();
	},
	
	update : function() {
		this.iqBacklog += this.iqPerMilli;
		if (this.iqBacklog >= 1) {
			var total = Math.trunc(this.iqBacklog);
			this.iqBacklog -= total;
			this.iqBacklog += total;
		}
		this.displayiq();
	},
	
	displayiq : function() {
		document.getElementById("iq").innerHTML = this.numiq;
	}
};