//Quest - x amount of resource acquired nets you y amount of the parent resource, plus a message

function Quest(cost, unit, gain, message) {
	this.cost = cost;
	this.unit = unit;
	this.gain = gain;
	this.message = message;
	
	this.getQuestText = function() {
		switch(this.unit) {
			case 'gpa':
				var questtext = "GPA for next reward: " + ((this.cost / 100).toFixed(2));
				break;
			case 'money':
				var questtext = "Balance for next reward: $" + ((this.cost / 100).toFixed(2));
				break;
			case 'iq':
				var questtext = "IQ points for next reward: " + this.cost;
				break;
			default:
				alert("ERROR: quest unit must be 'gpa', 'money', or 'iq'");
				var questtext = -1;
				break;
		}
		return questtext;
	};
	
	this.canGet = function() {
		switch(this.unit) {
			case 'gpa':
				return gpa.numGPA >= this.cost;
				break;
			case 'money':
				return money.numMoney >= this.cost;
				break;
			case 'iq':
				return iq.numIq >= this.cost;
				break;
			default:
				alert("ERROR: quest unit must be 'gpa', 'money', or 'iq'");
				return -1;
				break;
		}
	};
}

//Money quests
var firstMoneyQuest = new Quest(-99999990, 'gpa', 500, firstMessage);
var secondQuest = new Quest(-99999950, 'gpa', 1000, secondMessage);
var thirdQuest = new Quest(-99999750, 'gpa', 2000, thirdMessage);

var moneyQuestStack = [thirdQuest, secondQuest, firstMoneyQuest];

//IQ quests
var firstIqQuest = new Quest(-90000000, 'gpa', 100, "hi");

var iqQuestStack = [firstIqQuest];
