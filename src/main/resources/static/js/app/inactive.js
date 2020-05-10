appWeb.controller("inactive",function($scope,$http,$location)
{
	$scope.title="Spring Boot CRUD Application";
	$scope.desc="Single Page Application developed in Angular JS,Bootstrap,Spring Boot,Micro Services and JPA";
	

	$scope.searchdata="";
	$scope.applianceInactiveList=[];
	
	//applianceInactiveList		
	$http.get('http://localhost:9091/houseHoldApplianceService/appliance/applianceInactiveList').then(function(response) 
	{
			$scope.applianceInactiveList=response.data;
			console.log("applianceInactiveList :"+angular.toJson(response.data));
	}, function(error) {
			alert(error);
			console.log(error);
	});	
  //applianceInactiveList end
	
	$scope.activeAppliance=function(row)
	{
		
		$scope.appliance={
				"id":row.id,
				"serialno":row.serialno,
				"brand":row.brand,
				"model":row.model,
				"broughtdte":row.broughtdte,
				"status":row.status
			};
		console.log("Inactive Data"+angular.toJson($scope.appliance));
	
		$http.post('http://localhost:9091/houseHoldApplianceService/appliance/active',$scope.appliance).then(function(response) 
		{
			 if(response.status=='200')
			 {
				 $scope.refresh();
			 }
		}, function(error) {
			alert(error);
			console.log(error);
		});
	}
	
	$scope.refresh=function()
	{
		
		$scope.searchdata="";
		$scope.applianceInactiveList=[];
		
		//applianceInactiveList		
		$http.get('http://localhost:9091/houseHoldApplianceService/appliance/applianceInactiveList').then(function(response) 
		{
				$scope.applianceInactiveList=response.data;
				console.log("applianceInactiveList :"+angular.toJson(response.data));
		}, function(error) {
				alert(error);
				console.log(error);
		});	
	  //applianceInactiveList end
	}
	
	
});

