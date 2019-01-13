//GPA products
var watch = new Product(50, 0, 'money', 0.001, 'wrist watch', 'Wrist watches', 'lets you get to classes with mandatory attendance on time, improving GPA');
var clock = new Product(230, 500, 'money', 0.005, 'alarm clock', 'Alarm clocks', 'shortens your sleep schedule so you get to your 8ams, improving GPA');
var planner = new Product(1000, 3000, 'money', 0.025, 'planner', 'Planners', 'allows you to keep track of deadlines, improving GPA');
var extracurricular = new Product(500, 1500, 'iq', 0.100, 'extracurricular activity', 'Extracurricular activities enrolled in', 'always looks good when you\'re applying to the next level of college. Supercollege.');
var tutor = new Product(50000, 100000, 'money', 1.500, 'tutor', 'Tutors', 'they can charge such rates because they took the class themselves three years ago');
var classtry = new Product(2000, 10000, 'iq', 1.750, 'actual work for the class', 'Classes with effort being put in', 'maybe you should\'ve tried this earlier');


var gpaProductStack = [classtry, tutor, extracurricular, planner, clock, watch];

//money products
var piggybank = new Product(100, 0, 'money', 0.010, 'piggy bank', 'Piggy banks', 'lets you save up the spare change you find on the ground while walking from class to class');
var shovel = new Product(250, 500, 'money', 0.030, 'shovel', 'Snow shovels', 'allows you to do snow-shoveling work on the side, making a little money in the process. Each shovel allows you to shovel more driveways at once');
var rmhw = new Product(10, 50, 'iq', 0.040, 'your roommate\'s homework', 'Roommates\' homework being done', 'do one of your roommate\'s homework for quick cash');
var esports = new Product(1200, 8000, 'iq', 1.800, 'an Esports director position at CU', 'Esports director positions at CU', 'use your ungodly intelligence to take on an Esports director position and get paid big bucks');
var ututor = new Product(300, 1000, 'iq', 0.400, 'some tutoring for one of your roommates', 'Roommates being tutored', 'they say teaching material helps you learn it better; they forget it can also earn you cash');

var moneyProductStack = [esports, ututor, rmhw, shovel, piggybank];

//iq products
var brainpill = new Product(1500, 0, 'money', 0.005, 'bottle of FocusPills', 'Bottles of FocusPills consumed', 'boosts IQ');
var mensa = new Product(5500, 10000, 'money', 0.020, 'MENSA membership', 'MENSA memberships acquired', 'allows you to hang out with and absorb the knowledge of ever-greater quantities of 98th percentile geniuses, smartasses, wise men, and wise guys');

var iqProductStack = [mensa, brainpill];

//Click upgrades
var homework = new ClickProduct(0, 'money', 0, '', 'Do a homework assignment', '');
var nicepen = new ClickProduct(1000, 'money', 5, 'nice blue pen', 'Do homework (in nice blue ink)', 'your homework is now done in TA-pleasing blue ink, netting you more GPA per assignment');
var clicker = new ClickProduct(6000, 'money', 40, 'clickers', 'Take clicker quiz', 'doing clicker quizzes is sure to raise your GPA!');

var gpaClickStack = [clicker, nicepen, homework];