angular.module('reportPageController.module',[]).controller('reportPageController', function($scope,$location,$http, $cookies){

  $scope.adminLoggedIn = ($cookies.get("is_admin") === "true");

  $scope.user = $cookies.get("p_email");


  $scope.getBSReading=function(){
  	$http({
  		method : "POST",
			url : "/getBloodSugarReading",
			data :{"p_email" : $scope.user}
  	}).then(function mySuccess(response) {
      console.log(response.data)

	  $scope.reading_data = response.data;
	  if(response.data === undefined || response.data.length == 0){
		$scope.displaymessagePatient = "There are no Blood Sugar reading for You in the Application"
		$scope.messageboolpatient= true;
	}

  	}, function myError(response) {
  		console.log(response);
  	});
  }

  $scope.getBSReading()


	$scope.logout = function(email){
		$cookies.remove("p_email");
		$cookies.remove("is_admin");
		$location.path("/");
	}
});
