 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD7WuLBcve4dhoqWdKS1CiOhojOaPl7B10",
    authDomain: "icbtdata-fd2d9.firebaseapp.com",
    databaseURL: "https://icbtdata-fd2d9.firebaseio.com",
    projectId: "icbtdata-fd2d9",
    storageBucket: "icbtdata-fd2d9.appspot.com",
    messagingSenderId: "1030124264916"
  };

// Initialize your Firebase app
firebase.initializeApp(config);

var globalurl;
// Reference to your entire Firebase database
var myFirebase = firebase.database().ref();
// Reference to your entire Firebase Storage
var storageRef = firebase.storage().ref();

var imagesRef = storageRef.child('location');

// Get a reference to the recommendations object of your Firebase.
// Note: this doesn't exist yet. But when we write to our Firebase using
// this reference, it will create this object for us!
var recommendations = myFirebase.child("location");


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

	 var t=document.querySelector('p2');
	var text = "";
// Initialize your Firebase app
firebase.initializeApp(config);
	// Get a reference to the database service
var query = firebase.database().ref("location").orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
		console.log(key);
      // childData will be the actual contents of the child
      	var childData = childSnapshot.val();
		var placename = childData.placename;
		var address = childData.address;
		var contactno = childData.phoneno;
		var locationurl = childData.locationurl;
		 $('p2').first().parent().append(
				 
			"<p>"+ placename +"</p>"
			);
  });
	
});
}

function placeformupload() {
// Push our first recommendation to the end of the list and assign it a
// unique ID automatically.
window.alert("hi");
	
	var placename = $("#placename").val();
	var address = $("#address").val();	
	var contactno = $("#contactno").val();
	var locationurl = $("#locationurl").val();
	
recommendations.push({
    "placename": placename,
	"address": address,
	"contactno" : contactno,
	"locationurl" : locationlink,
	"imageurl":globalurl
});
	
	window.alert("Upload Success");

	};


function previewFile(){
 var t=document.querySelector('p2');
 t.innerHTML ='Upload Status: Pending ';
	
var file = document.querySelector('input[type=file]').files[0];


var metadata = {
contentType: 'image/jpeg'
};


var uploadTask = storageRef.child('location/' + file.name).put(file, metadata);

uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
function(snapshot) {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
 var t=document.querySelector('p2');
 t.innerHTML ='Upload Status: Uploading '+ Math.ceil(progress) +'%';
var r = document.querySelector('#p1');
	
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
        var starsRef = storageRef.child('location/'+ file.name);
        starsRef.getDownloadURL().then(function(url) {
            document.querySelector('#preview').src=url;
            var t=document.querySelector('p2')
            t.innerHTML ='Upload Status: Success ';
            globalurl = url;
           

        }).catch(function(error) {
            console.log('error while downloading file');
        });
    });
   
    }
	
