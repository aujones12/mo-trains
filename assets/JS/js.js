
var database = firebase.database();
var config = {
    apiKey: "AIzaSyC_IvQK7PZRC34Eqo3wQ24JiuI_xfqzb6U",
    authDomain: "train-99.firebaseapp.com",
    databaseURL: "https://train-99.firebaseio.com",
    projectId: "train-99",
    storageBucket: "train-99.appspot.com",
    messagingSenderId: "579892060977"
  };

firebase.initializeApp(config);
var trains = firebase.database();

$(document).ready(function() {
	updateTime();
	setInterval(updateTime, 1000);
});

$("#add-train-btn").on("click", function(event) {
	event.preventDefault();

	var trainName = $("#train-name-input").val().trim();
	var trainDestination = $("#destination-input").val().trim();
	var trainTime = $("#train-time-input").val().trim();
	var trainFrequency = parseInt($("#frequency-input").val().trim());

	var newTrain = {
		name: trainName,
		destination: trainDestination,
		time: trainTime,
		frequency: trainFrequency
	};

	database.ref().push(newTrain);

	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.time);
	console.log(newTrain.frequency);

	alert("Train successfully added!");

	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#train-time-input").val("");
	$("#frequency-input").val("");

	return false;
});

database.ref().on("child_added", function(childSnapshot) {
	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var trainTime = childSnapshot.val().time;
	var trainFrequency = childSnapshot.val().frequency;

	console.log(trainName);
	console.log(trainDestination);
	console.log(trainTime);
	console.log(trainFrequency);

	var timeConverted = moment(trainTime, "HH:mm");
	console.log("Time converted: " + timeConverted);

	var timeDiff = moment().diff(moment(timeConverted), "minutes");
	console.log("Difference in time: " + timeDiff);

	var remainder = timeDiff % trainFrequency;
	console.log("Remainder: " + remainder);
	var minutesAway = trainFrequency - remainder;
	console.log("Minutes away: " + minutesAway);

	var nextTrain = moment().add(minutesAway, "minutes");

	var nextArrival = moment(nextTrain).format("HH:mm");
	console.log("Next arrival: " + nextArrival);

	$("#new-train").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + "Every " + trainFrequency + " min" + "</td><td>" + nextArrival + "</td><td>" + minutesAway + " min" + "</td></tr>");
}, function(errorObject) {
	console.log("Errors handled: " + errorObject.code);
});

