angular.module('starter.controllers', [])

.controller('homeCtrl',["$scope",'$location','$window','ref','db','$state',function(scope,db,$location,$window,ref,state){
	scope.show=function(data){
		 				 popup.alert({
	  		  	              title: 'Success',
	  		  	              content: JSON.stringify(data)
	  		  	            }).then(function(res){
	  		  	
	  		  	              console.log('Test Alert Box');	  		  	             
	  		  	              // $location.path("menu.generalInfo") 
	  		  	            });
    			
				    		
    				
    					
	  		  	        };
			scope.er=function(){
					popup.alert({
					title:"Please Login",
					content:"You are not logged in !!"
				}).then(function(){

				});
			}
	 scope.patient = {};
	 console.log(scope.patient);

	  scope.submittest = function() {
	  // 	var user=db.user();
			// // if(!user)
			// // 	{
			// // 		state.go("login");
			// // 	}
			// if(user)
			// {
				console.log("Hello");
				var ref = new Firebase("https://jikimu.firebaseio.com/");
				console.log(scope.patient);
				 	
				    var childRef = ref.child("patient").push(scope.patient,function(er,dat)
				{
					if(!er)
					{
						console.log("labtest  successful");
					}
					else
					{
						console.log("Failed to update");
					}
				});
				scope.patientId = "test";
			    // console.log("typeof :" + scope.match(scope.patient.name))
			    scope.match(scope.patient.name);
		    
		}
		scope.match=function(name){
			 console.log("Hello match");
			    var ref = new Firebase("https://jikimu.firebaseio.com/users");
				ref.orderByChild("name").equalTo(name).on("child_added", function(snapshot) {
					console.log(snapshot.key());
				    scope.patientId = snapshot.key();
			    state.go('patients.details',{id:scope.patientId});


				      
    });
			

	}

		   
}])

.controller('patientdetailsCtrl',["$scope",'$stateParams','$window','ref','db','$state',
	function(scope,$stateParams,$window,ref,db,$state){
		scope.patient = {};
		if ($state.current.name==='patients.details'){
			console.log("Hi"); 

			scope.patientId=$stateParams.id;
			console.log("who");
			var ref =new Firebase('https://jikimu.firebaseio.com/users/' + scope.patientId).once('value', function(snap) {
   				console.log('I fetched a user!', snap.val());
   				scope.patient = snap.val();
});

			// var ref = new Firebase("https://jikimu.firebaseio.com/user/");
			// ref.orderByChild("id").equalTo(scope.patientId).on("child_added", function(snapshot) {
			// 	    console.log(snapshot.val());
	  // 		})
				
		
		}
		else{
			console.log("Nothing");
		}
	


}])
.controller('labCtrl',["$scope",'$location','$window','ref','$stateParams','db','$state',
	function(scope, $location, $window, ref, $stateParams,db,state){
	scope.show=function(data){
		 				 popup.alert({
	  		  	              title: 'Success',
	  		  	              content: JSON.stringify(data)
	  		  	            }).then(function(res){
	  		  	
	  		  	              console.log('Test Alert Box');	  		  	             
	  		  	              // $location.path("menu.generalInfo") 
	  		  	            });
    			
				    		
    				
    					
	  		  	        };
			scope.er=function(){
					popup.alert({
					title:"Please Login",
					content:"You are not logged in !!"
				}).then(function(){

				});
			}

	 scope.lab = {"patientId":"test"};
	 console.log(scope.lab);
	 if (scope.patientId){
			console.log("Hi state");
					scope.lab = {"patientId":scope.patientId};
					console.log($stateParams.id); 
			}

	  scope.submitlab = function() {
	  // 	var user=db.user();
			// // if(!user)
			// // 	{
			// // 		state.go("login");
			// // 	}
			// if(user)
			// {
				console.log("Hello");
				if (state.current.name==='patients.details'){
			// console.log("Hi"); 

					scope.patientId=$stateParams.id;
					// scope.lab = {"patientId":scope.patientId};
					console.log("who");
					var ref =new Firebase('https://jikimu.firebaseio.com/')

				
				 	
				   var childRef = ref.child("lab").push(scope.lab,function(er,dat)
				{
					if(!er)
					{
						console.log("Success");
						console.log(dat);
					}
					else
					{
						console.log("Failed to update");
					}
				});
				var labKey=childRef.key();
				console.log(labKey);
				}
				 console.log($stateParams.id);
				 console.log($stateParams);
				 state.go('results',{id:labKey});

				
		}

}])
.controller('resultsCtrl',["$scope",'$stateParams','$window','ref','db','$state',
	function(scope,$stateParams,$window,ref,db,$state){
			scope.results = {};
		if ($state.current.name==='results'){
			console.log("ssup"); 

			scope.labKey=$stateParams.id;
			console.log("results");
			var ref =new Firebase('https://jikimu.firebaseio.com/lab/' + scope.labKey).once('value', function(snap) {
   				console.log('I fetched a user!', snap.val());
   				scope.results = snap.val();
});

			// var ref = new Firebase("https://jikimu.firebaseio.com/user/");
			// ref.orderByChild("id").equalTo(scope.patientId).on("child_added", function(snapshot) {
			// 	    console.log(snapshot.val());
	  // 		})
				
		
		}
		else{
			console.log("Nothing");
		}
	


}])

.controller('userCtrl',["$scope",'$location','$window','ref','$state',function(scope,$location,$window,ref,state){
	
	scope.patientId=$stateParams.id;
	scope.user = {};
	scope.usera={};

	  scope.submituser = function() {
	  	//alert("hello");
	
	 // 	console.log("betty");
	   if(scope.user.password != scope.cpassword)
	   {
		scope.er("Password Dont Match");
	   }
	   else
	   {
  	console.log("Registrating");

	    ref.createUser(scope.user


	    ,function(error,data){
	    	if(error)
	    	{
	    		console.log(error);
	    		scope.er(error.code);
	    	}else{
	  
	    		scope.usera.birthda=scope.usera.birthday.toString();
	    		// scope.usera.age=age(scope.usera.birthday);


	    		ref.child("users").child(data.uid).set(
	    			scope.usera
	    		);
	    		ref.authWithPassword(scope.user,function(er,data){
				if(er)
						{
							scope.er(er.code);

						}else
						{

							//scope.show("Logge");
							state.go('patients.details',{id:scope.patienapshontId});

						}
	    		})
	    		console.log(data);
	    		scope.show("Registration successful");
	    	
	    }
	    console.log(scope.user);
	    
	  });
	}
	}
	   // if (response.success) {

    //                     FlashService.Success('Registration successful', true);
    //                     $location.path('/login');
    //                 } else {
    //                     FlashService.Error(response.message);
    //                     vm.dataLoading = false;
    //                 }

    scope.show=function(data){  
	 	 // popup.alert({
	   //            title: 'Success',
	   //            content: data
	   //          })
	 	 		// .then(function(res){
	
	     //          console.log('Test Alert Box');	  		  	             
	     //          // $location.path("menu.generalInfo") 
	     //        });   				
	
	        };
    scope.er=function(data){
//     	  popup.alert({
//   title: 'ERROR',
//   content: JSON.stringify(data)
// }).then(function(){
// $location.path('menu.generalInfo') {
  // console.log('Test Alert Box');              
	 // });

    }

	  // if(!$scope.submitlogin)
	  // {
	  
             

           
	  // }
	  
	  // $scope.showAlert=function(){
	  // 	  $ionicPopup.alert({
   //            title: 'Success',
   //            content: 'Hello World!!!'
   //          }).then(function(res) {
   //            console.log('Test Alert Box');
   //          });
	  // }
	      
	
}])


.controller('diagnosisCtrl',["$scope",'$stateParams','$window','ref','db','$state',
	function(scope,$stateParams,$window,ref,db,$state){
		
			var ref =new Firebase('https://jikimu.firebaseio.com/patient/').on('value', function(snap) {
   				//console.log('I fetched a user!', JSON.stringify(snap.val()));
   				var bp_object = snap.val();
		
		scope.patients=[]
		//console.log(bp_object);
		var keys = Object.keys(bp_object);
		console.log(keys);
		for (var i =0; i < keys.length; i++) {
			console.log(bp_object[keys[i]]);
			var da=new Date(bp_object[keys[i]].birthda).getTime();
			scope.$apply(function(){
				scope.patients.push(bp_object[keys[i]]);	
			})
		console.log(scope.patients);
			//scope.mapData2.push( [da , parseInt(bp_object[keys[i]].bpvalue.toFixed(1)) ]);
			//console.log("pairdata2", JSON.stringify(scope.mapData2));
		}
});

			// var ref = new Firebase("https://jikimu.firebaseio.com/user/");
			// ref.orderByChild("id").equalTo(scope.patientId).on("child_added", function(snapshot) {
			// 	    console.log(snapshot.val());
	  // 		})
				
		
		
		// else{
		// 	console.log("Nothing");
		// }
	


}])
.controller('loginCtrl',['$scope','$ionicPopup','ref','$state','db' ,function(scope,popup,ref,state,db) {
scope.login={};
var user=db.user();
if(user)
{
state.go("home");
}



scope.login=function(){
	console.log("loggin");
if(!scope.data.email)
{
scope.er("username and password must be provided");
}
else
{
	
	
ref.authWithPassword(scope.data,function(error,data){

		if(error)
		{
			scope.er("Erro "+error);

		}else
		{

			scope.show("Login successful");
			state.go("menu.home");

		}


});
}

};
 scope.show=function(data){
		 				 popup.alert({
	  		  	              title: 'Success',
	  		  	              content: JSON.stringify(data)
	  		  	            }).then(function(res){
	  		  	
	  		  	              console.log('Test Alert Box');	  		  	             
	  		  	              // $location.path("menu.generalInfo") 
	  		  	            });
    			
				    		
    				
    					
	  		  	        };
	  		  	        scope.er=function(data){
	  		  	        	  popup.alert({
				              title: 'ERROR',
				              content: data
				            }).then(function(){
				// $location.path('menu.generalInfo') {
				              console.log('Test Alert Box');              
           					 });

	  		  	        }
}])

	// 	var ref = new Firebase("https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");

	// // Attach an asynchronous callback to read the data at our posts reference
	// ref.on("value", function(snapshot) {
	//   ref.on("value", function(snapshot) {
	//   console.log(snapshot.val());
	// }, function (errorObject) {
	//   console.log("The read failed: " + errorObject.code);
	// });