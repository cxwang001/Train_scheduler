 // Initialize Firebase
var config = {
    apiKey: "AIzaSyCfSpHzMZN7i5Iznk8TS5vN6OJIhy0fUzI",
    authDomain: "train-f4891.firebaseapp.com",
    databaseURL: "https://train-f4891.firebaseio.com",
    projectId: "train-f4891",
    storageBucket: "",
    messagingSenderId: "1026911336953"
  };
firebase.initializeApp(config);

var database = firebase.database();

// initial values
var name = "";
var destin = "";
var time = "";
var frequency = 0;

// Capture Button Click
$("#train-add").on("click", function(event){
	event.preventDefault();

	var name = $("#name-input").val().trim();
  	var destin = $("#des-input").val().trim();
  	var time = $("#first-input").val().trim();
  	var frequency = $("#freqency-input").val().trim();

// Code for handling the push
	database.ref().push({
        name: name,
        destin: destin,
        time: time,
        frequency: frequency,
      });


});
// / Firebase watcher 
   
      // storing the snapshot.val() in a variable for convenience

database.ref().on("child_added", function(snapshot) {


      var sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.name);
      console.log(sv.destin);
      console.log(sv.time);
      console.log(sv.frequency);

      name = sv.name;
      destin = sv.destin;
      time = sv.time;
      frequency = sv.frequency;


	// First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(time, "hh:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    // console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var nTrain = moment(nextTrain).format("HH:mm");

// add everything to HTML page.
    var newRow = $("<tr>");
    newRow.append($("<td>").html(name));
    newRow.append($("<td>").html(destin));
    newRow.append($("<td>").html(frequency));
    newRow.append($("<td>").html(nTrain));
    newRow.append($("<td>").html(tMinutesTillTrain));

    $("#train-info").append(newRow);

});


