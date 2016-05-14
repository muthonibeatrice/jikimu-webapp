angular.module('starter.routes', [])
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('home', {
    url: '/',
    cache:false,
        templateUrl: 'home.html',
        controller: 'homeCtrl'
      
    
  })
    .state('labtest', {
    url: 'labtest',
    templateUrl: 'templates/labtest.html',
  })