//Money quests
var firstMoneyQuest = new Quest(-99999990, 'gpa', 50, firstMessage);
var secondQuest = new Quest(-99999950, 'gpa', 100, secondMessage);
var thirdQuest = new Quest(-99999850, 'gpa', 200, thirdMessage);
var fourthQuest = new Quest(-99999700, 'gpa', 500, fourthMessage);
var fifthQuest = new Quest(1000, 'money', 3, fifthMessage);
var scholarship1Quest = new Quest(-99995000, 'gpa', 5000, scholarship1message);
var unclerickQuest = new Quest(20000, 'money', -15000, rickmessage);
var dadMoneyQuest = new Quest(1500, 'iq', 100, dadmoneymessage);
var esportsQuest = new Quest(8000, 'iq', 1000, esportsmessage);
var momQuest = new Quest(-50000000, 'gpa', 1500, mommessage);


var moneyQuestStack = [momQuest, esportsQuest, dadMoneyQuest, unclerickQuest, scholarship1Quest, fifthQuest, fourthQuest, thirdQuest, secondQuest, firstMoneyQuest];

//IQ quests
var firstIqQuest = new Quest(-99999000, 'gpa', 100, sixthMessage);
var secondIqQuest = new Quest(3000, 'money', 30, brainpillmessage);
var thirdIqQuest = new Quest(10000, 'money', 50, mensamessage);
var dadIqQuest = new Quest(-99500000, 'gpa', 1000, dadiqmessage);
var roommateIqQuest = new Quest(50000, 'iq', 2000, roommateiqmessage);
var unclerick2 = new Quest(1000000, 'iq', -500000, rick2message);

var iqQuestStack = [unclerick2, roommateIqQuest, dadIqQuest, thirdIqQuest, secondIqQuest, firstIqQuest];