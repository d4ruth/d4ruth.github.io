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
				return this.cost + ' IQ points - Buy ' + this.name + ' (' + this.flavor + ')';
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
				return 'Upgrade ' + this.name + ' to ' + newname + ' ($' + ((upgradeCost / 100)).toFixed(2) + ' per ' + this.name + ')';
				break;
			case 'iq':
				return 'Upgrade ' + this.name + ' to ' + newname + ' (' + upgradeCost + ' IQ points per ' + this.name + ')';
				break;
			default:
				alert("ERROR: product unit must be 'money' or 'iq'");
				return -1;
				break;
		}
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
	
	this.canAffordUpgrade = function(numincrementers) {
		switch(this.unit) {
			case 'money':
				return money.numMoney >= this.upgradeCost * numincrementers;
				break;
			case 'iq':
				return iq.numIq >= this.upgradeCost * numincrementers;
				break;
			default:
				alert("ERROR: product unit must be 'money' or 'iq'");
				return -1;
				break;
		}
	};
}

//GPA products
var clock = new Product(500, 0, 'money', 0.002, 'alarm clock', 'Alarm clocks', 'shortens your sleep schedule so you get to classes on time, improving GPA');
var planner = new Product(1000, 650, 'money', 0.005, 'planner', 'Planners', 'allows you to keep track of deadlines, improving GPA');
var filler5 = new Product(50, 0, 'iq', 0.005, 'filler5', 'filler5', 'filler5');

var gpaProductStack = [planner, clock];

//money products
var filler = new Product(20, 10, 'iq', 0.005, 'filler thing for testing', 'filler thing for testing', 'filler thing for testing');
var filler2 = new Product(30, 10, 'iq', 0.005, 'filler thing2 for testing', 'filler thing2 for testing', 'filler thing2 for testing');

var moneyProductStack = [filler2, filler];

//iq products
var filler3 = new Product(30, 10, 'iq', 0.005, 'filler thing3 for testing', 'filler thing3 for testing', 'filler thing3 for testing');
var filler4 = new Product(30, 10, 'iq', 0.005, 'filler thing4 for testing', 'filler thing4 for testing', 'filler thing4 for testing');

var iqProductStack = [filler4, filler3];

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
				return this.cost + ' IQ points - Buy ' + this.name + ' (' + this.flavor + ')';
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

//Click upgrades
var nicepen = new ClickProduct(2000, 'money', 2, 'nice blue pen', 'Do homework (in nice blue ink)', 'your homework is now done in TA-pleasing blue ink, netting you more GPA per assignment');

var clicker = new ClickProduct(6000, 'money', 8, 'clickers', 'Take clicker quiz', 'doing clicker quizzes is sure to raise your GPA!');

var gpaClickStack = [clicker, nicepen];