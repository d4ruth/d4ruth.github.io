var mycookie = {
	//basic operations
	setCookie : function(name,value,days) {
		var expiration = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expiration = '; expires=' + date.toGMTString();
		}
		document.cookie = name + '=' + value + expiration + ' ;path=/';
	},
	deleteCookie : function(name) {
		var deleteDate = new Date();
		deleteDate.setTime(date.getTime() - 100000);
		document.cookie = name + '=' + '; expires=' + deleteDate;
	},
	readCookies : function() {
		this.setCookie('hello','goodbye',10);
		this.setCookie('foo','bar',10);
	},
};