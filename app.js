angular.module('app', [
  'app.controllers'
]);

angular.module('app.controllers', []).
controller('controller', ['$scope', function($scope) {

  $scope.isSignedIn = false

	window.updateSigninStatus = function(isSignedIn) {
    $scope.isSignedIn = isSignedIn
    $scope.$apply();

	  if (isSignedIn) {
      gapi.client.sheets.spreadsheets.values.get({
  	    spreadsheetId: '1auacuh7Jsb9sKQiMwW5MfRTMyflxU_rJLEstWyl5-I0',
  	    range: 'A:B',
  	  }).then(function(response) {
  			$scope.sheet = response.result.values
        $scope.$apply();
  	  }, function(response) {
  			$scope.error = response.result.error.message
        $scope.$apply();
  	  });
    }
	}

	//Sign in the user upon button click.
	$scope.handleAuthClick = function(event) {
	  gapi.auth2.getAuthInstance().signIn();
	}

	//Sign out the user upon button click.
	$scope.handleSignoutClick = function(event) {
	  gapi.auth2.getAuthInstance().signOut();
	}
}])
