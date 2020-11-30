angular.module('router.module',[]).config(function ($routeProvider) {
	$routeProvider

		// We are going to define routes,
		// controllers and templates associated
		// with these routes.
		// You can change these but make sure
		// you know what you are doing
		//

		// main route
		//
		.when('/',
		{
			controller: 'loginPageController',
			templateUrl: 'static/views/loginPage.html'
		})
		.when('/homePage',
		{
			controller: 'homePageController',
			templateUrl: 'static/views/homePage.html'
		})
		.when('/inputForm',
		{
			controller: 'inputPageController',
			templateUrl: 'static/views/addreadingPage.html'
		})
		.when('/doctorhomePage',
		{
			controller: 'doctorhomePageController',
			templateUrl: 'static/views/doctorhomePage.html'
		})
		.when('/report',
		{
			controller: 'reportPageController',
			templateUrl: 'static/views/reportPage.html'
		})
		.when('/viewPharmacy',
		{
			controller: 'pharmacyPageController',
			templateUrl: 'static/views/pharmacyPage.html'
		})

		.when('/addMedicine/:p_email',
		{
			controller: 'addMedicinePageController',
			templateUrl: 'static/views/addMedicinePage.html'
		})
		.when('/details/:p_email',
		{
			controller: 'detailsPageController',
			templateUrl: 'static/views/detailsPage.html'
		})
		.when('/addPrescription/:med_name',
		{
			controller: 'prescriptionPageController',
			templateUrl: 'static/views/addprescriptionPage.html'
		})
		.when('/viewPrescription/:p_email',
		{
			controller: 'viewprescriptionPageController',
			templateUrl: 'static/views/viewprescriptionPage.html'
		})
		// if non of the above routes
		// are matched we are setting router
		// to redirect to the RootController
		.otherwise({ redirectTo: '/'});

})

.config(function ($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
