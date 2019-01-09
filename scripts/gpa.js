var gpa = {
	
	//Variables
	numGPA : -100000000,
	GPAbacklog : 0.0,
	GPApermilli : 0.0,
	numIncrementers : 0,
	clickLevel : 1,
	productLevel : 0,
	clickProductLevel : 0,
	
	//Products (NOTE: this is a STACK, so products are listed in reverse order of acquisition 
	products : gpaProductStack,
	nextProduct : null,
	currentProduct : null,
	
	//Click products (like Products, this is a STACK)
	clickProducts : gpaClickStack,
	currentClickProduct : null,
	nextClickProduct : null,
	
	//Functions
	onload : function() {
		this.currentProduct = this.products.pop();
		this.nextProduct = this.products.pop();
		this.currentClickProduct = this.clickProducts.pop();
		this.nextClickProduct = this.clickProducts.pop();
		this.displayGPA();
	},
	
	update : function() {	
		this.checkFlags();
		this.checkButtons();
		this.GPAbacklog += this.GPApermilli;
		if (this.GPAbacklog >= 1) {
			var total = Math.trunc(this.GPAbacklog);
			this.GPAbacklog -= total;
			this.numGPA += total;
		}
		this.displayGPA();
	},
	
	doClick : function() {
		this.numGPA += this.clickLevel;
		this.displayGPA();
	},
	
	displayGPA : function() {
		htmlManagement.setInnerHTML("gpa", (this.numGPA / 100).toFixed(2));
		htmlManagement.setInnerHTML("gpaclick",this.currentClickProduct.buttontext);
		htmlManagement.setInnerHTML("gpaproduct", this.currentProduct.getButtonText());
		if (this.currentProduct != null) {
			htmlManagement.setInnerHTML("gpastats", this.currentProduct.formalName + ': ' + this.numIncrementers + ', ' + this.GPApermilli.toFixed(3) + ' GPAs/update');
		}
		else {
			alert("ERROR: no gpa.currentProduct found");
		}
	},
	
	getProduct : function() {
		if (this.currentProduct != null) {
			this.GPApermilli += this.currentProduct.increment;
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
			htmlManagement.setInnerHTML("gpaproduct", this.currentProduct.getButtonText());
		}
		else {
			alert("ERROR: no gpa.currentProduct found");
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
					iq.numIq -= this.currentProduct.upgradeCost;
					break;
			}
			this.GPApermilli = this.numIncrementers * this.currentProduct.increment;
			htmlManagement.setInnerHTML("gpaproduct", this.currentProduct.getButtonText());
			htmlManagement.appendText("gpaupgrade", ' [ACQUIRED]');
			this.productLevel += 1;
		}
		else {
			alert("ERROR: no gpa.currentProduct found");
		}
	},
	
	getClickProduct : function() {
		if (this.nextClickProduct != null)
		{
			switch(this.nextClickProduct.unit) {
				case 'money':
					money.numMoney -= this.nextClickProduct.cost;
					break;
				case 'iq':
					iq.numIq -= this.nextClickProduct.cost;
					break;
			}
			this.clickLevel = this.nextClickProduct.increment;
			htmlManagement.setInnerHTML("gpaclick", this.nextClickProduct.buttontext);
			htmlManagement.appendText("clickproduct", ' [ACQUIRED]');
			this.currentClickProduct = this.nextClickProduct;
			this.nextClickProduct = this.clickProducts.pop();
			this.clickProductLevel += 1;
		}
		else {
			alert("ERROR: no gpa.nextClickProduct found");
		}
	},
	
	checkButtons : function() {
		//check product button
		if (this.currentProduct != null) {
			if (this.currentProduct.canAffordPurchase()) {		
				htmlManagement.enable("gpaproduct");
			}
			else {
				htmlManagement.disable("gpaproduct");
			}
		}
		else {
			alert("ERROR: no gpa.currentProduct found");
		}
		
		//check product upgrade button
		if (this.gotStats && this.nextProduct != null) {
			if (!this.nextProduct.revealed && this.nextProduct.canAffordUpgrade()) {
				this.nextProduct.revealed = true;
				htmlManagement.enable("gpaupgrade");
				htmlManagement.setInnerHTML("gpaupgrade", this.currentProduct.getUpgradeText(this.nextProduct.name, this.nextProduct.unit, this.nextProduct.upgradeCost));
			}
			else if (this.nextProduct.canAffordUpgrade()) {
				htmlManagement.enable("gpaupgrade");
			}
			else {
				htmlManagement.disable("gpaupgrade");
			}
		}
		else {
			htmlManagement.disable("gpaupgrade");
		}
		
		//check clickproduct button
		if (this.nextClickProduct != null) {
			if (!this.nextClickProduct.revealed && this.nextClickProduct.canAffordPurchase()) {
				this.nextClickProduct.revealed = true;
				htmlManagement.enable("clickproduct");
				htmlManagement.setInnerHTML("clickproduct", this.nextClickProduct.getUpgradeText());
			}
			else if (this.nextClickProduct.canAffordPurchase()) {
				htmlManagement.enable("clickproduct");
			}
			else {
				htmlManagement.disable("clickproduct");
			}
		}
		else {
			htmlManagement.disable("clickproduct");
		}
	},
	
	//Flags
	gotFirstProduct : false,
	gotFirstProductFunc : function() {
		htmlManagement.setVisible("gpaproduct");
		this.gotFirstProduct = true;
	},
	
	gotStats : false,
	gotStatsFunc : function() {
		htmlManagement.setVisible("gpastats");
		this.gotStats = true;
	},
	
	gotFirstClickProduct : false,
	gotFirstClickProductFunc : function() {
		htmlManagement.setVisible("clickproduct");
		this.gotFirstClickProduct = true;
	},
	
	gotFirstUpgrade : false,
	gotFirstUpgradeFunc : function() {
		htmlManagement.setVisible("gpaupgrade");
		this.gotFirstUpgrade = true;
	},
	
	checkFlags : function() {
		if (!this.gotFirstProduct) {
			if (this.currentProduct != null) {
				if (this.currentProduct.canAffordPurchase()) {
					this.gotFirstProductFunc();
				}
			}
			else {
				alert("ERROR: no gpa.currentProduct found on load. Every column must start with at least currentProduct and nextProduct initialized");
			}
		}
		
		if (!this.gotStats) {
			if (this.numIncrementers > 0) { 
				this.gotStatsFunc();
			}
		}
		
		if (!this.gotFirstClickProduct) {
			if (this.nextClickProduct != null) {
				if (this.nextClickProduct.canAffordPurchase()) {
					this.gotFirstClickProductFunc();
				}
			}
			else {
				alert("ERROR: no gpa.nextClickProduct found on load. The GPA column must start with nextClickProduct initialized");
			}
		}
		if (!this.gotFirstUpgrade) {
			if (this.nextProduct != null) {
				if (this.gotStats && this.nextProduct.canAffordUpgrade()) {
					this.gotFirstUpgradeFunc();
				}
			}
			else {
				alert("ERROR: no gpa.nextProduct found on load. Every column must start with at least currentProduct and nextProduct initialized");
			}
		}
	}
};