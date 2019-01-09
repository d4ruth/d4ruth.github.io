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
	},
	setInnerHTML : function(id, value) {
		document.getElementById(id).innerHTML = value;
	},
	deleteHTML : function(id) {
		var e = document.getElementById(id);
		e.parentNode.removeChild(e);
	},
	setAttribute : function(id, attribute, value) {
		var e = document.getElementById(id);
		e.setAttribute(attribute, value);
	},
	appendText : function(id, value) {
		var e = document.getElementById(id);
		etext = e.innerHTML;
		e.innerHTML = etext + value;
	},
	getInnerHTML : function(id) {
		return document.getElementById(id).innerHTML;
	}
};