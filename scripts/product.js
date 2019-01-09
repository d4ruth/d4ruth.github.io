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
				return 'Upgrade ' + this.name + ' to do ' + newname + ' (' + upgradeCost + ' IQ points)';
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

//GPA products
var watch = new Product(50, 0, 'money', 0.001, 'wrist watch', 'Wrist watches', 'lets you get to classes with mandatory attendance on time, improving GPA');
var clock = new Product(230, 500, 'money', 0.005, 'alarm clock', 'Alarm clocks', 'shortens your sleep schedule so you get to your 8ams, improving GPA');
var planner = new Product(1000, 3000, 'money', 0.025, 'planner', 'Planners', 'allows you to keep track of deadlines, improving GPA');

var gpaProductStack = [planner, clock, watch];

//money products
var piggybank = new Product(100, 0, 'money', 0.010, 'piggy bank', 'Piggy banks', 'lets you save up the spare change you find on the ground while walking from class to class');
var shovel = new Product(250, 500, 'money', 0.030, 'shovel', 'Snow shovels', 'allows you to do snow-shoveling work on the side, making a little money in the process. Each shovel allows you to shovel more driveways at once');
var rmhw = new Product(10, 50, 'iq', 0.040, 'your roommate\'s homework', 'Roommates\' homework being done', 'do one of your roommate\'s homework for quick cash');
var gardentools = new Product(3000, 2400, 'money', 0.040, 'gardening tools', 'Sets of gardening tools', 'lets you help hippies grow their hippie food');

var moneyProductStack = [rmhw, shovel, piggybank];

//iq products
var filler3 = new Product(300, 10, 'iq', 0.005, 'filler thing3 for testing', 'filler thing3 for testing', 'filler thing3 for testing');
var filler4 = new Product(300, 100000, 'iq', 0.005, 'filler thing4 for testing', 'filler thing4 for testing', 'filler thing4 for testing');
var brainpill = new Product(1500, 0, 'money', 0.005, 'bottle of FocusPills', 'Bottles of FocusPills consumed', 'boosts IQ');

var iqProductStack = [filler4, filler3, brainpill];

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
var nicepen = new ClickProduct(1000, 'money', 5, 'nice blue pen', 'Do homework (in nice blue ink)', 'your homework is now done in TA-pleasing blue ink, netting you more GPA per assignment');

var clicker = new ClickProduct(6000, 'money', 40, 'clickers', 'Take clicker quiz', 'doing clicker quizzes is sure to raise your GPA!');

var gpaClickStack = [clicker, nicepen];