 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyD7WuLBcve4dhoqWdKS1CiOhojOaPl7B10",
    authDomain: "icbtdata-fd2d9.firebaseapp.com",
    databaseURL: "https://icbtdata-fd2d9.firebaseio.com",
    projectId: "icbtdata-fd2d9",
    storageBucket: "icbtdata-fd2d9.appspot.com",
    messagingSenderId: "1030124264916"
  };
var selectedtimetable;

function selectit(type){

      $("#IT").html("<b>Selected Type: </b>"+type);
    selectedtimetable = type;
        //document.getElementById(type).style.backgroundColor = "Red";
       // document.getElementById("BM2").style.backgroundColor = "Red";
       
}




// Initialize your Firebase app
firebase.initializeApp(config);

var globalurl;
// Reference to your entire Firebase database
var myFirebase = firebase.database().ref();
// Reference to your entire Firebase Storage
var storageRef = firebase.storage().ref();

var imagesRef = storageRef.child('images');

// Get a reference to the recommendations object of your Firebase.
// Note: this doesn't exist yet. But when we write to our Firebase using
// this reference, it will create this object for us!
var recommendations = myFirebase.child("events");


function testfunction(){
	 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD7WuLBcve4dhoqWdKS1CiOhojOaPl7B10",
    authDomain: "icbtdata-fd2d9.firebaseapp.com",
    databaseURL: "https://icbtdata-fd2d9.firebaseio.com",
    projectId: "icbtdata-fd2d9",
    storageBucket: "icbtdata-fd2d9.appspot.com",
    messagingSenderId: "1030124264916"
  };

	 var t=document.querySelector('p');
	var text = "";
// Initialize your Firebase app
firebase.initializeApp(config);
	// Get a reference to the database service
var query = firebase.database().ref("events").orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
		console.log(key);
      // childData will be the actual contents of the child
      	var childData = childSnapshot.val();
		var eventitle = childData.eventtitle;
		var eventdatetime = childData.eventdatetime;
		var eventhost =childData.eventhost;
		var eventvenue = childData.eventvenue;
		var eventdescription = childData.eventdescription;
		

		 $('p').first().parent().append(
		
   "<p class="+"happy"+">Some quick example text to build on the card title and make up the bulk of the card's content.</p>"+

			 
			"<p>"+ eventitle +"</p>"
			);
           
		 
  });
	
});
	

	
}



var eventformupload = function () {
// Push our first recommendation to the end of the list and assign it a
// unique ID automatically.
	
	var eventtitle = $("#eventname").val();
	var eventdatetime = $("#eventdatetime").val();
	var eventhost = $("#eventhost").val();
	var eventvenue = $("#eventvenue").val();
	var eventdescription = $("#eventdescription").val();
	
recommendations.push({
    "eventtitle": eventtitle,
    "eventdatetime": eventdatetime,
	"eventhost" : eventhost,
	"eventvenue": eventvenue,
	"eventdescription" : eventdescription,
	"eventimgurl":globalurl
});
	
	window.alert("Upload Success");

	};


function previewFile(){

    if (selectedtimetable==undefined)
    {
        window.alert("You haven't provided an TimeTable")
        return;
    }
	
	window.alert(selectedtimetable);
	
 var t=document.querySelector('#url');
 t.innerHTML =selectedtimetable + ' Upload Status: Pending ';
    
 var file = document.querySelector('input[type=file]').files[0];
   

var metadata = {
contentType: 'image/jpeg'
};


var uploadTask = storageRef.child('timetable/' + selectedtimetable).put(file, metadata);

uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
function(snapshot) {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + selectedtimetable + progress + '% done');
                var t=document.querySelector('#url');
                t.innerHTML =selectedtimetable + ' + Upload Status: Uploading '+ Math.ceil(progress) +'%';
            
            
                var r = document.querySelector('#p2');
                r.MaterialProgress.setProgress(Math.ceil(progress));

	
    switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: 
            console.log('Upload is paused');
            break;
        case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
           
            break;
    }
    }, function(error) {
        console.log('error while uploading')
    }, function() {
	  t.innerHTML =selectedtimetable + ' Upload Status: Success ';
        var starsRef = storageRef.child('images/'+ file.name);
        starsRef.getDownloadURL().then(function(url) {
            document.querySelector('#preview').src=url;
            var t=document.querySelector('p')
            t.innerHTML ='Upload Status: Success ';
            globalurl = url;
           

        }).catch(function(error) {
            console.log('error while downloading file');
        });
    });
   
    }
$(window).load(function () {

  // Find the HTML element with the id recommendationForm, and when the submit
  // event is triggered on that element, call eventformupload.
  $("#timetableform").submit(timetableformupload);

});

