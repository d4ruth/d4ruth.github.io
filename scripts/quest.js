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
var firstMoneyQuest = new Quest(-99999990, 'gpa', 50, firstMessage);
var secondQuest = new Quest(-99999950, 'gpa', 100, secondMessage);
var thirdQuest = new Quest(-99999850, 'gpa', 200, thirdMessage);
var fourthQuest = new Quest(-99999700, 'gpa', 500, fourthMessage);
var fifthQuest = new Quest(1000, 'money', 3, fifthMessage);
var sixthQuest = new Quest(-99998500, 'gpa', 0, sixthMessage);

var moneyQuestStack = [sixthQuest, fifthQuest, fourthQuest, thirdQuest, secondQuest, firstMoneyQuest];

//IQ quests
var firstIqQuest = new Quest(-99998500, 'gpa', 100, sixthMessage);

var iqQuestStack = [firstIqQuest];
