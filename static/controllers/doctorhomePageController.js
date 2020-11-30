angular.module('doctorhomePageController.module',[]).controller('doctorhomePageController', function($scope,$location,$http, $cookies){

  $scope.adminLoggedIn = ($cookies.get("is_admin") === "true");

  $scope.getPatientList=function(){
	$http({
		method : "POST",
			url : "/getPatients"
	}).then(function mySuccess(response) {
	console.log(response.data)

	$scope.patients_data = response.data;
	angular.forEach($scope.patients_data, function(item){
		$scope.p_email = item.p_email; // id is in $scope.Id
		$scope.f_name = item.f_name;
		$scope.l_name = item.l_name;
		$scope.b_date = item.b_date;
	});

	}, function myError(response) {
		console.log(response);
	});
}

$scope.getPatientList()


$scope.perscribe_info = function(){
	
	$http({
		method : "POST",
		url : "/getAllDetails",
		data : 
			{
				"email" : $scope.p_email
			} 
	}).then(function mySuccess(response) {
		console.log(response.data)
		}, function myError(response) {
			console.log(response);
		});
}
	$scope.logout = function(email){
		$cookies.remove("d_email");
		$cookies.remove("is_admin");
		$location.path("/");
	}
});
