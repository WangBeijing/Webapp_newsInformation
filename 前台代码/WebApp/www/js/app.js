var app = angular.module('starter', ['ionic'])
app.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if(window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})
app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('tab', {
			url: '/tab',
			views: {
				'homepage': {
					templateUrl: 'templates/homepage.html',
					abstract: true
				}
			}
		})
		.state('tab.tj', {
			url: '/tj',
			views: {
				'tab-tj': {
					templateUrl: 'templates/tab-tj.html'
				}
			}
		})
		.state('tab.search', {
			url: '/search',
			views: {
				'tab-tj': {
					templateUrl: 'templates/search.html',
				}
			}
		})
		.state('tab.sl', {
			url: '/sl',
			views: {
				'tab-tj': {
					templateUrl: 'templates/search-list.html',
					controller:"search",
				  
				}
			}
		})
		
		.state('tab.sy', {
			url: '/sy',
			views: {
				'tab-tj': {
					templateUrl: 'templates/tab-sy.html'
				}
			}
		})
		.state('tab.Details', {
			url: '/Details',
			views: {
				'tab-tj': {
					templateUrl: 'templates/Details.html'
				}
			}
		})
		.state('tab.yd', {
			url: '/yd',
			views: {
				'tab-tj': {
					templateUrl: 'templates/tab-yd.html'
				}
			}
		})
		.state('tab.qd', {
			url: '/qd',
			views: {
				'tab-tj': {
					templateUrl: 'templates/tab-qd.html'
				}
			}
		})
		.state('tab.xs', {
			url: '/xs',
			views: {
				'tab-tj': {
					templateUrl: 'templates/tab-xs.html'
				}
			}
		})
		.state('nav', {
			url: '/nav',
			views: {
				'homepage': {
					templateUrl: 'templates/left-nav.html',
					abstract: true
				}
			}
		})
		.state('nav.n', {
			url: '/n',
			views: {
				'nav-tj': {
					templateUrl: 'templates/tab-tj.html',
				},
				'nav-xs': {
					templateUrl: 'templates/tab-xs.html',
				},
				'nav-sy': {
					templateUrl: 'templates/tab-sy.html',
				},
			
				'nav-yd': {
					templateUrl: 'templates/tab-yd.html',
				},
				'nav-qd': {
					templateUrl: 'templates/tab-qd.html',
				}
			}
		})
		.state('tab.resume', {
			url: '/resume',
			views: {
				'tab-tj': {
					templateUrl: 'templates/resume.html',
				}
			}
		})
		.state('tab.classify', {
			url: '/classify',
			views: {
				'tab-tj': {
					templateUrl: 'templates/classify.html',
				}
			}
		})
		.state('tab.Share', {
			url: '/Share',
			views: {
				'tab-tj': {
					templateUrl: 'templates/Share.html',
				}
			}
		})
	$urlRouterProvider.otherwise('/tab/tj');
});
var url  = "http://54.218.48.62:3020"
