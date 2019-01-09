var mycookie = {
	setCookie : function(name,value,days) {
		var expiration = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expiration = '; expires=' + date.toGMTString();
		}
		document.cookie = name + '=' + value + expiration;
	},
	deleteCookie : function(name) {
		this.setCookie(name,'',-1);
	},
	readCookies : function() {
		cookies = document.cookie.split('; ');
		return cookies;
	}
};
