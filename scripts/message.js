var message = {
	messages : [],
	newMessage : true,
	
	onload : function() {
	},
	
	getMessages : function() {
		if (this.newMessage) {
			
			if (this.messages.length == 0) {
				document.getElementById("message").innerHTML = "You currently have no messages";
			}
			else if (this.messages.length == 1) {
				document.getElementById("message").innerHTML = "<button onclick='message.clearMessages();'>Clear inbox</button><br>" + this.messages[this.messages.length-1];
				
			}
			else {
				document.getElementById("message").innerHTML = "<button onclick='message.nextMessage();'>Next message</button><br>" + this.messages[this.messages.length-1];
			}
			this.newMessage = false;
		}
	},
	
	clearMessages : function() {
		document.getElementById("message").innerHTML = "";
		this.messages.pop();
		this.newMessage = true;
	},
	
	addMessage : function(messages) {
		this.messages = this.messages.concat(messages);
		this.newMessage = true;
	},
	nextMessage : function() {
		this.messages.pop();
		this.newMessage = true;
	}
};