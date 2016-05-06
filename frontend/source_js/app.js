var app = angular.module('project', ['ngRoute', 'projectControllers', 'projectServices', 'apiServices', 'ngFileUpload', 'angular-img-cropper', 'xeditable']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'homeController'
  }).
  when('/users/:username', {
    templateUrl: 'partials/userProfile.html',
    controller: 'profileController'
  }).
  when('/login', {
    templateUrl: 'partials/Login.html',
    controller: 'loginController'
  }).
  when('/search', {
    templateUrl: 'partials/search.html',
    controller: 'searchController'
  }).
  otherwise({
    redirectTo: '/login'
  });
} ]);
