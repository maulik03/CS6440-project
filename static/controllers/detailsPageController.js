angular.module('detailsPageController.module',[]).controller('detailsPageController', function($route,$routeParams,$timeout,$scope,$location,$http, $cookies){

  $scope.adminLoggedIn = ($cookies.get("is_admin") === "true");
  $scope.user = $cookies.get("d_email");
  $scope.p_user = $routeParams.p_email;
  console.log($scope.p_user)

  // adding Blood sugar reading into database

  $scope.getpatientmeds=function(){
	$http({
		method : "POST",
			url : "/getEverypatientmeds",
			data : 
			{
				"p_email" : $scope.p_user
			},
	}).then(function mySuccess(response) {
	console.log(response.data)
	$scope.reading_data = response.data;
	if(response.data === undefined || response.data.length == 0){
		$scope.displaymessageMed = "There are no Medicines for this Patient in the Application"
		$scope.messageboolmed= true;
	}
	}, function myError(response) {
		console.log(response);
	});
}
$scope.getpatientmeds()

$scope.statues = [
	{
		"status" : "Active",
		"new_status" : "Active"
	},
	{
		"status" : "Stop",
		"new_status" : "Stop"
	}
]
// page reload function
$scope.updmedstatus= function(status,med_name,med_info){
	console.log(status);
	$http({
		method : "POST",
			url : "/updatemedstatus",
			data : 
			{
				"p_email" : $scope.p_user,
				"med_name": med_name,
				"med_info" : med_info,
				"med_status": status
			},
	}).then(function mySuccess(response) {
	console.log(response.data)
	$scope.getpatientmeds()
	$scope.reading_data = response.data;
	}, function myError(response) {
		console.log(response);
	});
}

//patient BST report
$scope.getBSReading=function(){
	$http({
		method : "POST",
		  url : "/getBloodSugarReading",
		  data :{"p_email" : $scope.p_user}
	}).then(function mySuccess(response) {
	console.log(response.data)

	$scope.patient_bst_data = response.data;
	if(response.data === undefined || response.data.length == 0){
		$scope.displaymessageBst = "There are no Blood Sugar reading for this Patient in the Application"
		$scope.messageboolB= true;
	}

	}, function myError(response) {
		console.log(response);
	});
}

//Pharmacy function
$scope.getPharmacyInfo=function(){
	$http({
		method : "POST",
		  url : "/getmyPharmacy",
		  data :{"p_email" : $scope.p_user}
	}).then(function mySuccess(response) {
	console.log(response.data)

	$scope.myPharm_info = response.data;
	if(response.data === undefined || response.data.length == 0){
		$scope.displaymessage = "Patient hasnot selected their Pharmacy for more details contact patient"
		$scope.messagebool= true;
	}

	}, function myError(response) {
		console.log(response);
	});
} 

$scope.getBSReading()
$scope.getPharmacyInfo()

	$scope.logout = function(user){
		$cookies.remove("d_email");
		$cookies.remove("is_admin");
		$location.path("/");
	}
});
