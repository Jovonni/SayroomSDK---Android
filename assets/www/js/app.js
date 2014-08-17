'use strict';

// App Module: the name Angularsay matches the ng-app attribute in the main <html> tag
// the route provides parses the URL and injects the appropriate partial page
var sayApp = angular.module('sayApp', [
  'ngRoute',
  'ngSanitize',
  'sayServices',
  'sayFilters',
  'sayControllers',
  'scrolled'
  
  ]), 
  
  hmGestures = ['hmHold:hold',
                  'hmTap:tap',
                  'hmDoubletap:doubletap',
                  'hmDrag:drag',
                  'hmDragstart:dragstart',
                  'hmDragend:dragend',
                  'hmDragup:dragup',
                  'hmDragdown:dragdown',
                  'hmDragleft:dragleft',
                  'hmDragright:dragright',
                  'hmSwipe:swipe',
                  'hmSwipeup:swipeup',
                  'hmSwipedown:swipedown',
                  'hmSwipeleft:swipeleft',
                  'hmSwiperight:swiperight',
                  'hmTransform:transform',
                  'hmTransformstart:transformstart',
                  'hmTransformend:transformend',
                  'hmRotate:rotate',
                  'hmPinch:pinch',
                  'hmPinchin:pinchin',
                  'hmPinchout:pinchout',
                  'hmTouch:touch',
                  'hmRelease:release'];
				  
  sayApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/say', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
	  
	  when('/say/tutorial', {
        templateUrl: 'partials/tutorial.html',
        controller: 'TutorialCtrl'
      }).
	  
	  when('/say/profile', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl'
      }).
	  
      otherwise({
        redirectTo: '/say'
      });
}]);

// create a data service that provides a say and a shopping cart that
// will be shared by all views (instead of creating fresh ones for each view).
