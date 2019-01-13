var money = {
	
	//Variables
	numMoney : 0,
	moneyBacklog : 0.00,
	moneyPerMilli : 0.00,
	numIncrementers : 0,
	productLevel : 0,
	questLevel : 0,
	
	//Quests
	quests: moneyQuestStack,
	currentQuest: null,
	
	//Products
	products : moneyProductStack,
	nextProduct : null,
	currentProduct : null,
	
	//Functions
	onload : function() {
		this.currentQuest = this.quests.pop();
		this.currentProduct = this.products.pop();
		this.nextProduct = this.products.pop();
		this.displayMoney();
	},
	
	update : function() {
		this.checkFlags();
		this.checkButtons();
		this.checkQuest();
		this.moneyBacklog += this.moneyPerMilli;
		if (this.moneyBacklog >= 1) {
			var total = Math.trunc(this.moneyBacklog);
			this.moneyBacklog -= total;
			this.numMoney += total;
		}
		this.displayMoney();
	},
	
	displayMoney : function() {
		htmlManagement.setInnerHTML("money", (this.numMoney / 100).toFixed(2));
		htmlManagement.setInnerHTML("moneyproduct", this.currentProduct.getButtonText());
		if (this.currentQuest != null) {
			htmlManagement.setInnerHTML("moneyquest", this.currentQuest.getQuestText());
		}
		else {
			htmlManagement.setInnerHTML("moneyquest", '');
		}
		if (this.currentProduct != null) {
			htmlManagement.setInnerHTML("moneystats", this.currentProduct.formalName + ': ' + this.numIncrementers + ', ' + '$' + this.moneyPerMilli.toFixed(3) + '/update');
		}
		else {
			alert("ERROR: no money.currentProduct found");
		}
	},
	
	getProduct : function() {
		if (this.currentProduct != null && this.currentProduct.canAffordPurchase()) {
			this.moneyPerMilli += this.currentProduct.increment;
			this.numIncrementers += 1;
			switch(this.currentProduct.unit) {
				case 'money':
					this.numMoney -= this.currentProduct.cost;
					break;
				case 'iq':
					iq.numIq -= this.currentProduct.cost;
					break;
				default:
					alert("ERROR: product unit must be either 'money' or 'iq'");
					break;
			}
			this.currentProduct.increaseCost();
			htmlManagement.setInnerHTML("moneyproduct", this.currentProduct.getButtonText());
		}
		else {
			alert("ERROR: no money.currentProduct found");
		}
	},
	
	checkButtons : function() {
		//check product button
		if (this.currentProduct != null) {
			if (this.currentProduct.canAffordPurchase()) {		
				htmlManagement.enable("moneyproduct");
			}
			else {
				htmlManagement.disable("moneyproduct");
			}
		}
		else {
			alert("ERROR: no money.currentProduct found");
		}
		
		//check product upgrade button
		if (this.gotStats && this.nextProduct != null) {
			if (!this.nextProduct.revealed && this.nextProduct.canAffordUpgrade()) {
				this.nextProduct.revealed = true;
				htmlManagement.enable("moneyupgrade");
				htmlManagement.setInnerHTML("moneyupgrade", this.currentProduct.getUpgradeText(this.nextProduct.name, this.nextProduct.unit, this.nextProduct.upgradeCost));
			}
			else if (this.nextProduct.canAffordUpgrade()) {
				htmlManagement.enable("moneyupgrade");
			}
			else {
				htmlManagement.disable("moneyupgrade");
			}
		}
		else {
			htmlManagement.disable("moneyupgrade");
		}
	},
	
	checkQuest : function() {
		if (this.currentQuest != null) {
			if (this.currentQuest.canGet()) {
				this.numMoney += this.currentQuest.gain;
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
					this.numMoney -= this.currentProduct.upgradeCost;
					break;
				case 'iq':
					iq.numIq -= this.currentProduct.upgradeCost;
					break;
			}
			this.moneyPerMilli = this.numIncrementers * this.currentProduct.increment;
			htmlManagement.setInnerHTML("moneyproduct", this.currentProduct.getButtonText());
			htmlManagement.appendText("moneyupgrade", ' [ACQUIRED]');
			this.productLevel += 1;
		}
		else {
			alert("ERROR: no money.currentProduct found");
		}
	},
	
	//Flags
	gotFirstProduct : false,
	gotFirstProductFunc : function() {
		htmlManagement.setVisible("moneyproduct");
		this.gotFirstProduct = true;
	},
	
	gotStats : false,
	gotStatsFunc : function() {
		htmlManagement.setVisible("moneystats");
		this.gotStats = true;
	},
	
	gotFirstUpgrade : false,
	gotFirstUpgradeFunc : function() {
		htmlManagement.setVisible("moneyupgrade");
		this.gotFirstUpgrade = true;
	},
	
	gotSecondQuest : false,
	gotSecondQuestFunc : function() {
		htmlManagement.setVisible("moneybody");
		this.gotSecondQuest = true;
		htmlManagement.setVisible("message");
	},
	
	checkFlags : function() {
		if (!this.gotFirstProduct) {
			if (this.currentProduct != null) {
				if (this.currentProduct.canAffordPurchase()) {
					this.gotFirstProductFunc();
				}
			}
			else {
				alert("ERROR: no money.currentProduct found on load. Every column must start with at least currentProduct and nextProduct initialized");
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
				alert("ERROR: no money.nextProduct found on load. Every column must start with at least currentProduct and nextProduct initialized");
			}
		}
		if (!this.gotSecondQuest) {
			if (this.currentQuest != firstMoneyQuest) {
				this.gotSecondQuestFunc();
			}
		}
	}
};