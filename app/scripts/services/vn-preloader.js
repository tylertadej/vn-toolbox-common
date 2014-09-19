/**
 * @ngdoc service
 * @name Volusion.toolboxCommon.vnImagePreloader
 *
 * @description
 * *
 * # vnImagePreloader *
 * Preloading the image binaries using a Preload service. The Preload service takes an array of source values
 * and returns a promise. The promise is resolved when all of the image binaries have been preloaded.
 *
 * - Ben Nadel
 * http://www.bennadel.com/blog/2597-preloading-images-in-angularjs-with-promises.htm
 */

angular.module('Volusion.toolboxCommon')
	.factory('vnImagePreloader', ['$q', '$rootScope',
		function( $q, $rootScope ) {

			'use strict';

			/**
			 * @ngdoc function
			 * @name VnPreloader
			 * @methodOf Volusion.toolboxCommon.vnImagePreloader
			 *
			 * @description
			 * Manage the preloading of image objects. Accepts an array of image URLs.
			 **/
			function VnPreloader( imageLocations ) {

				// I am the image SRC values to preload.
				this.imageLocations = imageLocations;

				// As the images load, we'll need to keep track of the load/error
				// counts when announing the progress on the loading.
				this.imageCount = this.imageLocations.length;
				this.loadCount = 0;
				this.errorCount = 0;

				// I am the possible states that the preloader can be in.
				this.states = {
					PENDING: 1,
					LOADING: 2,
					RESOLVED: 3,
					REJECTED: 4
				};

				// I keep track of the current state of the preloader.
				this.state = this.states.PENDING;

				// When loading the images, a promise will be returned to indicate
				// when the loading has completed (and / or progressed).
				this.deferred = $q.defer();
				this.promise = this.deferred.promise;
			}

			// ---
			// STATIC METHODS.
			// ---

			/**
			 * @ngdoc function
			 * @name preloadImages
			 * @methodOf Volusion.toolboxCommon.vnImagePreloader
			 *
			 * @description
			 * reload the given images [Array] and return a promise. The promise
			 * will be resolved with the array of image locations.
			 **/
			VnPreloader.preloadImages = function( imageLocations ) {

				var preloader = new VnPreloader( imageLocations );

				return( preloader.load() );
			};

			// INSTANCE METHODS.
			VnPreloader.prototype = {

				// Best practice for 'instnceof' operator.
				constructor: VnPreloader,

				// PUBLIC METHODS.

				/**
				 * @ngdoc function
				 * @name preloadImages
				 * @methodOf Volusion.toolboxCommon.vnImagePreloader
				 *
				 * @description
				 * Determine if the preloader has started loading images yet.
				 **/
				isInitiated: function isInitiated() {
					return( this.state !== this.states.PENDING );
				},

				/**
				 * @ngdoc function
				 * @name preloadImages
				 * @methodOf Volusion.toolboxCommon.vnImagePreloader
				 *
				 * @description
				 * Determine if the preloader has started loading images yet.
				 **/
				// I determine if the preloader has failed to load all of the images.
				isRejected: function isRejected() {
					return( this.state === this.states.REJECTED );
				},

				/**
				 * @ngdoc function
				 * @name preloadImages
				 * @methodOf Volusion.toolboxCommon.vnImagePreloader
				 *
				 * @description
				 * Determine if the preloader has started loading images yet.
				 **/
				// I determine if the preloader has successfully loaded all of the images.
				isResolved: function isResolved() {
					return( this.state === this.states.RESOLVED );
				},

				/**
				 * @ngdoc function
				 * @name preloadImages
				 * @methodOf Volusion.toolboxCommon.vnImagePreloader
				 *
				 * @description
				 * Determine if the preloader has started loading images yet.
				 **/
				// I initiate the preload of the images. Returns a promise.
				load: function load() {
					// If the images are already loading, return the existing promise.
					if ( this.isInitiated() ) {
						return( this.promise );
					}

					this.state = this.states.LOADING;

					for ( var i = 0 ; i < this.imageCount ; i++ ) {
						this.loadImageLocation( this.imageLocations[ i ] );
					}

					// Return the deferred promise for the load event.
					return( this.promise );
				},

				// PRIVATE METHODS.

				/**
				 * @ngdoc function
				 * @name preloadImages
				 * @methodOf Volusion.toolboxCommon.vnImagePreloader
				 *
				 * @description
				 * Determine if the preloader has started loading images yet.
				 **/
				// I handle the load-failure of the given image location.
				handleImageError: function handleImageError( imageLocation ) {
					this.errorCount++;

					// If the preload action has already failed, ignore further action.
					if ( this.isRejected() ) {
						return;
					}

					this.state = this.states.REJECTED;

					this.deferred.reject( imageLocation );
				},

				/**
				 * @ngdoc function
				 * @name preloadImages
				 * @methodOf Volusion.toolboxCommon.vnImagePreloader
				 *
				 * @description
				 * Determine if the preloader has started loading images yet.
				 **/
				// I handle the load-success of the given image location.
				handleImageLoad: function handleImageLoad( imageLocation ) {
					this.loadCount++;

					// If the preload action has already failed, ignore further action.
					if ( this.isRejected() ) {
						return;
					}

					// Notify the progress of the overall deferred. This is different
					// than Resolving the deferred - you can call notify many times
					// before the ultimate resolution (or rejection) of the deferred.
					this.deferred.notify({
						percent: Math.ceil( this.loadCount / this.imageCount * 100 ),
						imageLocation: imageLocation
					});

					// If all of the images have loaded, we can resolve the deferred
					// value that we returned to the calling context.
					if ( this.loadCount === this.imageCount ) {
						this.state = this.states.RESOLVED;
						this.deferred.resolve( this.imageLocations );
					}
				},

				/**
				 * @ngdoc function
				 * @name preloadImages
				 * @methodOf Volusion.toolboxCommon.vnImagePreloader
				 *
				 * @description
				 * Determine if the preloader has started loading images yet.
				 **/
				// I load the given image location and then wire the load / error
				// events back into the preloader instance.
				// --
				// NOTE: The load/error events trigger a $digest.
				loadImageLocation: function loadImageLocation( imageLocation ) {
					var preloader = this;

					// When it comes to creating the image object, it is critical that
					// we bind the event handlers BEFORE we actually set the image
					// source. Failure to do so will prevent the events from proper
					// triggering in some browsers.
					var image = $( new Image() )
						.load(function( event ) {

							// Since the load event is asynchronous, we have to
							// tell AngularJS that something changed.
							$rootScope.$apply(
								function() {
									preloader.handleImageLoad( event.target.src );

									// Clean up object reference to help with the
									// garbage collection in the closure.
									preloader = image = event = null;
								}
							);
						})
						.error(
						function( event ) {

							// Since the load event is asynchronous, we have to
							// tell AngularJS that something changed.
							$rootScope.$apply(
								function() {
									preloader.handleImageError( event.target.src );

									// Clean up object reference to help with the
									// garbage collection in the closure.
									preloader = image = event = null;
								}
							);
						})
						.prop( 'src', imageLocation );
				}
			};

			// Return the factory instance.
			return( VnPreloader );

		}]);
