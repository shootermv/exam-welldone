
// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
angular.module('locationsApp', ['ngAnimate', 'ui.router', 'ngTouch', 'growlNotifications',  'localytics.directives', 'ngCordova'])
.run(
  [          '$rootScope', '$state', '$stateParams', 
    function ($rootScope,   $state,   $stateParams) {

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    }
  ]
)
.constant('storageKey', 'locationsApp')
// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {
    var categories  = ['categoriesSvc', function(categoriesSvc){ 
	  return categoriesSvc.list();
	}]
    $stateProvider 
    
        //categories
        .state('category', {
            url: '/category',
            templateUrl: 'views/category.html',
            controller: 'categoryCtrl'
        })
 
        .state('category.new', {
            url: '/new',
            templateUrl: 'views/category-add.html'
        })

        .state('category.list', {
            url: '/list',
            templateUrl: 'views/category-list.html'
        })
        
        .state('category.edit', {
            url: '/edit/:id',
            templateUrl: 'views/category-add.html'
        })

        .state('category.delete', {
            url: '/delete',
            templateUrl: 'views/delete-category-confirm.html'
        })

        //locations
        .state('location', {
            url: '/location',
            templateUrl: 'views/location.html',
            controller: 'locationCtrl',
			resolve:{
				categories:categories
			}
        })
        
         .state('location.new', {
            url: '/new',
            templateUrl: 'views/location-add.html',

        })
     
        .state('location.list', {
            url: '/list',
            templateUrl: 'views/location-list.html',
           // controller:'locationListCtrl'
        })
        
        .state('location.edit', {
            url: '/edit/:id',
            templateUrl: 'views/location-add.html'
        })

        .state('location.delete', {
            url: '/delete',
            templateUrl: 'views/delete-location-confirm.html'
        })
    $urlRouterProvider.otherwise('/category/list');
})