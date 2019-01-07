var money = {
	
	//Variables
	numMoney : 0,
	moneyBacklog : 0.00,
	moneyPerMilli : 0.00,
	numIncrementers : 0,
	
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
		
		//initialize upgrade button text
		if (this.currentProduct != null) {
			htmlManagement.setInnerHTML("moneyproduct", this.currentProduct.getButtonText());
			if (this.nextProduct != null) {
				htmlManagement.setInnerHTML("moneyupgrade", this.currentProduct.getUpgradeText(this.nextProduct.name, this.nextProduct.unit, this.nextProduct.upgradeCost));
			}
			else {
				alert("ERROR: no money.nextProduct found on load. Every column must start with at least currentProduct and nextProduct initialized");
			}
		}
		else {
			alert("ERROR: no money.currentProduct found on load. Every column must start with at least currentProduct and nextProduct initialized");
		}
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
		if (this.currentQuest != null) {
			htmlManagement.setInnerHTML("moneyquest", this.currentQuest.getQuestText());
		}
		if (this.currentProduct != null) {
			htmlManagement.setInnerHTML("moneystats", this.currentProduct.formalName + ': ' + this.numIncrementers + ', ' + '$' + this.moneyPerMilli.toFixed(3) + '/update');
		}
		else {
			alert("ERROR: no money.currentProduct found");
		}
	},
	
	getProduct : function() {
		if (this.currentProduct != null) {
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
			if (!this.nextProduct.revealed && this.nextProduct.canAffordUpgrade(this.numIncrementers)) {
				this.nextProduct.revealed = true;
				htmlManagement.enable("moneyupgrade");
				htmlManagement.setInnerHTML("moneyupgrade", this.currentProduct.getUpgradeText(this.nextProduct.name, this.nextProduct.unit, this.nextProduct.upgradeCost));
			}
			else if (this.nextProduct.canAffordUpgrade(this.numIncrementers)) {
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
			}
		}
	},
	
	getProductUpgrade : function() {
		htmlManagement.setInnerHTML("moneyupgrade", this.currentProduct.getUpgradeText(this.nextProduct.name, this.nextProduct.unit, this.nextProduct.upgradeCost));
		this.currentProduct = this.nextProduct;
		this.nextProduct = this.products.pop();
		if (this.currentProduct != null) {
			switch(this.currentProduct.unit) {
				case 'money':
					this.numMoney -= this.currentProduct.upgradeCost * this.numIncrementers;
					break;
				case 'iq':
					iq.numIq -= this.currentProduct.upgradeCost * this.numIncrementers;
					break;
			}
			this.moneyPerMilli = this.numIncrementers * this.currentProduct.increment;
			htmlManagement.setInnerHTML("moneyproduct", this.currentProduct.getButtonText());
			htmlManagement.appendText("moneyupgrade", ' [ACQUIRED]');
		}
		else {
			alert("ERROR: no money.currentProduct found");
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
					htmlManagement.setVisible("moneyproduct");
					this.gotFirstProduct = true;
					this.currentProduct.revealed = true;
				}
			}
			else {
				alert("ERROR: no money.currentProduct found on load. Every column must start with at least currentProduct and nextProduct initialized");
			}
		}
		if (!this.gotStats) {
			if (this.numIncrementers > 0) { 
				htmlManagement.setVisible("moneystats");
				this.gotStats = true;
			}
		}
		if (!this.gotFirstUpgrade) {
			if (this.nextProduct != null) {
				if (this.gotStats && this.nextProduct.canAffordUpgrade(this.numIncrementers)) {
					htmlManagement.setVisible("moneyupgrade");
					this.gotFirstUpgrade = true;
				}
			}
			else {
				alert("ERROR: no money.nextProduct found on load. Every column must start with at least currentProduct and nextProduct initialized");
			}
		}
		if (!this.gotSecondQuest) {
			if (this.currentQuest != firstMoneyQuest) {
				htmlManagement.setVisible("moneybody");
				this.gotSecondQuest = true;
				htmlManagement.setVisible("message");
			}
		}
	}
};