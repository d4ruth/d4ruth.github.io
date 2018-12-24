var main = {
	
	//Functions
	onload : function() {
		gpa.onload();
		money.onload();
		message.onload();
		window.setInterval(this.update.bind(this), 1);
	},
	update : function() {
		gpa.update();
		money.update();
		message.getMessages();
	}
};

window.onload = main.onload.bind(main);