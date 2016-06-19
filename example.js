// Steps to complete:
/*
1. Create Firebase link
2. Create button for adding new employees - then update the html + update the database
3. Create a way to retrieve employees from the employee database.
4. Create a way to calculate the months worked. Using difference between start and current time. Then use moment.js formatting to set difference in months.
5. Calculate Total billed
*/
// 1. Link to Firebase

$( document ).ready(function() {
var trainData = new Firebase("https://train-scheduler4.firebaseio.com/");

var time = 0;
// 2. Button for adding Employees
$("#addEmployeeBtn").on("click", function(){

	// Grabs user input
	var name = $("#nameInput").val().trim();
	var dest = $("#destInput").val().trim();
	var time = moment($("#startInput").val().trim(), "HH:mm").format("X");
	var frequency = $("#frequencyInput").val().trim();

	// Creates local "temporary" object for holding employee data
	var newUser = {
		name:  name,
		dest: dest,
		time: time,
		frequency: frequency
	}


var firstTimeConverted = moment(time,"hh:mm").subtract(1, "years");
	   		console.log(firstTimeConverted);
	   		// Current Time
	   		var currentTime = moment();
	   		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
	   		// Difference between the times
	   		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	   		console.log("DIFFERENCE IN TIME: " + diffTime);
	   		// Time apart (remainder)
	   		var tRemainder = diffTime % tFrequency;
	   		console.log(tRemainder);
	   		// Minute Until Train
	   		tMinutesTillTrain = frequency - tRemainder;
	   		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
	   		// Next Train
	   		nextTrain = moment().add(tMinutesTillTrain, "minutes")
				console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))

	

	// Uploads employee data to the database
	trainData.push(newUser);

	// Logs everything to console
	console.log(newUser.name);
	console.log(newUser.dest);
	console.log(newUser.time);
	console.log(newUser.frequency)

	// Alert
	alert("Record successfully added");

	// Clears all of the text-boxes
	$("#nameInput").val("");
	$("#destInput").val("");
	$("#startInput").val("");
	$("#frequencyInput").val("");

	// Prevents moving to new page
	return false;
});


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var empName = childSnapshot.val().name;
	var empDest = childSnapshot.val().dest;
	var empStart = childSnapshot.val().time;
	var empFreq = childSnapshot.val().frequency;
	var tMinutesTillTrain = childSnapshot.val().tMinutesTillTrain;
	var nextTrain = childSnapshot.val().nextTrain;

	// Employee Info
	console.log(empName);
	console.log(empDest);
	console.log(empStart);
	console.log(empFreq);

	

	// Add each train's data into the table
	$("#employeeTable > tbody").append("<tr><td>" + empName + "</td><td>" + empDest + "</td><td>" + empFreq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>" + "</td></tr>");

var tableRow = $("<tr>");
	var tableData1 = $("<td>");
	tableData1.html(trainName);
	var tableData2 = $("<td>");
	tableData2.html(Destination);
	var tableData3 = $("<td>");
	tableData3.html(Frequency);
	var tableData4 = $("<td>");
	tableData4.html(tMinutesTillTrain);
	var tableData5 = $("<td>");
	tableData5.html(nextTrain);
	tableRow.append(tableData1);
	tableRow.append(tableData2);
	tableRow.append(tableData3);
	tableRow.append(tableData4);
	tableRow.append(tableData5);
	$("#employeeTable > tbody").append(tableRow);

});


});
// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case

