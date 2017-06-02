var app = angular.module('myApp',[]);

app.controller('viewCtrl', function ($scope) {
	console.log("WOOT");
	$scope.cases = [];
	populateInventoryPage($scope.cases);
	
})

var db = new PouchDB('kittens');
db.info().then(function (info) {
    console.log(info);
});
var remoteDB = new PouchDB('http://138.68.178.97:5984/kittens');
db.sync(remoteDB, {
    live: true,
    retry: true
}).on('change', function (change) {
    console.log("yo, something changed!");
}).on('paused', function (info) {
    console.log("replication was paused, usually because of a lost connection");
}).on('active', function (info) {
    console.log("replication was resumed");
}).on('error', function (err) {
    console.log("totally unhandled error (shouldn't happen)");
});

function populateInventoryPage(finalArr){
	db.allDocs({
  		include_docs: true,
  		startkey: 'case',
    	endkey: 'case\uffff'
	}).then(function (result) {
		alert("Retrieving Cases");
		cases = result['rows'];
		cases.forEach(function(c){
			console.log("ASADASAD"+c.doc);
			finalArr.push(c.doc);
		});
		$("#btnbtn").click();
	}).catch(function (err) {
		console.log(err);
	});
}