var htmlManagement = {
	makeVisible : function(id) {
		document.getElementById(id).style.visibility = "visible";
	},
	makeInvisible : function(id) {
		document.getElementById(id).style.visibility = "hidden";
	},
	enable : function(id) {
		document.getElementById(id).disabled = "";
	},
	disable : function(id) {
		document.getElementById(id).disabled = "disabled";
	}
};