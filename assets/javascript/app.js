$( document ).ready(function() {

	//Link to Firebase
		var dataRef = new Firebase("https://train-schedule-final.firebaseio.com/");

	//Defining variables
			var name = "";
			var dest = "";
			var time = 0;
			var frequency = 0;
			var tMinutesTillTrain = 0;


 $("#submitBtn").on("click", function(event){
 		event.preventDefault();
       // Get inputs
       name = $('#name').val().trim();
       dest = $('#dest').val().trim();
       time = $('#time').val().trim();
       frequency = $('#frequency').val().trim();
       
				
				var firstTime = moment(time,"hh:mm"); // getting the firsttime as is
				var diffTime = moment().diff(moment(firstTime), "minutes");
				if (diffTime < 0) diffTime += 1439; //if negative then assume that first time was yesterday and adjust by one day (1440 minutes) - 1 minute
				
				console.log("diffTime: "+diffTime + " First Time: "+firstTime);
	   		var currentTime = moment();
	   		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


	   		// Time apart (remainder)
	   		var tRemainder = diffTime % frequency;
	   		console.log("tRemainder: "+tRemainder);
	   		// Minute Until Train
	   		tMinutesTillTrain = frequency - tRemainder;
	   		console.log(tMinutesTillTrain);
	   		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
	   		// Next Train
	   		var nextTrain1 = moment().add(tMinutesTillTrain, "minutes");
				console.log("ARRIVAL TIME: " + moment(nextTrain1).format("hh:mm"));
			
       // Change what is saved in firebase
       dataRef.push({
           name: name,
           dest: dest,
           time: time,
           frequency: frequency,
           tMinutesTillTrain: tMinutesTillTrain

       });
       // Alert
			 alert("Information successfully added");
				// Clears all of the text-boxes
					$("#name").val("");
					$("#dest").val("");
					$("#time").val("");
					$("#frequency").val("");
				       return false;
				   });


dataRef.on("child_added", function(childSnapshot, prevChildkey) {

			console.log(childSnapshot.val().frequency);
			console.log(childSnapshot.val().tMinutesTillTrain);
			console.log(childSnapshot.val().nextTrain);
				
				// Store everything into a variable.
			var trainName = childSnapshot.val().name;
			var Destination= childSnapshot.val().dest;
			var trainTime = childSnapshot.val().time;
			var Frequency = childSnapshot.val().frequency;
			var tMinutesTillTrain = childSnapshot.val().tMinutesTillTrain;
			var nextTrain = moment().add(tMinutesTillTrain, "minutes");

				// Add each train's data into the table
				$("#trainTable").append("<tr><td>" + trainName + "</td><td>" + Destination + "</td><td>" + Frequency+
					"</td><td>"  + moment(nextTrain).format("hh:mm") + "</td><td>"  +tMinutesTillTrain+ "</td><td>"  + "</td></tr>");

				var tableRow = $("<tr>");
				var tableData1 = $("<td>");
				tableData1.html(trainName);
				var tableData2 = $("<td>");
				tableData2.html(Destination);
				var tableData3 = $("<td>");
				tableData3.html(Frequency);
				var tableData4 = $("<td>");
				tableData4.html(nextTrain);
				var tableData5 = $("<td>");
				tableData5.html(tMinutesTillTrain);
				tableRow.append(tableData1);
				tableRow.append(tableData2);
				tableRow.append(tableData3);
				tableRow.append(tableData4);
				tableRow.append(tableData5);
				$("#employeeTable > tbody").append(tableRow);
				});
				// Handle the errors
				}, function(errorObject) {
						console.log("Errors handled: " + errorObject.code);
				});