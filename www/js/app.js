// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ui.router','firebase','starter.controllers','starter.services'])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  // Ionic uses AngularUI Router which uses the concept of stateses
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $stateProvider

  .state('home', {
    url: '/',
    cache:false,
    views:{
      "main@":{
        templateUrl: 'home.html',
        controller: 'homeCtrl'
      }
    }
        
      
    
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })


  .state('patients', {
    url: '/patients',
    cache:false,

        templateUrl: 'patientmain.html'
        // controller: 'patientdetailsCtrl'
      
    
  })
  .state('patients.details', {
    url: '/details/:id',
    cache:false,
    views:{
      "main@":{

        templateUrl: 'patientdetails.html',
        controller: 'patientdetailsCtrl'
      }
    }
      
    
  })

  .state('results', {
    url: '/details/results/:id',
    cache:false,
    views:{
      "main@":{

        templateUrl: 'results.html',
        controller: 'resultsCtrl'
      }
    }
      
    
  })

   .state('user', {
    url: '/user',
    cache:false,
    views:{
      "main@":{

        templateUrl: 'user.html',
        controller: 'userCtrl'
      }
    }
        
      
    
  })

     .state('diagnosis', {
    url: '/diagnosis/:id',
    cache:false,
    views:{
      "main@":{

        templateUrl: 'diagnosis.html',
        controller: 'diagnosisCtrl'
      }
    }
      
    
  })



})
.run(["$rootScope","$state", "$window", function(rootScope,state,window){
  rootScope.$on('$stateChangeSuccess', 
function(event){
  console.log("statechange");
  window.scrollTo(0, 0);
})

}]);
