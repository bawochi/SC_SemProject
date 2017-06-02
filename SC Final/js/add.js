getDate = function () {
	var today = new Date();
	var mm = today.getMonth() + 1;
	var dd = today.getDate();
	var yyyy = today.getFullYear();

	var date = dd + "/" + mm + "/" + yyyy

	return date
};
getTime = function(){
	return new Date().toLocaleTimeString('en-US', { hour12: false, 
	   hour: "numeric", 
	   minute: "numeric",
	   second: "numeric"});
}

var app = angular.module('myApp', []);
app.controller('PosController', function ($scope) {
	cases = [];
	
	var url = window.location.protocol + "://" + window.location.host + "/" + window.location.pathname;

	$scope.addNew = function (item) {
		
			case0 = {
				_id:"case-homicide-"+"1"+getDate()+getTime(),
				cid: Math.floor((Math.random() * 100) + 1),
				cname: $("#case-name").val(),
				assign: $("#assigned-to").val()
                cmore: $("#mytext").val()
			};
			writeToDB(case0);
			console.log("AAAA");
			
		alert("New Case Added");
		cases = [];
		
	};
	
	

});

