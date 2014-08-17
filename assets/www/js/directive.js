'use strict';

/* Filters */



angular.module('sayFilters', []).filter('checkSubscription', function() {
  return function(input) {
    return input ? 'subscribe' : 'unsubscribe';
  };
});



angular.forEach(hmGestures, function(name){
  var directive = name.split(':'),
      directiveName = directive[0],
      eventName = directive[1];

  sayApp.directive(directiveName, ['$parse', '$window', function($parse, $window){
    return {
      restrict: 'A, C',
      link: function(scope, element, attr) {
        var expr = $parse(attr[directiveName]),
            fn = function(event){
              scope.$apply(function() {
                expr(scope, {$event: event});
              });
            },
            opts = $parse(attr['hmOptions'])(scope, {}),
            hammer;

        if (typeof Hammer === 'undefined' || !$window.addEventListener) {
          // fallback to mouse events where appropriate
          if (directiveName === 'hmTap') {
            element.bind('click', fn);
          }
          if (directiveName === 'hmDoubletap') {
            element.bind('dblclick', fn);
          }
          return;
        }

        // don't create multiple Hammer instances per element
        if (!(hammer = element.data('hammer'))) {
          hammer = Hammer(element[0], opts);
          element.data('hammer', hammer);
        }

        // bind Hammer touch event
        hammer.on(eventName, fn);

        // unbind Hammer touch event
        scope.$on('$destroy', function(){
          hammer.off(eventName, fn);
        });

      }
    };
  }]);
});


angular.module('scrolled', []).directive('scrolled', function($window) {
	  return {
		restrict: 'A', //attribute only
		link: function(scope, elem, attr, ctrl) {
			 var raw = elem[0];
			 var i = 0;
			 elem.bind('scroll', function(e) {
			   if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
				 scope.$apply(attr.scrolled);
			   }
			 });
	    }
      };
});

