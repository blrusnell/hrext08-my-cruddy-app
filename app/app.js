var loadLocalStorage = function () {
	var keys = Object.keys(localStorage)
	var htmlString = '';
	for (var i = 0; i < keys.length; i++) {
		htmlString += `<tr><td>${keys[i]}</td><td>${localStorage[keys[i]]}</tr></tr>`;
	}
	$('tbody').html(htmlString)
};

var updateStatusLabel = function(message) {
	$('#statusLabel').text('Status: ' + message);
}



/*
PAGE CONTENT STUFF
*/

var createEntry = function(key, value) {
	var newNote = '•  ' + value;
    return localStorage.setItem(key, newNote);
}

var updateEntry = function(key, value) {
	var newNote = '•  ' + value;
	return localStorage.setItem(key, newNote);
}


var removeEntry = function(key) {
	return localStorage.removeItem(key);
}



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
			updateStatusLabel('Use a different title for a note!');
		} else if (key === '') {
			updateStatusLabel('You need a title!')
		}else {
			createEntry(key, value);
			updateStatusLabel('Note created - ' + key + '!');
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
			updateStatusLabel('Note updated - ' + key + '!');
			$('#key').val('');
		    $('#value').val('');
		} else if (key === '') {
			updateStatusLabel('You need to input a title to change it!')
		} else {
			updateStatusLabel('Use create button for a new note!');
		}		
		
		loadLocalStorage();		
	});

	$('#btn-delete').on('click', function(e) {
		var key = $('#key').val();
		var value = $('#value').val();
		var keyExists = localStorage.getItem(key) !== null;

		if (keyExists) {
			removeEntry(key);
			updateStatusLabel('Note removed - ' + key + '!');
			$('#key').val('');
		    $('#value').val('');
		} else if (key === '') {
			updateStatusLabel('You didn\'t delete anything!')
		} else {
			updateStatusLabel('Title doesn\'t exist, nothing removed. :|');
		}

		loadLocalStorage();
	});	

	$('#btn-clear').on('click', function(e) {
		confirm('Are you sure you want to delete everything?')
		localStorage.clear();
		updateStatusLabel('There is nothing here!')
		loadLocalStorage();
	});	


	

});
