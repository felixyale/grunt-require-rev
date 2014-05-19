'use strict';

define([
  'angular-route',
  'app'
], function (ngRoute, app) {
  
  var defaultRoutePath = '/';
  
  var routes = {
    
    '/': {
      templateUrl: 'views/top.html',
      dependencies: [
        'controllers/top',
        'css!/styles/top'
      ]
    },
    '/apps': {
      templateUrl: 'views/apps.html',
      dependencies: [
        'controllers/apps',
        'css!/styles/apps'
      ]
    },
    '/about': {
      templateUrl: 'views/about.html',
      dependencies: [
        'controllers/about',
        'css!/styles/about'
      ]
    }
    
  };
  
  var dependencyResolver = function(dependencies) {
    return {
      resolver: ['$q','$rootScope', function($q, $rootScope) {
        var deferred = $q.defer();

        require(dependencies, function() {
          $rootScope.$apply(function() {
            deferred.resolve();
          });
        });

        return deferred.promise;
      }]
    };
  };
  
  app.config(['$routeProvider', function($routeProvider) {
    
    angular.forEach(routes, function(route, path) {
      $routeProvider.when(path, {
        templateUrl:route.templateUrl, 
        resolve:dependencyResolver(route.dependencies)
      });
    });
    
    $routeProvider.otherwise({redirectTo:routes.defaultRoutePaths});
    
  }]);
  
});
