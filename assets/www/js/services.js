     

var sayServices = angular.module('sayServices', ['ngResource']);
sayApp.factory("DataService",
  ['$resource', 
  function ($resource) {
	  
    // create shopping cart
	var mainController = angular.element(document.getElementsByTagName('body'));
	var scope = mainController.scope();
	globalScope = scope;
	
	 return{
       makeRequest: function(url,callback,queryParams){ 
	       //scope.$broadcast('progress',{"loading":true});
	       var api = $resource(url, {}, {
              query: {method:'GET', isArray:false}
           });
		   
		   api.query(queryParams,function (data) {
              callback(data);
			  //scope.$broadcast('progress',{"loading":false});
           });
	   }
	 };
}]);


///////////////
//audio player
///////////////

sayApp.factory('player',
['audio', '$rootScope', 
 function(audio, $rootScope) {

  var player,
      playlist = [],
      paused = false,
	  que = [],
      current = {
        mixtape: 0,
        track: 0
       };

   player = {
     playlist: playlist,
     current: current,
     playing: false,
	 que: que,
	 
     play: function(track, mixtape) {
		 
        //if (!playlist.length) return;
        //if (angular.isDefined(track))
		 current.track = track;
        //if (angular.isDefined(mixtape)) current.mixtape = mixtape;
        audio.src = playlist[current.mixtape].tracks[current.track].user_voice;
		audio.play();
		player.playing = true;
		paused = false;	 
		console.log(mixtape);

     },

      pause: function() {
        if (player.playing) {
          audio.pause();
          player.playing = false;
          paused = true;
        }
      },

      reset: function() {
        player.pause();
        current.mixtape = 0;
        current.track = null;
      },

      next: function() {
        if (!playlist.length) return;
        paused = false;
        if (playlist[current.mixtape].tracks.length > (current.track + 1)) {
           current.track++;
        }else{
			player.reset();
        }
        if (player.playing) player.play();
      },

      previous: function() {
        if (!playlist.length) return;
        paused = false;
        if (current.track > 0) {
          current.track--;
        }else{
          current.mixtape = (current.mixtape - 1 + playlist.length) % playlist.length;
          current.track = playlist[current.mixtape].tracks.length - 1;
        }
        if (player.playing) player.play();
      }
    };

    playlist.add = function(mixtape) {
      if (playlist.indexOf(mixtape) != -1) return;
	  playlist.length = 0;
      playlist.push(mixtape);
	  current.track = null;
	  //console.log(playlist[0].tracks);
    };

    playlist.remove = function(mixtape) {
      var index = playlist.indexOf(mixtape);
      if (index == current.mixtape) player.reset();
	  audio.src = 0;
	  console.log();
      playlist.splice(index, 1);
    };

    audio.addEventListener('ended', function() {
		 current.track = null;
         $rootScope.$apply(player.reset);
    }, false);

    return player;
  }]);


  // extract the audio for making the player easier to test
  sayApp.factory('audio', function($document) {
    var audio = $document[0].createElement('audio');
    return audio;
  });
  