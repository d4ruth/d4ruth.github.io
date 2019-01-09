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

//Click upgrades
var homework = new ClickProduct(0, 'money', 0, '', 'Do a homework assignment', '');

var nicepen = new ClickProduct(1000, 'money', 5, 'nice blue pen', 'Do homework (in nice blue ink)', 'your homework is now done in TA-pleasing blue ink, netting you more GPA per assignment');

var clicker = new ClickProduct(6000, 'money', 40, 'clickers', 'Take clicker quiz', 'doing clicker quizzes is sure to raise your GPA!');

var gpaClickStack = [clicker, nicepen, homework];