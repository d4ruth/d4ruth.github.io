var saveManagement = {
	
	save : function() {
		var data = {
			gpanum : gpa.numGPA,
			gpaback : gpa.GPAbacklog,
			gpamill : gpa.GPApermilli,
			gpainc : gpa.numIncrementers,
			gpacl : gpa.clickLevel,
			gpapl : gpa.productLevel,
			gpacpc : gpa.currentProduct.cost,
			gpacpl : gpa.clickProductLevel,
			gpaf1 : gpa.gotFirstProduct,
			gpaf2 : gpa.gotStats,
			gpaf3 : gpa.gotFirstClickProduct,
			gpaf4 : gpa.gotFirstUpgrade,
			gpab1 : htmlManagement.getInnerHTML("gpaclick"),
			gpab2 : htmlManagement.getInnerHTML("gpaproduct"),
			gpab3 : htmlManagement.getInnerHTML("gpaupgrade"),
			gpab4 : htmlManagement.getInnerHTML("clickproduct"),
			
			moneynum : money.numMoney,
			moneyback : money.moneyBacklog,
			moneymill : money.moneyPerMilli,
			moneyinc : money.numIncrementers,
			moneypl : money.productLevel,
			moneycpc : money.currentProduct.cost,
			moneyql : money.questLevel,
			moneyf1 : money.gotFirstProduct,
			moneyf2 : money.gotStats,
			moneyf3 : money.gotFirstUpgrade,
			moneyf4 : money.gotSecondQuest,
			moneyb1 : htmlManagement.getInnerHTML("moneyproduct"),
			moneyb2 : htmlManagement.getInnerHTML("moneyupgrade"),
			
			iqnum : iq.numIq,
			iqback : iq.iqBacklog,
			iqmill : iq.iqPerMilli,
			iqinc : iq.numIncrementers,
			iqpl : iq.productLevel,
			iqcpc : iq.currentProduct.cost,
			iqql : iq.questLevel,
			iqf1 : iq.gotFirstProduct,
			iqf2 : iq.gotStats,
			iqf3 : iq.gotFirstUpgrade,
			iqf4 : iq.gotSecondQuest,
			iqb1 : htmlManagement.getInnerHTML("iqproduct"),
			iqb2 : htmlManagement.getInnerHTML("iqupgrade"),
			
			messages : message.messages
		}
		
		var json = JSON.stringify(data);
		mycookie.setCookie('savedata',window.btoa(json),365);
	},
	
	
	load : function() {
		cookies = mycookie.readCookies();
		savedata = cookies[0].substring(9);
		
		if (savedata != '') {
			var data = JSON.parse(window.atob(cookies[0].substr(9)));
			gpa.numGPA = data.gpanum;
			gpa.GPAbacklog = data.gpaback;
			gpa.GPApermilli = data.gpamill;
			gpa.numIncrementers = data.gpainc;
			gpa.clickLevel = data.gpacl;
			gpa.productLevel = data.gpapl;
			gpa.clickProductLevel = data.gpacpl;
			
			money.numMoney = data.moneynum;
			money.moneyBacklog = data.moneyback;
			money.moneyPerMilli = data.moneymill;
			money.numIncrementers = data.moneyinc;
			money.productLevel = data.moneypl;
			money.questLevel = data.moneyql;
			
			iq.numIq = data.iqnum;
			iq.iqBacklog = data.iqback;
			iq.iqPerMilli = data.iqmill;
			iq.productLevel = data.iqpl;
			iq.questLevel = data.iqql;
			
			for (var i = 0; i < data.gpapl; i++) {
				gpaProductStack.pop();
			}
			gpaProductStack[gpaProductStack.length-1].cost = data.gpacpc;
			for (var j = 0; j < data.gpacpl; j++) {
				gpaClickStack.pop();
			}
			for (var k = 0; k < data.moneypl; k++) {
				moneyProductStack.pop();
			}
			moneyProductStack[moneyProductStack.length-1].cost = data.moneycpc;
			for (var k2 = 0; k2 < data.moneyql; k2++) {
				moneyQuestStack.pop();
			}
			for (var l = 0; l < data.iqpl; l++) {
				iqProductStack.pop();
			}
			iqProductStack[iqProductStack.length-1].cost = data.iqcpc;
			for (var l2 = 0; l2 < data.iqql; l2++) {
				iqQuestStack.pop();
			}
			
			if (data.gpaf1) {gpa.gotFirstProductFunc();}
			if (data.gpaf2) {gpa.gotStatsFunc();}
			if (data.gpaf3) {gpa.gotFirstClickProductFunc();}
			if (data.gpaf4) {gpa.gotFirstUpgradeFunc();}
			
			if (data.moneyf1) {money.gotFirstProductFunc();}
			if (data.moneyf2) {money.gotStatsFunc();}
			if (data.moneyf3) {money.gotFirstUpgradeFunc();}
			if (data.moneyf4) {money.gotSecondQuestFunc();}
			
			if (data.iqf1) {iq.gotFirstProductFunc();}
			if (data.iqf2) {iq.gotStatsFunc();}
			if (data.iqf3) {iq.gotFirstUpgradeFunc();}
			if (data.iqf4) {iq.gotSecondQuestFunc();}
			
			
			htmlManagement.setInnerHTML("gpaclick", data.gpab1);
			htmlManagement.setInnerHTML("gpaproduct", data.gpab2);
			htmlManagement.setInnerHTML("gpaupgrade", data.gpab3);
			htmlManagement.setInnerHTML("clickproduct", data.gpab4);
			
			htmlManagement.setInnerHTML("moneyproduct", data.moneyb1);
			htmlManagement.setInnerHTML("moneyupgrade", data.moneyb2);
			
			htmlManagement.setInnerHTML("iqproduct", data.iqb1);
			htmlManagement.setInnerHTML("iqupgrade", data.iqb2);
			
			
			message.messages = data.messages;
		}
	},
	
	restart : function() {
		mycookie.deleteCookie('savedata');
		location.reload();
	}
};