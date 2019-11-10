
$(document).ready(function(){

  var firebaseConfig = {
      apiKey: "AIzaSyA4ykY84Zp4mOmwKtnJvVMlYp-P7BYNGn4",
      authDomain: "train-homework-b0351.firebaseapp.com",
      databaseURL: "https://train-homework-b0351.firebaseio.com",
      projectId: "train-homework-b0351",
      storageBucket: "train-homework-b0351.appspot.com",
      messagingSenderId: "319473541971",
      appId: "1:319473541971:web:9e3c33e210260a2a25f7a6"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var trainData = firebase.database();

      trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
      console.log(childSnapshot.val())
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTrain);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().dateAdded);

      var trainNameM = childSnapshot.val().trainName;
      var destinationM = childSnapshot.val().destination;
      var firstTrainM = childSnapshot.val().firstTrain;
      var frequencyM = childSnapshot.val().frequency;

      console.log(trainNameM);
      console.log(destinationM);
      console.log(firstTrainM);
      console.log(frequencyM);
      });

      $("#submitButton").on("click", function(event){
        event.preventDefault();
      
        console.log("on-click");
          var inputTrainName = "";
          var inputDestination = "";
          var inputFirstTrainTime = "";
          var inputFrequency = "";
      
        inputTrainName = $("#inputTrainName").val().trim();
        inputDestination = $("#inputDestination").val().trim();
        inputFirstTrainTime = $("#inputFirstTrainTime").val().trim();
        inputFrequency = $("#inputFrequency").val().trim();

        var firstTrainPretty = moment.unix(inputFirstTrainTime).format("HH:mm");
        
        var frequencyPretty = moment.unix(inputFrequency).format("mm");

        // var firstTimeConverted = moment(inputFirstTrainTime, "HH:mm").subtract(1, "years");
        // console.log(firstTimeConverted);

        var nextArrival = moment().diff(moment(firstTrainPretty + frequencyPretty), "HH:mm");
        console.log(nextArrival);

        var minutesAway = nextArrival % frequencyPretty;
        console.log(minutesAway);

        // var tMinutesTillTrain = firstTrainPretty - tRemainder;
        // console.log(tMinutesTillTrain);

        // var nextTrain = moment().add(nextArrival, "minutes");
        // console.log(moment(nextTrain).format("hh:mm"));

        var firstTrainTime = moment().diff(moment(firstTrainPretty, "X"), "hours", "minutes");
        console.log(firstTrainTime);

        var frequencyMinutes =  moment().diff(moment(frequencyPretty, "X"), "minutes"); 
        console.log(frequencyMinutes);

        var arrival = firstTrainPretty + frequencyPretty;
        console.log(arrival);

        var newRow = $("<tr>");
        $("tbody").append(newRow);
        newRow.append("<td>" + inputTrainName),
        newRow.append("<td>" + inputDestination),
        newRow.append("<td>" + frequencyPretty),
        newRow.append("<td>" + arrival),
        newRow.append("<td>" + minutesAway),
          // $(newRow).append("<td>" + ),
      
        $("#newTrains").append(newRow);
      
        trainData.ref().push({
          trainName: inputTrainName,
          destination: inputDestination,
          firstTrain: inputFirstTrainTime,
          frequency: inputFrequency,
          dateAdded: firebase.database.ServerValue.TIMESTAMP,
        });
      });
    });

   

