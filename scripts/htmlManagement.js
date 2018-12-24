var htmlManagement = {
	setVisible : function(id) {
		document.getElementById(id).style.visibility = "visible";
	},
	setInvisible : function(id) {
		document.getElementById(id).style.visibility = "hidden";
	},
	enable : function(id) {
		document.getElementById(id).disabled = "";
	},
	disable : function(id) {
		document.getElementById(id).disabled = "disabled";
	}
};