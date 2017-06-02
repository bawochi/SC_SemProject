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

$(document).ready(function() {
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
    var add_button      = $(".add_field_button"); //Add button ID

    var x = 1;
    $("#add_button").click(function(e){
        e.preventDefault();
        if(x < max_fields){
            x++;
            $(wrapper).append('<div class="col-md-6"><div class="form-group label-floating"><label class="control-label">More details</label><input id="add'+x+'"name="mytext[]" type="text" class="form-control"></div></div>');
        }

        addToDB["moreDetails"+x]="";
    });

    function populateObject(){
        alert("populating");
        addToDB._id="case"+$("#case-id").val();
        addToDB.caseID = $("#case-id").val();
        addToDB.caseName = $("#case-name").val();
        addToDB.assignedTo = $("#assigned-to").val();

        for(var i =0; i<=x; i++){
            addToDB["moreDetails"+x]=$("#add"+x).val();
        }
    }
    // connect to pouch
    // create object for entry to database
    var addToDB = {
        "_id":"",
        "caseID":"",
        "caseName":"",
        "assignedTo":""
    };

    // now add fields for "more fields"
    for (var i =1; i<=x; i++){
        addToDB["moreDetails"+x] = "";
    }

    // add to the data object for entry
    $("#add_details").click(function(e){
        e.preventDefault();
        alert("ADDING");
        populateObject();
        console.log(addToDB);
        db.put(addToDB);
        console.log("ADDED TO DB");
    });


});
