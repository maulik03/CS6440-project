angular.module('viewprescriptionPageController.module',[]).controller('viewprescriptionPageController', function($routeParams,$timeout,$scope,$location,$http, $cookies){

	$scope.adminLoggedIn = ($cookies.get("is_admin") === "true");
	$scope.user = $cookies.get("d_email");
	$scope.p_user = $routeParams.p_email;
	$scope.m_name = $routeParams.med_name;
	console.log($scope.p_user)
//view prescription data for doctors
$scope.getprescriptionList=function(){
	$http({
		method : "POST",
		  url : "/viewPrescription",
		  data :{"p_email" : $scope.p_user}
	}).then(function mySuccess(response) {
	console.log(response.data)

	$scope.reading_data = response.data;
	if(response.data === undefined || response.data.length == 0){
		$scope.displaymessage = "There are no Prescription for this Patient by you"
		$scope.messagebool= true;
	}

	}, function myError(response) {
		console.log(response);
	});
}

$scope.getprescriptionList()



	$scope.logout = function(email){
		$cookies.remove("p_email");
		$cookies.remove("is_admin");
		$location.path("/");
	}
});
