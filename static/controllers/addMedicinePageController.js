angular.module('addMedicinePageController.module',[]).controller('addMedicinePageController', function($route,$routeParams,$timeout,$scope,$location,$http, $cookies){

  $scope.adminLoggedIn = ($cookies.get("is_admin") === "true");
  $scope.user = $cookies.get("d_email");
  $scope.p_user = $routeParams.p_email;
  console.log($scope.p_user)

  // adding Blood sugar reading into database

  $scope.insertMedicine=function(){
	$http({
		method : "POST",
			url : "/addMedicine",
			data : 
			{
				"p_email" : $scope.p_user,
				"med_name" : $scope.med_name, 
				"med_info" : $scope.med_info ,
				"med_status" : $scope.med_status
			},
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
	$scope.successMessage = " Medicine has been added for selected patient";
	$scope.successMessagebool = true;
	$timeout(function() { 
		$route.reload();
		//$location.path('/doctorhomePage')
	}, 1000);
}


	$scope.logout = function(email){
		$cookies.remove("d_email");
		$cookies.remove("is_admin");
		$location.path("/");
	}
});
