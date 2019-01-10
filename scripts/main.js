var main = {
	onload : function() {
		saveManagement.load();
		gpa.onload();
		money.onload();
		iq.onload();
		message.onload();
		window.setInterval(this.update.bind(this), 1);
		window.setInterval(saveManagement.save.bind(this), 1000);
	},
	update : function() {
		gpa.update();
		money.update();
		iq.update();
		message.getMessages();
	}
};

window.onload = main.onload.bind(main);
