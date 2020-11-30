angular.module('loginPageController.module',[]).controller('loginPageController', function($timeout,$route,$scope,$location,$http, $cookies){

$scope.errormessage = false;
// $scope.submitPatient = function(){
//   // console.log($scope.email, $scope.password)

//   $scope.getPatient($scope.email,$scope.password);

// }

$scope.getPatient=function(email, password){
	$http({
		method : "POST",
			url : "/getPatientLogin",
			data : {"email" : email, "password" : password}
	}).then(function mySuccess(response) {
    console.log(response.data)
    isLogin = response.data["login"];
     if(isLogin == true){
       $cookies.put("p_email", email);
       $cookies.put("is_admin", response.data["isAdmin"]);
       $location.path("/homePage");
     }else{
      $scope.errormessage = true;
      $scope.errorMessage = 'Wrong Username Or Password Please Try Again !!';
      $scope.pageReload()
    }
    }
	);
}

// //Doctor login
// $scope.submitDoctor = function(){
//   // console.log($scope.email, $scope.password)

//   $scope.getDoctor($scope.email,$scope.password);

// }

$scope.getDoctor=function(email, password){
	$http({
		method : "POST",
			url : "/getDoctorLogin",
			data : {"email" : email, "password" : password}
	}).then(function mySuccess(response) {
    console.log(response.data)
    isLogin = response.data["login"];
     if(isLogin == true){
       $cookies.put("d_email", email);
       $cookies.put("is_admin", response.data["isAdmin"]);
       $location.path("/doctorhomePage");
     }
     else{
      $scope.errormessage = true;
      $scope.errorMessage = 'Wrong Username Or Password Please Try Again !!';
      $scope.pageReload();
    }
    }
	);
}

// page reload function
$scope.pageReload= function(){
	$timeout(function() { 
		$route.reload();
	}, 1000);
}


$scope.submitUser = function(){
  console.log($scope.patient)
  console.log($scope.doctor)
  console.log($scope.email)
  console.log($scope.password)
  if($scope.patient === 'patient'){
    $scope.getPatient($scope.email,$scope.password)
  }
  else if($scope.doctor === 'doctor'){
    $scope.getDoctor($scope.email,$scope.password)
  }
  else{

  }
}



});
