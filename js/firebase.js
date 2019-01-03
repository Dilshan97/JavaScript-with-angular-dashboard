// Replace your code below
var config = {
    apiKey: "AIzaSyBwBgfn6Dn19KW7b9CfVi3x1OhEHNKv7oM",
    authDomain: "javascriptfirebase-6cd82.firebaseapp.com",
    databaseURL: "https://javascriptfirebase-6cd82.firebaseio.com",
    projectId: "javascriptfirebase-6cd82",
    storageBucket: "",
    messagingSenderId: "798838101889"
  };
  
 // Replace your code above 
  
firebase.initializeApp(config);

//Login Notification Function
function loginNotify(from, align) {
    type = ['info', 'success', 'rose', 'primary'];

    color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: "You are successfully Logged in.!"

    }, {
        type: type[color],
        timer: 3000,
        placement: {
            from: from,
            align: align
        }
    });
}
//Logout Notification Function
function logoutNotify(from, align) {
    type = ['info', 'success', 'rose', 'primary'];

    color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: "You are Logout shortly..!"

    }, {
        type: type[color],
        timer: 3000,
        placement: {
            from: from,
            align: align
        }
    });
}
//File Gets Notification Function
function file_get_notify(from, align) {
    type = ['info', 'success', 'rose', 'primary'];

    color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: "Fetching your files..!"

    }, {
        type: type[color],
        timer: 3000,
        placement: {
            from: from,
            align: align
        }
    });
}
//File Delete Notification Function
function file_delete_notify(from, align) {
    type = ['info', 'success', 'rose', 'primary'];

    color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: "Your file has been deleted...!"

    }, {
        type: type[color],
        timer: 3000,
        placement: {
            from: from,
            align: align
        }
    });
}
//New Table Add Notification Function
function add_table_alert(from, align) {
    type = ['info', 'success', 'rose', 'primary'];

    color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: "Your table has been created successfully...!"

    }, {
        type: type[color],
        timer: 3000,
        placement: {
            from: from,
            align: align
        }
    });
}
//New Record Insert Notification Function
function new_record_insert(from, align) {
    type = ['info', 'success', 'rose', 'primary'];

    color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: "Your record has been added...!"

    }, {
        type: type[color],
        timer: 3000,
        placement: {
            from: from,
            align: align
        }
    });
}
//Table Data Get Notification Function
function table_data_get_alert(from, align) {
    type = ['info', 'success', 'rose', 'primary'];

    color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: "We are fetching your records...!"

    }, {
        type: type[color],
        timer: 3000,
        placement: {
            from: from,
            align: align
        }
    });
}
//Table List Notification Function
function table_get(from, align) {
    type = ['info', 'success', 'rose', 'primary'];

    color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: "Getting Tables records..!"

    }, {
        type: type[color],
        timer: 3000,
        placement: {
            from: from,
            align: align
        }
    });
}
//Login Error Notification Function
function loginNotifyError(from, align) {
    type = ['warning', 'danger'];

    color = Math.floor((Math.random() * 2) + 1);

    $.notify({
        icon: "notifications",
        message: "Oops there is something wrong. Please try again...!"

    }, {
        type: type[color],
        timer: 3000,
        placement: {
            from: from,
            align: align
        }
    });
}

$(document).ready(function () {
    $('#btnLogin').click(function (e) {


        firebase.auth().signInWithEmailAndPassword($('#username').val(), $('#password').val())
                .then(
                        function (data) {
                            loginNotify('top', 'right');

                            window.setTimeout(function () {
                                window.location.replace("index.html");

                            }, 5000);
                        }
                )
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    loginNotifyError('top', 'right');
                });

    })
});
$("#add_field_click").click(function () {
    var field_name = $("#new_field_name").val();
    if (field_name == '') {
        return false;
    }
    var add_new_var = '<div class="form-group label-floating is-empty"><label class="control-label">' + field_name + '<small>*</small></label><input class="form-control" name="' + field_name + '" type="text" required="true" /></div><div>';
    $("#new_form").append(add_new_var);
});


$("body").delegate("#add_table_btn", "click", function (event) {
    var formArray = $(".myform_new").serializeArray();
	console.log(formArray);
    var tbl_name = $("#new_table_name").val();

    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
		
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }



    var newPostKey = firebase.database().ref().child(tbl_name).push().key;

    var updates = {};
    updates['/' + tbl_name + '/' + newPostKey] = returnArray;
    firebase.database().ref().update(updates);
    add_table_alert();

});
//All Table List Function
function all_table() {

    firebase.database().ref().once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            
           <!-- var html_content = '<div class="col-md-4"><div class="card card-product"><div class="card-image" data-header-animation="true"><a href="#"><img class="img" src="img/card-1.jpeg"></a></div><div class="card-content"><div class="card-actions"><button type="button" class="btn btn-danger btn-simple fix-broken-card"><i class="material-icons">build</i> Fix Header!</button><a href="table_data_show.html?id=' + childKey + '" class="btn btn-default btn-simple"><i class="material-icons">art_track</i></a><a href="table_data_manage.html?id=' + childKey + '" class="btn btn-success btn-simple"><i class="material-icons">edit</i></a></div><h4 class="card-title"><a href="#">' + childKey + '</a></h4></div></div></div>';-->

            $("#new_content").append(html_content);


        });
        table_get('top', 'right');
    });

}
//Add New Record Function
$("body").delegate("#add_record_btn", "click", function (event) {

    var formArray = $(".myform_new").serializeArray();
    var tbl_name = $("#table_name").text();
    new_record_insert();
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }



    var newPostKey = firebase.database().ref().child(tbl_name).push().key;

    var updates = {};
    updates['/' + tbl_name + '/' + newPostKey] = returnArray;
    return firebase.database().ref().update(updates);

});
//Table List Function
function get_table_list() {

    firebase.database().ref().once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;

            var html_content = '<li><a href="table_data_show.html?id=' + childKey + '">' + childKey + '</a></li>';

            $("#tbl_list").append(html_content);


        });

    });

}
//Table List Manage Function
function get_table_list_manage() {

    firebase.database().ref().once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;

            var html_content = '<li><a href="table_data_manage.html?id=' + childKey + '">' + childKey + '</a></li>';

            $("#tbl_list").append(html_content);


        });

    });

}
//Single Table Data Function
function get_table_data(table_name) {

    var itemsRef = firebase.database().ref().child(table_name);
    var isFirst = true;
    itemsRef.on('value', function (snapshot) {
        
        $('#tbody_con').html('');
        snapshot.forEach(function (child) {

            if (isFirst) {
                createHeaders(child.val());
                create_insert_row(child.val());
                isFirst = false; //So it only will run once.
            }

            showItems(child.val(), child.key);

        });


    });

}
function createHeaders(data) {
    var html = '';
    html += '<tr>';
    $.each(data, function (key, value) {
        html += '<th>' + key + '</th>';
    });

    html += '</tr>';

    $("#thead_con").append(html);

}
function create_insert_row(data) {


    $.each(data, function (key, value) {
        var add_new_var = '<div class="form-group label-floating is-empty"><label class="control-label">' + key + '<small>*</small></label><input class="form-control" name="' + key + '" type="text" required="true" /></div><div>';
        $("#new_form").append(add_new_var);
    });




}
function showItems(data, key) {

    var html = '';
    html += '<tr>';
    $.each(data, function (key, value) {
        html += '<td>' + value + '</td>';
    });
    html += '</tr>';

    $('#tbody_con').append(html);

}

//Single Table Function
function get_table_data_manage(table_name) {

    var itemsRef = firebase.database().ref().child(table_name);
    var isFirst = true;
    $("#thead_con").html('');
    $('#tbody_con').html('');
    itemsRef.on('value', function (snapshot) {


        snapshot.forEach(function (child) {

            if (isFirst) {
                createHeaders_manage(child.val());
                //create_insert_row(child.val());
                isFirst = false; //So it only will run once.
            }

            showItems_manage(child.val(), child.key);

        });



    });

}
function createHeaders_manage(data) {
    var html = '';
    html += '<tr>';
    $.each(data, function (key, value) {
        html += '<th>' + key + '</th>';
    });

    html += '<th>Actions</th></tr>';

    $("#thead_con").html(html);

}





function showItems_manage(data, key) {

    var html = '';
    html += '<tr id="' + key + '">';
    $.each(data, function (key, value) {
        html += '<td>' + value + '</td>';
    });
    html += '<td><a href="#" class=" edit"><i class="material-icons">mode_edit</i></a>&nbsp;&nbsp;<a href="#" class=" remove"><i class="material-icons">delete</i></a></td></tr>';

    $('#tbody_con').append(html);

}
$("body").delegate(".remove", "click", function (event) {

    var trr = $(this).closest('tr').attr('id');
    //alert(trr);

    before_delete(trr);
});
//Delete Function
function before_delete(trr) {

    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'Yes, delete it!',
        buttonsStyling: false
    }).then(function () {
        deleteDataCustom(trr);
        swal({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false
        })
    });
}
function deleteDataCustom(userId) {
    var tbl_name = $("#table_name").text();
    var personRef = firebase.database().ref().child(tbl_name).child(userId);
    personRef.once('value', function (snapshot) {

        if (snapshot.val() === null) {
            /* does not exist */
            alert('does not exist');
        } else {
            personRef.remove();
        }

    });
    get_table_data_manage(tbl_name);
}

$("body").delegate(".edit", "click", function (event) {

    var trr = $(this).closest('tr').attr('id');
    //alert(trr);
    var tbl_name = $("#table_name").text();
    readsingle(tbl_name, trr);
});

//Read Single Record Function
function readsingle(tbl, id) {
    var html = '<form class="form3">';
    firebase.database().ref('/' + tbl + '/' + id).once('value').then(function (snapshot) {
        if (snapshot.val() === null) {
            /* does not exist */
            alert('does not exist');
        } else {
            $.each(snapshot.val(), function (key, value) {
                // console.log(key+'-'+value)
                html += '<div class="form-group label-floating "><label class="control-label">' + key + '<small>*</small></label><input class="form-control" name="' + key + '" type="text" required="true" value="' + value + '" /></div><div>';

            });
            html += '</form>';
            edit_data(html, tbl, id);
        }

    });
}
//Edit Data Function
function edit_data(html, tbl, id) {

    swal({
        title: 'Update',
        html: html,
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
    }).then(function (result) {
        updateDataCustom(tbl, id);
        swal({
            type: 'success',
            html: 'Your Data Updated',
            confirmButtonClass: 'btn btn-success',
            buttonsStyling: false

        })
    }).catch(swal.noop)
}

function updateDataCustom(tbl, id) {

    var formArray = $(".form3").serializeArray();

    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    var personRef = firebase.database().ref().child(tbl).child(id);

    personRef.once('value', function (snapshot) {

        if (snapshot.val() === null) {
            /* does not exist */
            alert('does not exist');
        } else {
            personRef.update(returnArray);
        }

    });
    get_table_data_manage(tbl);
}
//File List Function
function handleFileSelect(e) {

    storage = firebase.storage();
    var file = e.target.files[0];
    var filename = $('#file_send').val().split('\\').pop();
    ;

    var storageRef = storage.ref().child('Timetable');


    var photoRef = storageRef.child(file.name);



    var uploadTask = photoRef.put(file);

    uploadTask.on('state_changed', null, null, function () {

        var downloadUrl = uploadTask.snapshot.downloadURL;

        var now = new Date();
        var strDate = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
        var postData = {
            filename: filename,
            date: strDate,
            download_link: downloadUrl
        };


        var newPostKey = firebase.database().ref().child('files').push().key;

        var updates = {};
        updates['/files/' + newPostKey] = postData;
        firebase.database().ref().update(updates);
    });
}
$("body").delegate("#file_send", "change", function (event) {
    handleFileSelect(event);
});

function get_file_list() {

    var ref = firebase.database().ref().child("files");

    ref.on("value", function (snapshot) {
        $('#tbody_con').empty();
        snapshot.forEach(function (childSnapshot) {

            var key = childSnapshot.key;

            var childData = childSnapshot.val();
            var tr = '<tr>' +
                    '<td>' + childData.date + '</td>' +
                    '<td><a target="_blank" href=' + childData.download_link + '>' + childData.filename + '</a></td>' +
                    '<td><a download href=' + childData.download_link + '>Download</a></td>' +
                    '<td><a href="#" class=" delete_file" row_id="' + key + '" id="' + childData.filename + '"><i class="material-icons">delete</i></a></td>' +
                    '</tr>';
            $('#tbody_con').append(tr);

        });
    }, function (error) {
        console.log("Error: " + error.code);
    });
    file_get_notify();

}
//Delete File Function
$("body").delegate(".delete_file", "click", function (event) {

    var filename = $(this).attr('id');
    var row_id = $(this).attr('row_id');
    delete_file(filename, row_id);
    var personRef = firebase.database().ref().child('files').child(row_id);

    personRef.once('value', function (snapshot) {

        if (snapshot.val() === null) {
            /* does not exist */
            alert('does not exist');
        } else {
            personRef.remove();
        }

    });


});
function delete_file(filename, row_id) {
    storage = firebase.storage();
    var storageRef = storage.ref().child('Timetable/' + filename);


    storageRef.delete().then(function () {

        file_delete_notify();




    }).catch(function (error) {
        // Uh-oh, an error occurred!
        console.log(error);
    });

}

//File List Function
function handleEventSelect(e) {

    storage = firebase.storage();
    var events = e.target.events[0];
    var eventname = $('#events_file_send').val().split('\\').pop();
    ;

    var storageRef = storage.ref().child('Events');


    var photoRef = storageRef.child(events.name);



    var uploadTask = photoRef.put(events);

    uploadTask.on('state_changed', null, null, function () {

        var downloadUrl = uploadTask.snapshot.downloadURL;

        var now = new Date();
        var strDate = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate();
        var postData = {
            eventname: eventname,
            date: strDate,
            download_link: downloadUrl
        };


        var newPostKey = firebase.database().ref().child('events').push().key;

        var updates = {};
        updates['/events/' + newPostKey] = postData;
        firebase.database().ref().update(updates);
    });
}
$("body").delegate("#events_file_send", "change", function (event) {
    handleFileSelect(event);
});

function get_event_list() {

    var ref = firebase.database().ref().child("Events");

    ref.on("value", function (snapshot) {
        $('#tbody_con').empty();
        snapshot.forEach(function (childSnapshot) {

            var key = childSnapshot.key;

            var childData = childSnapshot.val();
            var tr = '<tr>' +
                    '<td>' + childData.date + '</td>' +
                    '<td><a target="_blank" href=' + childData.download_link + '>' + childData.eventname + '</a></td>' +
                    '<td><a download href=' + childData.download_link + '>Download</a></td>' +
                    '<td><a href="#" class=" delete_file" row_id="' + key + '" id="' + childData.eventname + '"><i class="material-icons">delete</i></a></td>' +
                    '</tr>';
            $('#tbody_con').append(tr);

        });
    }, function (error) {
        console.log("Error: " + error.code);
    });
    file_get_notify();

}
//Delete File Function
$("body").delegate(".delete_event", "click", function (event) {

    var events = $(this).attr('id');
    var row_id = $(this).attr('row_id');
    delete_file(eventname, row_id);
    var personRef = firebase.database().ref().child('events').child(row_id);

    personRef.once('value', function (snapshot) {

        if (snapshot.val() === null) {
            /* does not exist */
            alert('does not exist');
        } else {
            personRef.remove();
        }

    });


});
function delete_event(eventname, row_id) {
    storage = firebase.storage();
    var storageRef = storage.ref().child('Events/' + eventname);


    storageRef.delete().then(function () {

        file_delete_notify();




    }).catch(function (error) {
        // Uh-oh, an error occurred!
        console.log(error);
    });

}

//Logout Function
$("body").delegate("#logout", "click", function (event) {

    logoutNotify();
    window.setTimeout(function () {
        firebase.auth().signOut().then(function () {

        }, function (error) {
            console.error('Sign Out Error', error);
        });

    }, 5000);

});

