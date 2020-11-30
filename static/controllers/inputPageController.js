angular.module('inputPageController.module',[]).controller('inputPageController', function($route,$timeout,$scope,$location,$http, $cookies){

  $scope.adminLoggedIn = ($cookies.get("is_admin") === "true");
  $scope.user = $cookies.get("p_email");

  // adding Blood sugar reading into database

  $scope.insertBloodSugar=function(){
	$http({
		method : "POST",
			url : "/insertBloodSugar",
			data : 
			{
				"p_email" : $scope.user,
				"BloodReading" : $scope.BloodReading, 
				"date" : $scope.date ,
				"when_measured" : $scope.when_measured, 
				"measured_time" : $scope.measured_time
			}

	}).then(function mySuccess(response) {
	console.log(response.data)
	if(response.data){
		$scope.pageReload();	
	}else{
		$scope.errormsg = true;
	  }



	}, function myError(response) {
		console.log(response);
	});
}
// page reload function
$scope.pageReload= function(){
	$scope.successMessage = " Blood Sugar Levels are Captured!!";
	$scope.successMessagebool = true;
	$timeout(function() { 
		//$route.reload();
		$location.path('/report')
	}, 1000);
}


	$scope.logout = function(email){
		$cookies.remove("p_email");
		$cookies.remove("is_admin");
		$location.path("/");
	}
});
