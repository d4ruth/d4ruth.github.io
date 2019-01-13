//Generalized product - pay x amount of some resource, parent resource's incrementer goes up by y

function Product(cost, upgradeCost, unit, increment, name, formalname, flavor) {
	this.cost = cost;
	this.upgradeCost = upgradeCost;
	this.unit = unit;
	this.increment = increment;
	this.name = name;
	this.formalName = formalname;
	this.flavor = flavor;
	this.revealed = false;
	
	this.getButtonText = function() {
		switch(this.unit) {
			case 'money':
				return '$' + ((this.cost / 100)).toFixed(2) + ' - Buy ' + this.name + ' (' + this.flavor + ')';
				break;
			case 'iq':
				return this.cost + ' IQ points - Do ' + this.name + ' (' + this.flavor + ')';
				break;
			default:
				alert("ERROR: product unit must be 'money' or 'iq'");
				return -1;
				break;
		}
	};
	
	this.getUpgradeText = function(newname, newunit, upgradeCost) {
		switch(newunit) {
			case 'money':
				return 'Upgrade ' + this.name + ' to ' + newname + ' ($' + ((upgradeCost / 100)).toFixed(2) + ')';
				break;
			case 'iq':
				return 'Upgrade ' + this.name + ' to ' + newname + ' (' + upgradeCost + ' IQ points)';
				break;
			default:
				alert("ERROR: product unit must be 'money' or 'iq'");
				return -1;
				break;
		}
	};
	
	this.increaseCost = function() {
		this.cost = Math.ceil(this.cost * 1.1);
	};
	
	//affordability checks for button enablement/disablement
	this.canAffordPurchase = function() {
		switch(this.unit) {
			case 'money':
				return money.numMoney >= this.cost;
				break;
			case 'iq':
				return iq.numIq >= this.cost;
				break;
			default:
				alert("ERROR: product unit must be 'money' or 'iq'");
				return -1;
				break;
		}
	};
	
	this.canAffordUpgrade = function() {
		switch(this.unit) {
			case 'money':
				return money.numMoney >= this.upgradeCost;
				break;
			case 'iq':
				return iq.numIq >= this.upgradeCost;
				break;
			default:
				alert("ERROR: product unit must be 'money' or 'iq'");
				return -1;
				break;
		}
	};
}

//Click product - special class used exclusively by GPA column's click button
function ClickProduct(cost, unit, increment, name, buttontext, flavor) {
	this.cost = cost;
	this.unit = unit;
	this.increment = increment;
	this.name = name;
	this.buttontext = buttontext;
	this.flavor = flavor;
	this.revealed = false;
	
	this.getUpgradeText = function() {
		switch(this.unit) {
			case 'money':
				return '$' + (this.cost / 100).toFixed(2) + ' - Buy ' + this.name + ' (' + this.flavor + ')';
				break;
			case 'iq':
				return this.cost + ' IQ points - Do ' + this.name + ' (' + this.flavor + ')';
				break;
			default:
				alert("ERROR: clickproduct unit must be 'money' or 'iq'");
				return -1;
				break;
		}
	};
	
	this.canAffordPurchase = function() {
		switch(this.unit) {
			case 'money':
				return money.numMoney >= this.cost;
				break;
			case 'iq':
				return iq.numIq >= this.cost;
				break;
			default:
				alert("ERROR: clickproduct unit must be 'money' or 'iq'");
				return -1;
				break;
		}
	};
}