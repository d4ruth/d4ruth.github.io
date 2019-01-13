var iq = {
	
	//Variables
	numIq : 0,
	iqBacklog : 0.00,
	iqPerMilli : 0.00,
	numIncrementers : 0,
	productLevel : 0,
	questLevel : 0,
	
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
		htmlManagement.setInnerHTML("iqproduct", this.currentProduct.getButtonText());
		if (this.currentQuest != null) {
			htmlManagement.setInnerHTML("iqquest", this.currentQuest.getQuestText());
		}
		else {
			htmlManagement.setInnerHTML("iqquest", '');
		}
		if (this.currentProduct != null) {
			htmlManagement.setInnerHTML("iqstats", this.currentProduct.formalName + ': ' + this.numIncrementers + ', ' + this.iqPerMilli.toFixed(3) + ' IQ points/update');
		}
		else {
			alert("ERROR: no iq.currentProduct found");
		}
	},
	
	getProduct : function() {
		if (this.currentProduct != null && this.currentProduct.canAffordPurchase()) {
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
			this.currentProduct.increaseCost();
			htmlManagement.setInnerHTML("iqproduct", this.currentProduct.getButtonText());
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
			if (!this.nextProduct.revealed && this.nextProduct.canAffordUpgrade()) {
				this.nextProduct.revealed = true;
				htmlManagement.enable("iqupgrade");
				htmlManagement.setInnerHTML("iqupgrade", this.currentProduct.getUpgradeText(this.nextProduct.name, this.nextProduct.unit, this.nextProduct.upgradeCost));
			}
			else if (this.nextProduct.canAffordUpgrade()) {
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
				this.questLevel += 1;
			}
		}
	},
	getProductUpgrade : function() {
		this.currentProduct = this.nextProduct;
		this.nextProduct = this.products.pop();
		if (this.currentProduct != null) {
			switch(this.currentProduct.unit) {
				case 'money':
					money.numMoney -= this.currentProduct.upgradeCost;
					break;
				case 'iq':
					this.numIq -= this.currentProduct.upgradeCost;
					break;
			}
			this.iqPerMilli = this.numIncrementers * this.currentProduct.increment;
			htmlManagement.setInnerHTML("iqproduct", this.currentProduct.getButtonText());
			htmlManagement.appendText("iqupgrade", ' [ACQUIRED]');
			this.productLevel += 1;
		}
		else {
			alert("ERROR: no iq.currentProduct found");
		}
	},
	
	//Flags
	gotFirstProduct : false,
	gotFirstProductFunc : function() {
		htmlManagement.setVisible("iqproduct");
		this.gotFirstProduct = true;
	},
	
	gotStats : false,
	gotStatsFunc : function() {
		htmlManagement.setVisible("iqstats");
		this.gotStats = true;
	},
	
	gotFirstUpgrade : false,
	gotFirstUpgradeFunc : function() {
		htmlManagement.setVisible("iqupgrade");
		this.gotFirstUpgrade = true;
	},
	
	gotSecondQuest : false,
	gotSecondQuestFunc : function() {
		htmlManagement.setVisible("iqbody");
		this.gotSecondQuest = true;
		htmlManagement.setVisible("message");
	},
	
	checkFlags : function() {
		if (!this.gotFirstProduct) {
			if (this.currentProduct != null) {
				if (this.currentQuest == thirdIqQuest && this.currentProduct.canAffordPurchase()) {
					this.gotFirstProductFunc();
				}
			}
			else {
				alert("ERROR: no iq.currentProduct found on load. Every column must start with at least currentProduct and nextProduct initialized");
			}
		}
		
		if (!this.gotStats) {
			if (this.numIncrementers > 0) { 
				this.gotStatsFunc();
			}
		}
		
		if (!this.gotFirstUpgrade) {
			if (this.nextProduct != null) {
				if (this.gotStats && this.nextProduct.canAffordUpgrade()) {
					this.gotFirstUpgradeFunc();
				}
			}
			else {
				alert("ERROR: no iq.nextProduct found on load. Every column must start with at least currentProduct and nextProduct initialized");
			}
		}
		if (!this.gotSecondQuest) {
			if (this.currentQuest != firstIqQuest) {
				this.gotSecondQuestFunc();
			}
		}
	}
};