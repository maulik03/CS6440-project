angular.module('prescriptionPageController.module',[]).controller('prescriptionPageController', function($routeParams,$timeout,$scope,$location,$http, $cookies){

	$scope.adminLoggedIn = ($cookies.get("is_admin") === "true");
	$scope.user = $cookies.get("d_email");
	$scope.p_user = $routeParams.p_email;
	$scope.m_name = $routeParams.med_name;
	console.log($scope.m_name)
  

  // adding Blood sugar reading into database

  $scope.displaypredetails=function(){
	$http({
		method : "POST",
			url : "/createPrescription",
			data : 
			{
				"p_email" : $scope.p_user,
				"med_name" : $scope.m_name
			}

	}).then(function mySuccess(response) {
	console.log(response.data)
	$scope.prescribe_data = response.data;
	angular.forEach($scope.prescribe_data, function(item){
		$scope.p_email = item.p_email; // id is in $scope.Id
		// $scope.f_name = item.f_name;
		// $scope.l_name = item.l_name;
		// $scope.b_date = item.b_date;
	});
	}, function myError(response) {
		console.log(response);
	});
}
$scope.displaypredetails();
// page reload function
$scope.pageReload= function(){
	$scope.successMessage = "Prescription is Created for the Medicine";
	$scope.successMessagebool = true;
	$timeout(function() { 
		//$route.reload();
		$location.path('/doctorhomePage')
	}, 1000);
}
// insert prescription data function
$scope.addPrescription= function(){
	var addPrescribeData = {
		"patient" : $scope.p_email,
		"doctor" : $scope.user,
		"medicine" : $scope.m_name,
		"med_qua": $scope.quantity,
		"issueDate":$scope.issuedate,
		"refils": $scope.numrefils,
		"duration":$scope.d_time
	}
console.log(addPrescribeData);

	$http({
		method : "POST",
			url : "/addprescriptionforMed",
			data : addPrescribeData
}).then(function mySuccess(response) {
	console.log(response.data)
	$scope.prescribe_data = response.data;
	if(response.data){
		$scope.pageReload();	
	}else{
		$scope.errormsg = true;
	  }
	}, function myError(response) {
		console.log(response);
	});
}

//view prescription data for doctors
$scope.getprescriptionList=function(){
	$http({
		method : "POST",
		  url : "/viewPrescription",
		  data :{"p_email" : $scope.p_user}
	}).then(function mySuccess(response) {
	console.log(response.data)

	$scope.reading_data = response.data;

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
