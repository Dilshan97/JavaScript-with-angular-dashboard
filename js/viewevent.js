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
// Reference to your entire Firebase database


var myFirebase = firebase.database();

//var userId = firebase.auth().currentUser.uid;

var query = firebase.database().ref("events").orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
		console.log(key);
      var childData = childSnapshot.val();
	 var eventitle = childData.eventtitle;
		var eventdatetime = childData.eventdatetime;
		var eventhost =childData.eventhost;
		var eventvenue = childData.eventvenue;
		var eventdescription = childData.eventdescription;
		console.log(eventitle);
		 $('#event_table').append(`		 
		 <tr>
        <td>`+eventitle+`</td>
        <td>`+eventdatetime+`</td>
        <td>`+eventhost+`</td>
		<td>`+eventvenue+`</td>
		<td><!-- Icon button -->
				<button class="mdl-button mdl-js-button mdl-button--icon">
				  <i class="material-icons">update</i>
				</button> </td>
		<td><!-- Icon button -->
			<button class="mdl-button mdl-js-button mdl-button--icon">
			  <i class="material-icons">delete</i>
			</button></td>
      </tr>
		 `);
		
	  
		 });
	
    });

			
	 
