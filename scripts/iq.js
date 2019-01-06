var iq = {
	
	//Variables
	numIq : 0,
	iqBacklog : 0.00,
	iqPerMilli : 0.00,
	numIncrementers : 0,
	
	//Quests
	quests: iqQuestStack,
	currentQuest: null,
	
	//Products
	products : iqProductStack,
	nextProduct : null,
	currentProduct : null,
	
	//Functions
	onload : function() {
		this.currentQuest = this.quests.pop();
		
		this.currentProduct = this.products.pop();
		this.nextProduct = this.products.pop();
		
		//initialize upgrade button text
		if (this.currentProduct != null) {
			htmlManagement.setInnerHTML("iqproduct", this.currentProduct.getButtonText());
			if (this.nextProduct != null) {
				htmlManagement.setInnerHTML("iqupgrade", this.currentProduct.getUpgradeText(this.nextProduct.name, this.nextProduct.unit, this.nextProduct.upgradeCost));
			}
			else {
				alert("ERROR: no iq.nextProduct found on load. Every column must start with at least currentProduct and nextProduct initialized");
			}
		}
		else {
			alert("ERROR: no iq.currentProduct found on load. Every column must start with at least currentProduct and nextProduct initialized");
		}
		this.displayIq();
	},
	
	update : function() {
		this.checkFlags();
		this.checkButtons();
		this.checkQuest();
		this.iqBacklog += this.iqPerMilli;
		if (this.iqBacklog >= 1) {
			var total = Math.trunc(this.iqBacklog);
			this.iqBacklog -= total;
			this.numIq += total;
		}
		this.displayIq();
	},
	
	displayIq : function() {
		htmlManagement.setInnerHTML("iq", this.numIq);
		if (this.currentQuest != null) {
			htmlManagement.setInnerHTML("iqquest", this.currentQuest.getQuestText());
		}
		if (this.currentProduct != null) {
			htmlManagement.setInnerHTML("iqstats", this.currentProduct.formalName + ': ' + this.numIncrementers + ', ' + this.iqPerMilli.toFixed(3) + ' IQ points/update');
		}
		else {
			alert("ERROR: no iq.currentProduct found");
		}
	},
	
	getProduct : function() {
		if (this.currentProduct != null) {
			this.iqPerMilli += this.currentProduct.increment;
			this.numIncrementers += 1;
			switch(this.currentProduct.unit) {
				case 'money':
					money.numMoney -= this.currentProduct.cost;
					break;
				case 'iq':
					iq.numIq -= this.currentProduct.cost;
					break;
				default:
					alert("ERROR: product unit must be either 'money' or 'iq'");
					break;
			}
		}
		else {
			alert("ERROR: no iq.currentProduct found");
		}
	},
	
	checkButtons : function() {
		//check product button
		if (this.currentProduct != null) {
			if (this.currentProduct.canAffordPurchase()) {		
				htmlManagement.enable("iqproduct");
			}
			else {
				htmlManagement.disable("iqproduct");
			}
		}
		else {
			alert("ERROR: no iq.currentProduct found");
		}
		
		//check product upgrade button
		if (this.gotStats && this.nextProduct != null) {
			if (!this.nextProduct.revealed && this.nextProduct.canAffordUpgrade(this.numIncrementers)) {
				this.nextProduct.revealed = true;
				htmlManagement.enable("iqupgrade");
				htmlManagement.setInnerHTML("iqupgrade", this.currentProduct.getUpgradeText(this.nextProduct.name, this.nextProduct.unit, this.nextProduct.upgradeCost));
			}
			else if (this.nextProduct.canAffordUpgrade(this.numIncrementers)) {
				htmlManagement.enable("iqupgrade");
			}
			else {
				htmlManagement.disable("iqupgrade");
			}
		}
		else {
			htmlManagement.disable("iqupgrade");
		}
	},
	
	checkQuest : function() {
		if (this.currentQuest != null) {
			if (this.currentQuest.canGet()) {
				this.numIq += this.currentQuest.gain;
				message.addMessage(this.currentQuest.message);
				this.currentQuest = this.quests.pop();
			}
		}
	},
	getProductUpgrade : function() {
		this.currentProduct = this.nextProduct;
		this.nextProduct = this.products.pop();
		if (this.currentProduct != null) {
			switch(this.currentProduct.unit) {
				case 'money':
					money.numMoney -= this.currentProduct.upgradeCost * this.numIncrementers;
					break;
				case 'iq':
					this.numIq -= this.currentProduct.upgradeCost * this.numIncrementers;
					break;
			}
			this.GPApermilli = this.numIncrementers * this.currentProduct.increment;
			htmlManagement.setInnerHTML("iqproduct", this.currentProduct.getButtonText());
			htmlManagement.appendText("iqupgrade", ' [ACQUIRED]');
		}
		else {
			alert("ERROR: no iq.currentProduct found");
		}
	},
	
	//Flags
	gotFirstProduct : false,
	gotStats : false,
	gotFirstUpgrade : false,
	gotSecondQuest : false,
	
	checkFlags : function() {
		if (!this.gotFirstProduct) {
			if (this.currentProduct != null) {
				if (this.currentProduct.canAffordPurchase()) {
					htmlManagement.setVisible("iqproduct");
					this.gotFirstProduct = true;
					this.currentProduct.revealed = true;
				}
			}
			else {
				alert("ERROR: no iq.currentProduct found on load. Every column must start with at least currentProduct and nextProduct initialized");
			}
		}
		if (!this.gotStats) {
			if (this.numIncrementers > 0) { 
				htmlManagement.setVisible("iqstats");
				this.gotStats = true;
			}
		}
		if (!this.gotFirstUpgrade) {
			if (this.nextProduct != null) {
				if (this.gotStats && this.nextProduct.canAffordUpgrade(this.numIncrementers)) {
					htmlManagement.setVisible("iqupgrade");
					this.gotFirstUpgrade = true;
				}
			}
			else {
				alert("ERROR: no iq.nextProduct found on load. Every column must start with at least currentProduct and nextProduct initialized");
			}
		}
		if (!this.gotSecondQuest) {
			if (this.currentQuest != firstIqQuest) {
				htmlManagement.setVisible("iqbody");
				this.gotSecondQuest = true;
				htmlManagement.setVisible("message");
			}
		}
	}
};