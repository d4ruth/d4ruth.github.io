var main = {
	won : false,
	badwon : false,
	
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
		if (this.won || gpa.numGPA < 3.3) {
			gpa.update();
			money.update();
			iq.update();
			message.getMessages();
		}
		else if (!this.badwon) {
			this.winMessage();
		}
		else {
			saveManagement.restart();
		}
	},
	winMessage : function() {
		if (gpa.productLevel >= 6) {
			alert(hackwin);
			this.badwon = true;
		}
		else {
			alert(realwin);
			this.won = true;
		}
	}
};

window.onload = main.onload.bind(main);
