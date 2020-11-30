angular.module('homePageController.module',[]).controller('homePageController', function($route,$timeout,$scope,$location,$http, $cookies){

  $scope.adminLoggedIn = ($cookies.get("is_admin") === "true");

  $scope.user = $cookies.get("p_email");
  $scope.messagebool = false;


  $scope.getPatientInfo=function(){
  	$http({
  		method : "POST",
			url : "/getPatientInformation",
			data :{"p_email" : $scope.user}
  	}).then(function mySuccess(response) {
      console.log(response.data)

	  $scope.reading_data = response.data;
	  $scope.patientInfo = true;
	  
	  var f_name = response.data[0].f_name;
	  document.getElementById("f_name").innerHTML = f_name;
	  var l_name = response.data[0].l_name;
	  document.getElementById("l_name").innerHTML = l_name;
	  var b_date = response.data[0].b_date;
	  document.getElementById("date").innerHTML = getAge(b_date);
	  var phoneNum = response.data[0].phone_number;
	  document.getElementById("pnumber").innerHTML = phoneNum;
	  function getAge(dateString) {
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		
		return age;
	  
	}
	$scope.getMedicineInfo()
	$scope.getPharmacyInfo()
	$scope.getMyprescriptionList()

  	}, function myError(response) {
  		console.log(response);
  	});
  }

  $scope.getPatientInfo()
 //medicine function
 $scope.getMedicineInfo=function(){
  	$http({
  		method : "POST",
			url : "/getMedicineInformation",
			data :{"p_email" : $scope.user}
  	}).then(function mySuccess(response) {
      console.log(response.data)

	  $scope.reading_data = response.data;
	  if(response.data === undefined || response.data.length == 0){
		$scope.displaymessageMed = "There are no Active Medicine for You by your Doctor!!"
		$scope.messageboolmed= true;
	}


  	}, function myError(response) {
  		console.log(response);
  	});
  } 
  //$scope.getMedicineInfo()

  //Pharmacy Information
  $scope.getPharmacyInfo=function(){
	$http({
		method : "POST",
		  url : "/getmyPharmacy",
		  data :{"p_email" : $scope.user}
	}).then(function mySuccess(response) {
	console.log(response.data)

	$scope.myPharm_info = response.data;
	if(response.data === undefined || response.data.length == 0){
		$scope.displaymessage = "Please select the Pharmacy from the Pharmacy page !!"
		$scope.messagebool= true;
	}
	//console.log(messagebool)
	
	}, function myError(response) {
		console.log(response);
	});
} 
//$scope.getPharmacyInfo()

$scope.deletePharmacy=function(){
	$http({
		method : "POST",
		  url : "/deletemyPharmacy",
		  data :{"p_email" : $scope.user,"id":$scope.pharm_number}
	}).then(function mySuccess(response) {
	console.log(response.data)
	if(response.data){
		$scope.pageReload();
		//$scope.getPatientInfo()	
	}else{
		$scope.errormsg = true;
	  }

	$scope.myPharm_info = response.data;

	}, function myError(response) {
		console.log(response);
	});
}

$scope.getMyprescriptionList=function(){
	$http({
		method : "POST",
		  url : "/viewPrescription",
		  data :{"p_email" : $scope.user}
	}).then(function mySuccess(response) {
	console.log(response.data)

	$scope.mypre_data = response.data;
	if(response.data === undefined || response.data.length == 0){
		$scope.displaymessagePatient = "There are no Prescription for You by your Doctor!!"
		$scope.messageboolpatient= true;
	}

	}, function myError(response) {
		console.log(response);
	});
}


// page reload function
$scope.pageReload= function(){
	$scope.successMessage = "Pharmacy has been removed";
	$scope.successMessagebool = true;
	$timeout(function() { 
		$route.reload();
		$location.path('/viewPharmacy')
	}, 150);
}


	$scope.logout = function(email){
		$cookies.remove("p_email");
		$cookies.remove("is_admin");
		$location.path("/");
	}
});
