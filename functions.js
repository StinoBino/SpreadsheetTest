var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

//Called when the signed in status changes.
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listMajors();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

//Sign in the user upon button click.
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

//Sign out the user upon button click.
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

// append to content
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

// Print the range A : B from spreadsheet:
function listMajors() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1auacuh7Jsb9sKQiMwW5MfRTMyflxU_rJLEstWyl5-I0',
    range: 'A:B',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      for (i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        appendPre(row[0] + ', ' + row[1]);
      }
    } else {
      appendPre('No data found.');
    }
  }, function(response) {
    appendPre('Error: ' + response.result.error.message);
  });
}
