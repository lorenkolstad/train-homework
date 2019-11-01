console.log("test");

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

  trainData.ref().push({
    trainName: inputTrainName,
    destination: inputDestination,
    firstTrain: inputFirstTrainTime,
    frequency: inputFrequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP,
  });

  console.log(inputTrainName);
  
});

