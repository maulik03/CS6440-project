angular.module('pharmacyPageController.module',[]).controller('pharmacyPageController', function($timeout,$scope,$location,$http, $cookies){

  $scope.adminLoggedIn = ($cookies.get("is_admin") === "true");
  $scope.user = $cookies.get("p_email");
  


  $scope.getPharmacyList=function(){
	$http({
		method : "POST",
			url : "/getAllPharmacy"
	}).then(function mySuccess(response) {
	console.log(response.data)

	$scope.pharmacy_data = response.data;
	angular.forEach($scope.pharmacy_data, function(item){
		$scope.pharmid = item.pharmid; // id is in $scope.Id
		$scope.pharm_name = item.pharm_name;
		$scope.pharm_number = item.pharm_number;
	});

	}, function myError(response) {
		console.log(response);
	});
}

$scope.getPharmacyList()

$scope.selectmyPharmacy=function(pharm_number){
	var data ={
		"p_email" : $scope.user,
		"id":pharm_number,
		"name":$scope.pharm_name
	};
	console.log(data);
	$http({
		method : "POST",
		url : "/addmyPharmacy",
		data:data
			
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
	$timeout(function() { 
		//$route.reload();
		$location.path('/homePage')
	}, 1000);
}

	$scope.logout = function(email){
		$cookies.remove("p_email");
		$cookies.remove("is_admin");
		$location.path("/");
	}
});
