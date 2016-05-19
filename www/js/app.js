// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ui.router','ui-notification','firebase','highcharts-ng','starter.controllers','starter.services','ngStorage'])
 .config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'up'
        });
    })
.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
    $urlRouterProvider.otherwise('/');
    // $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix("!");
  // Ionic uses AngularUI Router which uses the concept of stateses
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $stateProvider

  .state('index', {
    url: '/',
    cache:false,
    views:{
      "navbar":{
        templateUrl: 'navbar.html',
        controller:"navCtrl"
        
      }
    }
  })
        
     .state('index.home', {
    url: 'home',
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
    cache:false,
    views:{
      "main@":{
       templateUrl: 'login.html',
       controller: 'loginCtrl'  
      }
    }
    
  })

  .state('registration', {
    url: '/registration',
    cache:false,
    views:{
      "main@":{
       templateUrl: 'registration.html',
       controller: 'registerCtrl'  
      }
    }
    
  })
  .state('index.reports', {
    url: 'reports',
    cache:false,
    views:{
      "main@":{

        templateUrl: 'reports.html',
        controller: 'reportCtrl'
      }
    }
        
      
    
  })

  .state('index.patients.details', {
    url: 'details/:id',
    cache:false,
    views:{
      "main@":{

        templateUrl: 'patientdetails.html',
        controller: 'patientdetailsCtrl'
      }
    }
      
    
  })

  .state('index.results', {
    url: 'details/results/:id',
    cache:false,
    views:{
      "main@":{

        templateUrl: 'results.html',
        controller: 'resultsCtrl'
      }
    }
      
    
  })

   .state('index.user', {
    url: 'user',
    cache:false,
    views:{
      "main@":{

        templateUrl: 'user.html',
        controller: 'userCtrl'
      }
    }
        
      
    
  })

     .state('index.patients', {
    url: 'patients',
    cache:false,
    views:{
      "main@":{

        templateUrl: 'patients.html',
        controller: 'patientsCtrl'
      }
    }
      
    
  })
    .state('index.diagnosis', {
    url: 'diagnosis/:id',
    cache:false,
    views:{
      "main@":{

        templateUrl: 'diagnosis.html',
        controller: 'diagnosisCtrl'
      }
    }
      
    
  })
      .state('index.labresults', {
    url: 'results',
    cache:false,
    views:{
      "main@":{

        templateUrl: 'patientdetails.html',
        controller: 'patientdetailsCtrl'
      }
    }
      
    
  })
      .state('index.report', {
    url: 'reports',
    cache:false,
    views:{
      "main@":{

        templateUrl: 'results.html',
        controller: 'patientdetailsCtrl'
      }
    }
      
    
  })
    .state('logout', {
    url: '/logout',
    cache:false,
    views:{
      "main@":{

        templateUrl: 'login.html',
        controller: 'logoutCtrl'
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
