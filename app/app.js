var loadLocalStorage = function () {
	var keys = Object.keys(localStorage);
	var htmlString = '';
	for (var i = 0; i < keys.length; i++) {
		htmlString += `<tr><td>${keys[i]}</td><td><img src="/home/brent/Pictures/${localStorage[keys[i]]}"></tr></tr>`;
	}
	$('tbody').html(htmlString)
};

var updateStatusLabel = function(message) {
	$('#statusLabel').text('Status: ' + message);
}



/*
PAGE CONTENT STUFF
*/


//remove fakepath ---->>>//C:\fakepath\
var upload = function(fakepath) {
	var splits = fakepath.split('fakepath\\');
	return splits[1];
}


var createEntry = function(key, value) {
    return localStorage.setItem(key, upload(value));;

}

var updateEntry = function(key, value) {
	return localStorage.setItem(key, upload(value));
}


var removeEntry = function(key) {
	return localStorage.removeItem(key);
}

// function getConfirmation()
// {
//     var retVal = confirm("Do you want to continue ?");
//     if (retVal == true)
//     {
//         alert("User wants to continue!");
//         return true;
//     } 
//     else
//     {
//         alert("User does not want to continue!");
//         return false;
//     }
// }








/*
JQUERY STUFF
*/
 //jQuery document ready initialization stuff
 ////button and form event handlers
 // logic for determining action probably needs to go in the event handler
$(document).ready(function () {
	loadLocalStorage();

	updateStatusLabel('There is nothing here!');





	$('#btn-create').on('click', function(e) {
		var key = $('#key').val();
		var value = $('#value').val();

		var keyExists = localStorage.getItem(key) !== null;

		if (keyExists) {
			updateStatusLabel('That person already exists - use update to change picture!');
		} else if (key === '') {
			updateStatusLabel('You need a name!')
		}else {
			createEntry(key, value);
			updateStatusLabel('Person created - ' + key + '!');
			$('#key').val('');
		    $('#value').val('');
		}

		loadLocalStorage();
	});

	$('#btn-update').on('click', function(e) {
		var key = $('#key').val();
		var value = $('#value').val();
		var existingValue = localStorage.getItem(key)
		var keyExists = existingValue !== null;

		if (value === existingValue) {
			updateStatusLabel('You changed absolutely nothing!')
		} else if (keyExists) {
			updateEntry(key, value);
			updateStatusLabel('Person updated - ' + key + '!');
			$('#key').val('');
		    $('#value').val('');
		} else if (key === '') {
			updateStatusLabel('You need to input a name to change it!')
		} else {
			updateStatusLabel('Use create button for a new person!');
		}		
		
		loadLocalStorage();		
	});

	$('#btn-delete').on('click', function(e) {
		var key = $('#key').val();
		var value = $('#value').val();
		var keyExists = localStorage.getItem(key) !== null;

		if (keyExists) {
			removeEntry(key);
			updateStatusLabel('Person removed - ' + key + '!');
			$('#key').val('');
		    $('#value').val('');
		} else if (key === '') {
			updateStatusLabel('You didn\'t delete anything!')
		} else {
			updateStatusLabel('Person doesn\'t exist, nothing removed. :|');
		}

		loadLocalStorage();
	});	

	$('#btn-clear').on('click', function(e) {
		if (confirm("Press Ok to Thanos your list!")) {
          localStorage.clear();
        }
		updateStatusLabel('There is nothing here!')
		loadLocalStorage();
	});	


	

});
