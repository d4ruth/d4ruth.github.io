var main = {
	onload : function() {
		gpa.onload();
		money.onload();
		iq.onload();
		message.onload();
		alert(document.cookie);
		alert('is github pages even updating jesus fucking christ');
		window.setInterval(this.update.bind(this), 1);
	},
	update : function() {
		gpa.update();
		money.update();
		iq.update();
		message.getMessages();
	}
};

window.onload = main.onload.bind(main);
