'use strict';

// - cart: the shopping cart object
// - say: contains the product list
// - list_of_says: the says list

var sayControllers = angular.module('sayControllers', []);

sayControllers.controller('MainCtrl', 
 ['$scope', 'player', '$routeParams', 'DataService', '$resource','$location',
 function($scope, player, $routeParams, DataService, $resource, $location) {

//////// //////////
//user information
///////////////////

   //user id
  $scope.user_id = $location.search().UserID;
  if($scope.user_id == "" || $scope.user_id == undefined) $scope.user_id = 17;
  
  $scope.getUserInfo = function(){
	  DataService.makeRequest(userInfo,function (data) {
		   $scope.user = new user(data.user_by_id);
      },{UserID:$scope.user_id ,cache:false});
  }
  
  $scope.setRunnerBrandsPane = function(ev){
	   $scope.$broadcast('brandsPane',{"event":ev});
	}
}]);




sayControllers.controller('TutorialCtrl', 
  ['$scope', '$routeParams', 'DataService', '$resource','$location',
  function($scope,  $routeParams, DataService, $resource, $location) {
	  
	  $scope.tutorial = new tutorial();
	  
	  $scope.fetchBrandsToSubscribe = function(){
	    DataService.makeRequest(brandSubscriptionList,function (data) {
		   $scope.list_of_subscriptions = new subscriptionList(data.subscriptions_by_id);
      },{UserID:$scope.user_id ,cache:false});
	  }
	  
	  $scope.subscribeToBrand = function(list_object){
	    list_object.subscribed = true;
	    DataService.makeRequest(subscribe,function (data){},{UserID:user_id,BrandID:list_object.id});
	  }
	  
	  $scope.subscribeSuccess = function(list_object){
	    return list_object.subscribed;
	  }
	  
	  $scope.enterSayRoom = function(){
	   $scope.tutorial.endTutorial();
	   $scope.tutorial = null;
	   $location.path('/say/home');
	   $scope.$apply();
	  }
	  
	  $scope.fetchBrandsToSubscribe();
	 
}]); 


sayControllers.controller('HomeCtrl', 
  ['$scope','player', '$routeParams', 'DataService', '$resource','$location',
  function($scope, player, $routeParams, DataService, $resource, $location) {
	
////////////////////////////
//set user interface object 
///////////////////////////

  $scope.UI = new UserInterface();
    
///////////////////////////////////////////
//say list & say list items (left side)
///////////////////////////////////////////
   
   $scope.isRecording;
   $scope.player = player;
   
   //list object Ivars 
   $scope.list_of_images;
   $scope.list_of_vocalizations;
   $scope.list_of_brands;
   
   
   //side pane view states
   $scope.recordPane;
   $scope.vocalizationsPane;
   $scope.brandListPane;
   $scope.taskPane;
   
   
            /*-----> LIST OBJECT CREATION <----*/
   
   //create list of images by user location
   $scope.createListOfImages = function(){
	   DataService.makeRequest(imagesList,function (data) {
		   $scope.list_of_images = new brandImagesList(data.images_by_id); 
      },{UserID:$scope.user_id ,cache:false});
   };
   
   $scope.isSpokenOn = function(vocalized){
	 return vocalized;
	}
   
   //create list of brands for runners by user location
   $scope.createListOfBrands = function(callback){
	   DataService.makeRequest(brandList,function (data) {
		   $scope.list_of_brands = new runnerBrandsList(data.brands_by_id); 
      },{UserID:$scope.user_id ,cache:false});
	  setTimeout(function(){callback()},500);
   };
   
   
         /*-----> SIDE PANE VISIBILITY STATE <----*/
	
	//slide side pane right	 
	$scope.revealSidePane = function(ev){
	  $scope.UI.openSidePane(ev); 
	}
	
	
	//slide side pane left
	$scope.hideSidePane = function(){
		if($scope.isRecording)return;
	  $scope.recordPane = $scope.vocalizationsPane = $scope.brandListPane = $scope.taskPane = false;
	  $scope.UI.closeSidePane();
	  if(player.playlist.length){
		$scope.UI.vocalizationsPaneTearDown();
	    player.playlist.remove(0);
		
	  }
	  searchField.disabled = true;
	}
	
   
   
         /*-----> INNER SIDE PANE CONFIGURATION <----*/
   
   ///set inner side pane for Image recording  
   $scope.setRecordPane = function( list_object, list_object_id, ev ){
	if(list_object.vocalized) return;
	list_object.vocalized = true;
	$scope.isRecording = true;
	$scope.revealSidePane(ev);
	$scope.selectedId = list_object_id;
	$scope.selectedImage = list_object.image;
	$scope.selectedtext = list_object.name;
	$scope.vocalizationsPane = $scope.brandListPane = $scope.taskPane = false;
	$scope.recordPane = true;
	$scope.UI.prepareRecording('image');
	//$scope.nativeBridge.beginRecordingSession();
	DataService.makeRequest(vocalizations,function (data){
		player.playlist.add(data.vocalizations.results);
		},{ImageID:list_object_id});
   } 
   
   
    //set inner side pane for vocalizations
   $scope.setVocalizationsPane = function( list_object_id ){
	   $scope.isRecording = false;
	   //$scope.nativeBridge.stopRecordingWithImageID(list_object_id);
    if($scope.recordPane){
	 $scope.count = 10;
	 $scope.recordPane = $scope.brandListPane = $scope.taskPane = false;
	 $scope.vocalizationsPane = true;
	 setTimeout(function(){$scope.UI.prepareVocalizations()});
	  $scope.$apply();
	 }
   } 
   
   
   $scope.$on('brandsPane', function(event, data){
		$scope.setBrandsPane(data.event);    
    });
   
   //set inner side pane for brand list
   $scope.setBrandsPane = function(ev){
	$scope.recordPane = $scope.vocalizationsPane = $scope.taskPane = false;
	$scope.brandListPane = true;
	$scope.revealSidePane(ev);
	$scope.createListOfBrands(function(){
	searchField.disabled = false;	
	});
	
   }
   
   
   //set inner side pane for brand task 
   $scope.setTaskPane = function( list_object ){
	$scope.recordPane = $scope.vocalizationsPane = $scope.brandListPane = false;
	$scope.taskPane = true;
	$scope.task = list_object;
	$scope.UI.preparetask();
	$scope.count = 10;
	searchField.disabled = true;
	
   }
   
   $scope.beginTaskRecording = function(task_id){
	if($scope.taskPane){
	 if($scope.task.vocalizations == 0){
	   $scope.underLyingText = "This task is no longer accepting reactions";
	   return;
	 }
     $scope.isRecording = true;
	//$scope.nativeBridge.beginRecordingSession();
    }
   }
   
   $scope.updateTaskCompletion = function(){
	$scope.isRecording = false;
	//$scope.nativeBridge.stopRecordingWithTaskId(task_id);
	$scope.task.vocalizations--;
	$scope.task.captured++;
	 if($scope.task.requirement - $scope.task.captured == 0 ){
	    $scope.underLyingText = "Congradulations You've Completed the task";
	 }
	 $scope.count = 10;
	 $scope.$apply();
	}
	
	
	//on view brands button clicked 	  
   $scope.BrandButtonClicked = function(){
	 $scope.abruptRecordingStop();
	 $scope.taskPane = false;
	 $scope.brandListPane = true;
	 setTimeout(function(){searchField.disabled = false},300);
   }
   
   
   $scope.countDown = function(count){
	   console.log(count*10/.5);
	   $scope.count =  count*10 + 10 - count*10 /.5; 
	   $scope.$apply(); 
    }
   
   $scope.abruptRecordingStop = function(){
       if($scope.isRecording){
		  $scope.isRecording = false;
		if($scope.recordPane){
		$scope.UI.recordPaneTearDown();
		//$scope.nativeBridge.stopRecordingWithImageID(list_object_id);
		}else if($scope.taskPane){
		 //$scope.nativeBridge.stopRecordingWithTaskId("");
		}
		$scope.UI.clearProgress();
   }
	  
	}
   
   
         /*-----> SIDE PANE HEADER ACTIONS  <----*/
   
   //search
    var input;
    var searchField = document.getElementById('search');
	$scope.getInput = function(){
	  input = searchField.value;
	  if(input == "")$scope.createListOfBrands();
	  DataService.makeRequest(brandSearch,function (data) {
	  if(data.search_by_brand.code != '0')$scope.list_of_brands = new runnerbrandList(data.search_by_brand);
      },{Input:input});
	} 
	
	
	
	//runner recording
	$scope.runnerRecord = function(){
	 $scope.UI.prepareRecording('runner');  	
	}
	
	//runer sign up
	$scope.runnerSignUp = function(){
	 //$scope.nativeBridge.displayRunnerRegistration();
	}
	
	//return to brand list
	$scope.returnToBrandList = function(){
	 //$scope.nativeBridge.stopRecording();
	 $scope.recordPane = $scope.vocalizationsPane = $scope.taskPane = false;
	 $scope.brandListPane = true
	}
   
   
        /*-----> INNER SIDE PANE VISIBILITY STATE <----*/
   
   //return pane visibilty
   $scope.revealPane = function(pane){
     return pane;
   }
   
   
   
         /*-----> NAVIGATION BAR BUTTON ACTIONS <----*/
	
   
   
///////////////////////////
//load list items on scroll
////////////////////////////

    //load more on scroll
	$scope.loadMore = function(contentType) {
	  if(contentType == 'images'){
	    $scope.list_of_images.loadBrandImageSet($scope.list_of_images.brand_image_list_items);
	  }else if(contentType == 'brands'){
	    $scope.list_of_brands.loadRunnerBrandSet($scope.list_of_brands.runner_brand_list_items);
	  }
    }

	//init user say & list of says
	$scope.createListOfImages();
	
}]); 




sayControllers.controller('ProfileCtrl', 
  ['$scope', '$routeParams', 'DataService', '$resource','$location',
  function($scope,  $routeParams, DataService, $resource, $location) {
	  $scope.currentTab;
	  $scope.incentiveTab;
	  $scope.taskTab;
	  $scope.subscriptionTab;
	  
	  $scope.showCollectedIncentives = function(){
		  $scope.currentTab = "incentives";
		  $scope.incentiveTab = true;
		  $scope.taskTab = $scope.subscriptionTab = false;
		  DataService.makeRequest(incentivesList,function (data) {
		   $scope.list_of_incentives = new IncentiveList(data.incentives_by_id); 
          },{UserID:$scope.user_id ,cache:false});
		  $scope.indicatorText = "Redeemable Incentives: 12"
	  }
	  
	  $scope.showCompletedTask = function(){
		  $scope.currentTab = "tasks";
		  $scope.taskTab = true;
		  $scope.incentiveTab = $scope.subscriptionTab = false;
		  /*DataService.makeRequest(incentivesList,function (data) {
		   $scope.list_of_incentives = new IncentiveList(data.incentives_by_id); 
          },{UserID:$scope.user_id ,cache:false});
		  */
		  $scope.indicatorText = "Completed Runner Tasks: 9"
	  }
	  
	  $scope.showSubscriptionList = function(){
	  $scope.currentTab = "subscriptions";
		  $scope.subscriptionTab = true;
		  $scope.incentiveTab = $scope.taskTab = false;
		  /*DataService.makeRequest(incentivesList,function (data) {
		   $scope.list_of_incentives = new IncentiveList(data.incentives_by_id); 
          },{UserID:$scope.user_id ,cache:false});
		  */
	  }
	  $scope.indicatorText = "Brands you're subscribed to"
	  $scope.revealTabContent = function(tab){
	    return tab;
	  }
	  
	  $scope.showCollectedIncentives();
	 

}]); 