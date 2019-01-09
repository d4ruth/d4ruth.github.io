//Money quests
var firstMoneyQuest = new Quest(-99999990, 'gpa', 50, firstMessage);
var secondQuest = new Quest(-99999950, 'gpa', 100, secondMessage);
var thirdQuest = new Quest(-99999850, 'gpa', 200, thirdMessage);
var fourthQuest = new Quest(-99999700, 'gpa', 500, fourthMessage);
var fifthQuest = new Quest(1000, 'money', 3, fifthMessage);
var sixthQuest = new Quest(-99995000, 'gpa', 0, 'null');

var moneyQuestStack = [sixthQuest, fifthQuest, fourthQuest, thirdQuest, secondQuest, firstMoneyQuest];

//IQ quests
var firstIqQuest = new Quest(-99999000, 'gpa', 100, sixthMessage);
var secondIqQuest = new Quest(3000, 'money', 30, brainpillmessage);
var thirdIqQuest = new Quest(10000, 'money', 50, 'null');

var iqQuestStack = [thirdIqQuest, secondIqQuest, firstIqQuest];