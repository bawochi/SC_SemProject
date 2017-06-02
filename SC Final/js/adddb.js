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
function writeToDB(entry){
	console.log("WOOT");
	console.log(localDB.put(entry));
}
