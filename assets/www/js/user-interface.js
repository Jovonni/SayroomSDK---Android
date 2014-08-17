
/////User interface class

function UserInterface(){

	'use strict';
    
						  
	var doc = document.getElementById( 'doc' ),
	    pane = doc.querySelector( 'div.side-pane' ),
		scrollable = doc.querySelector( 'div.container' ),
		overlay = doc.querySelector( 'div.overlay' ),
		
		//side pane inner panes
		recordPane = doc.querySelector( 'div.record-pane' ),
		vocalizationsPane = doc.querySelector( 'div.vocalizations-pane' ),
		brandListPane = doc.querySelector( 'div.brand-list-pane' ),
		taskPane = doc.querySelector( 'div.task-pane' ),
		
		//inner panes contents
		speakableImage = doc.querySelector( 'img.speakable' ),
		speakableName = doc.querySelector( 'p.rec-name' ),
		stopButton = doc.querySelector( 'div.stop-button' ),
		
	
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[Modernizr.prefixed( 'transition' )];
	
  
	    this.init = function() {
		homeScope = doc;
	     var brandImageWidth = window.innerWidth;
		 scrollable.style.height = window.innerHeight+"px";
         //document.getElementById('body').style.height = docHeight+"px";	
		 classie.remove(document.getElementById('top-bar'),'up');	
		 var paneWidth = pane.offsetWidth;
		 var paneImageWidth = paneWidth - 40;
		 
		 this.addCSSRule(document.styleSheets[1], ".image-box", "height:"+brandImageWidth+"px", 0);
		 this.addCSSRule(document.styleSheets[1], ".image-container", "height:"+paneImageWidth+"px", 0);
		 
		 this.progressButtons = [];
		 this.currentInterval;
		 this.currentInstance;
		 
		 var self = this;
		 //recording progress indicator
		 [].slice.call( document.querySelectorAll( '.progress-button' ) ).forEach( function( bttn, pos ) {
			self.progressButtons.push ( new UIProgressButton( bttn, {
					callback : function( instance ) {
						var progress = 0;
						var	interval = setInterval( function() {
								progress = Math.min( progress + .035 * 0.1, 1 );
								instance.setProgress( progress );
								 window.SC(homeScope).countDown(Math.round(10*progress)/10);
								if( progress === 1 ) {
									instance.stop( pos === 1 || pos === 3 ? -1 : 1 );
									clearInterval( interval );
									
								}
							}, 30 );
							
							self.currentInstance = instance;
							self.currentInterval = interval;
					    }
				  }));
			 });
			
		 }
		 
		 this.clearProgress = function(){
			 this.currentInstance.stop(1);
   		     clearInterval(this.currentInterval);
			 	 for (var i = 0; i < timeouts.length; i++) {
					clearTimeout(timeouts[i]);
				}
				//quick reset of the timer array just cleared
				timeouts = [];
		 }
			
			
			
			this.openSidePane = function(ev){
			  ev.preventDefault();
			  ev.stopPropagation();
			  classie.add(doc, 'open');
			}
			
			this.closeSidePane = function(ev){
			  this.reset();
			}
	
		this.prepareRecording = function(purpose){
			if(purpose == "image"){
			   this.beginImageRecord(); 
			}else{
			   this.beginRunnerRecord();
			}
		}
		
		this.beginImageRecord = function(){
		  var indicator = doc.querySelector('span.indicator');
		  var self = this,
			loadView = function() {
				// simulating loading...
				setTimeout( function() {
					
					self.progressButtons[0]._submit(null,{
					 callback : function() {
						 
					  classie.remove( indicator, 'show' );
					  classie.remove( speakableImage, 'hide' );
					  classie.remove( speakableName, 'hide' );
					  classie.remove( stopButton, 'hide' );
					  classie.remove( self.progressButtons[0].el, 'hide' ); 
					 
					 }});
				}, 1000 );
				
				classie.add(  indicator, 'show' );
				classie.add( speakableImage, 'hide' );
				classie.add( speakableName, 'hide' );
				classie.add( stopButton, 'hide' );
				classie.add( self.progressButtons[0].el, 'hide' );
			};
			loadView();
		}
		
		this.beginRunnerRecord = function(){

		}
		
		this.recordPaneTearDown = function(){
			//classie.add( this.progressButtons[0].el, 'hide' );
			classie.add( stopButton, 'hide' );
			classie.add( speakableImage, 'hide' );
			classie.add( speakableName, 'hide' );
		}
		
		
		this.prepareVocalizations = function(){
			var trackContainer = vocalizationsPane.querySelector( 'div.vocalizations' );
			classie.add(trackContainer, 'show');
		}
		
		
		this.vocalizationsPaneTearDown = function(){
		   var trackContainer = vocalizationsPane.querySelector( 'div.vocalizations' );
			classie.remove(trackContainer, 'show');
		}
		
		
		
		this.preparetask = function(){
			var paneWidth = pane.offsetWidth;
		    var paneImageWidth = paneWidth - 40;
			var overlay = taskPane.querySelector( 'img.img-overlay' );
			overlay.style.width = paneImageWidth+"px";
			overlay.style.height = paneImageWidth+"px";
		}
		
		
		
		this.addCSSRule = function(sheet, selector, rules, index) {
			if(sheet.insertRule) {
				console.log(sheet);
				sheet.insertRule(selector + "{" + rules + "}", index);
			}
			else {
				sheet.addRule(selector, rules, index);
			}
		}
       
		
	this.reset = function() {
		classie.remove( doc, 'open' );
	}
	
	this.init();
	}
