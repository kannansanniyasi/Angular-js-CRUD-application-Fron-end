var appWeb=angular.module("myApp",["ngRoute"]);

appWeb.config(function($routeProvider)
{
	      $routeProvider
	      .when("/",
	    	{
	    	  templateUrl:"views/home.html",
	    	  controller:"home"
	    	})
	    	.when("/inactive",
	    	{
	    	  templateUrl:"views/inactive.html",
	    	  controller:"inactive"
	    	})
	    	.when("/edit",
	    	{
	    	  templateUrl:"views/edit.html",
	    	  controller:"edit"
	    	});
});


appWeb.controller("home",function($scope,$http)
{
	$scope.title="Household Appliances";
	$scope.desc="This Application maintain Household Appliance Details";
	
	
	$scope.brandList=[];
	$scope.modelList=[];
	$scope.applianceList=[];
	
	$scope.applianceInactiveList=[];
	
	
	$scope.appliance={
			"serialno":"",
			"brand":"",
			"model":"",
			"broughtdte":new Date(),
			"status":""
		};
	$scope.flg=false;
	$scope.flag=false;
	$scope.errMsg=null;
	$scope.succMsg=null;
	
	$scope.btnFlg=false;
	$scope.tableFlg=false;
	$scope.searchdata="";

	//getBrandList
	
	
	
		
	
      //getApplianceList
		$http.get('http://localhost:9091/houseHoldApplianceService/appliance/applianceList').then(function(response) 
		{
			$scope.applianceList=response.data;
			console.log("applianceList :"+angular.toJson(response.data));
		}, function(error) {
			alert(error);
			console.log(error);
		});
	
	//getApplianceList end
		
		
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
		
	$scope.addAppliance=function()
	{
		$scope.tableFlg=true;
		$scope.fetchData();
		$scope.appliance={
				"serialno":"",
				"brand":"",
				"model":"",
				"broughtdte":new Date(),
				"status":""
			};
	}
	
	$scope.fetchData=function()
	{
		
		$scope.brandList=[];
		$http.get('http://localhost:9091/houseHoldApplianceService/appliance/brandList').then(function(response) 
		{
			$scope.brandList=response.data;
			console.log($scope.brandList);	
			console.log("brandList :"+angular.toJson(response.data));
		}, function(error) {
			alert(error);
			console.log(error);
		});
	
	//getBrandList end
	

	}
	
	$scope.changeBrand=function(selectedValue)
	{
		//getModelList	
		console.log("selectedValue :"+angular.toJson(selectedValue));
		
		var data = {
				brand:selectedValue
				};

				var config = {
				 params: data,
				 headers : {'Accept' : 'application/json'}
				};
		
		$scope.modelList=[];
		$http.get('http://localhost:9091/houseHoldApplianceService/appliance/modelList',config).then(function(response) 
		{
			$scope.modelList=response.data;
			console.log("modelList :"+$scope.modelList);
			console.log("modelList :"+angular.toJson(response.data));
		}, function(error) {
			alert(error);
			console.log(error);
		});
	   //getBrandList end
	}
	
	
	$scope.save=function()
	{
			$scope.flg=$scope.validation();
			console.log("Save Data :"+$scope.appliance.brand);
			console.log("Save Data :"+$scope.appliance.serialno);
			console.log("Save Data :"+angular.toJson($scope.appliance));
			
			if(!$scope.flg) 
			{
				
			
				$http.post('http://localhost:9091/houseHoldApplianceService/appliance/checkValue',$scope.appliance).then(function(response) 
						{
							 if(response.status=='200')
							 {
								 $scope.msg=response.data['message'];
								 console.log("message :"+$scope.msg);
								 console.log("message :"+response.data['message']);
								 if(response.data['message']=='exit')
								{
									 console.log("duplicate value");
									 $scope.errMsg="Serial Number,Brand and Model Already in Household Appliance";
								}else
								{
									//save data start
									var data = {
											id:"",
											serialno:$scope.appliance.serialno,
											brand:$scope.appliance.brand,
											model:$scope.appliance.model,
											broughtdte:$scope.appliance.broughtdte,
											status:"Y"
											};
								
									$http.post('http://localhost:9091/houseHoldApplianceService/appliance/save',data).then(function(response) 
									{
										 if(response.status=='200')
										 {
											 $scope.succMsg="Data Inserted Successfully";	
											 $scope.errMsg=null;
											 $scope.appliance;
											 $scope.applianceList=[];
											 $scope.refresh();
										 }
									}, function(error) {
										alert(error);
										console.log(error);
									});
									//save data end
									
								}
							 }
						}, function(error) {
							alert(error);
							console.log(error);
							$scope.flag=false;
						});
				
			
			
			}		 
	}
	
	$scope.validation=function()
	{
		$scope.flag=false;
		$scope.errMsg=null;
		
		if($scope.appliance!=undefined)
		{
			if($scope.appliance.serialno=='' || $scope.appliance.serialno==null)
			{
				$scope.flag=true;
				$scope.errMsg="Please Enter Serial Number";
			}else
			if($scope.appliance.brand=='' || $scope.appliance.brand==null)
			{
				$scope.flag=true;
				$scope.errMsg="Please Select Brand";
			}else
			if($scope.appliance.model=='' || $scope.appliance.model==null)
			{
				$scope.flag=true;
				$scope.errMsg="Please Select Model";
			}else
			if($scope.appliance.broughtdte=='' || $scope.appliance.broughtdte==null)
			{
				$scope.flag=true;
				$scope.errMsg="Please Enter Date";
			}

		}else
		{
			$scope.errMsg="Please Enter Details";
			$scope.flag=true;
		}
		
		
		
		return $scope.flag;
	}
	
	
	
	$scope.refereshData=function()
	{
		$http.get('http://localhost:9091/houseHoldApplianceService/appliance/applianceList').then(function(response) 
				{
											          $scope.applianceList=response.data;
											          console.log("applianceList :"+angular.toJson(response.data));
										  }, function(error) {
											    	 alert(error);
											    	 console.log(error);
				});
		
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
	
	$scope.edit=function(row)
	{
		$scope.fetchData();
		$scope.btnFlg=true;
		$scope.appliance;
		$scope.tableFlg=true;
		
		console.log("Brought Date :"+row.broughtdte)
		
		$scope.appliance={
				"id":row.id,
				"serialno":row.serialno,
				"brand":row.brand,
				"model":row.model,
				"broughtdte":new Date(row.broughtdte),
				"status":row.status
			};
		$scope.changeBrand(row.brand);
	}
	
	$scope.update=function()
	{
		$scope.flg=$scope.validation();
		console.log("update"+angular.toJson($scope.appliance));
		if(!$scope.flg) 
		{
			
			$scope.appliance={
					"id":$scope.appliance.id,
					"serialno":$scope.appliance.serialno,
					"brand":$scope.appliance.brand,
					"model":$scope.appliance.model,
					"broughtdte":$scope.appliance.broughtdte,
					"status":$scope.appliance.status
				};
			
		 $http.put('http://localhost:9091/houseHoldApplianceService/appliance/update',$scope.appliance).then(function(response) 
		{
			 if(response.status=='200')
			 {
				 $scope.succMsg="Data Updated Successfully";	
				 $scope.errMsg=null;
				 $scope.appliance;
				 $scope.applianceList=[];
				 $scope.btnFlg=false;
				 $scope.refereshData();
				 $scope.refresh();
			 }
		}, function(error) {
			alert(error);
			console.log(error);
		});
		}
	}
	
	$scope.deleteAppliance=function(row)
	{
		console.log("delete Data"+angular.toJson($scope.appliance));
		
		$scope.appliance={
				"id":row.id,
				"serialno":row.serialno,
				"brand":row.brand,
				"model":row.model,
				"broughtdte":row.broughtdte,
				"status":row.status
			};
	
		$http.put('http://localhost:9091/houseHoldApplianceService/appliance/delete',$scope.appliance).then(function(response) 
		{
			 if(response.status=='200')
			 {
				 $scope.succMsg="Deleted Successfully";	
				 $scope.errMsg=null;
				 $scope.appliance;
				 $scope.applianceList=[];
				 $scope.refereshData();
				 $scope.btnFlg=false;
				 $scope.refresh();
			 }
		}, function(error) {
			alert(error);
			console.log(error);
		});
	}
	
	$scope.deleteAppliance=function(row)
	{
		console.log("delete Data"+angular.toJson($scope.appliance));
		
		$scope.appliance={
				"id":row.id,
				"serialno":row.serialno,
				"brand":row.brand,
				"model":row.model,
				"broughtdte":row.broughtdte,
				"status":row.status
			};
	
		$http.put('http://localhost:9091/houseHoldApplianceService/appliance/delete',$scope.appliance).then(function(response) 
		{
			 if(response.status=='200')
			 {
				 $scope.succMsg="Deleted Successfully";	
				 $scope.errMsg=null;
				 $scope.appliance;
				 $scope.applianceList=[];
				 $scope.refereshData();
				 $scope.btnFlg=false;
				 $scope.refresh();
			 }
		}, function(error) {
			alert(error);
			console.log(error);
		});
	}
	
	$scope.inactiveAppliance=function(row)
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
	
		$http.post('http://localhost:9091/houseHoldApplianceService/appliance/inactive',$scope.appliance).then(function(response) 
		{
			 if(response.status=='200')
			 {
				 $scope.succMsg="Inactice Successfully";	
				 $scope.errMsg=null;
				 $scope.appliance;
				 $scope.applianceList=[];
				 $scope.refereshData();
				 $scope.refresh();
				 $scope.btnFlg=false;
			 }
		}, function(error) {
			alert(error);
			console.log(error);
		});
	}

	$scope.refresh=function()
	{
		$scope.appliance={
				"serialno":"",
				"brand":"",
				"model":"",
				"broughtdte":"",
				"status":""
			};
		$scope.flg=false;
		$scope.flag=false;
		$scope.errMsg=null;
		$scope.succMsg=null;
		$scope.brandList=[];
		$scope.modelList=[];
		$scope.applianceList=[];
		
		$scope.btnFlg=false;
		$scope.tableFlg=false;
		$scope.refereshData();
		$scope.fetchData();
		$scope.searchdata="";
	}
	
});

