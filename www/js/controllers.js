angular.module('starter.controllers', [])

.controller('homeCtrl',["$scope",'$location','$window','ref','db','$state',function(scope,$location,$window,ref,db,state){
	var user=db.user();
	scope.shownav = false;
	if(!user)
	{
		console.log("not logged in");
		state.go("login");
		scope.shownav = false;
	}
	else
	{
		scope.shownav = true;
		console.log("logged in");
		console.log(user);
		//ref.unauth();
	}
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
				//scope.patientId = "test";
			    // console.log("typeof :" + scope.match(scope.patient.name))
			    scope.match(scope.patient.name);
		    
		}
		scope.match=function(name){
			 console.log("Hello match");
			    var ref = new Firebase("https://jikimu.firebaseio.com/users");
				ref.orderByChild("email").equalTo(name).on("child_added", function(snapshot) {
					console.log(snapshot.key());
				    scope.patientId = snapshot.key();
				    console.log(scope.patientId);
			    state.go('index.patients.details',{id:scope.patientId});


				      
    });
			

	}

		   
}])

.controller('patientdetailsCtrl',["$scope",'$stateParams','$window','ref','db','$state',
	function(scope,$stateParams,$window,ref,db,$state){
		scope.patient = {};
		if ($state.current.name==='index.patients.details'){
			console.log("Hi"); 

			scope.patientId=$stateParams.id;
			console.log("who");
			var ref =new Firebase('https://jikimu.firebaseio.com/users/' + scope.patientId).once('value', function(snap) {
   				console.log('I fetched a user!', snap.val());
   				scope.patient = snap.val();
   				scope.$apply();
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
				if (state.current.name==='index.patients.details'){
			// console.log("Hi"); 

					scope.patientId=$stateParams.id;
					// scope.lab = {"patientId":scope.patientId};
					console.log("who");
					var ref =new Firebase('https://jikimu.firebaseio.com/')

				var user=db.user();
				 	
				   var childRef = ref.child("lab").child(scope.patientId).push(scope.lab,function(er,dat)
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
				 state.go('index.results',{id:scope.patientId});

				
		}

}])
.controller('resultsCtrl',["$scope",'$stateParams','$window','ref','db','$state',
	function(scope,params,$window,ref,db,$state){
			scope.results = {};
		if ($state.current.name==='index.results'){
			console.log("ssup"); 

			var id=params.id;
			console.log("key",id);
			ref.child("lab").child(id).once("value",function(data){
				scope.results={};
				var d=[];
				data.forEach(function(data){
					d.push(data.val());
				});
				console.log("all labs",d);
				scope.results=d[0];
				scope.$apply();
				console.log("result",scope.results)

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

.controller('userCtrl',["$scope",'$location','$window','ref','$stateParams','$state',function(scope,$location,$window,ref,$stateParams,state){
	
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
	    		scope.usera.age=scope.usera.birthda
	    		;


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
							state.go('index.patients.details',{id:scope.patientId});

						}
	    		})
	    		console.log(data);
	    		scope.show("Registration successful");
	    	
	    }
	    console.log(scope.user);
	    
	  });
	}
		scope.match(scope.usera.name)
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
 		scope.match=function(name){
			 console.log("Hello match");
			    var ref = new Firebase("https://jikimu.firebaseio.com/users");
				ref.orderByKey().on("child_added", function(snapshot) {
					console.log(snapshot.key());
				    scope.patientId = snapshot.key();
			    state.go('index.patients.details',{id:scope.patientId});


				      
    });
			

	}		
	
}])


.controller('patientsCtrl',["$scope",'$stateParams','$window','ref','db','$state',
	function(scope,$stateParams,$window,ref,db,$state){
		scope.patients=[];
			console.log("controller");
			ref.child("lab").once('value', function(snap) {
   				//console.log('I fetched a user!', JSON.stringify(snap.val()));
   				scope.patients=[];
   				//console.log("labs",JSON.stringify(snap.val()));
   				snap.forEach(function(data){
   					var d= data.val();
   						console.log(data.key());
   						scope.name(data.key());
   					
   					
   				});
   		
   				
   			});

			scope.name=function(d){
				ref.child("users").child(d).once("value",function(data){
					var pat={};
					pat=data.val();
					pat.id=data.key();
					scope.patients.push(pat);
					//console.log("inner patients",scope.patients);
					scope.$apply();
				});
				console.log(scope.patients);
			

			}

			scope.diagnose=function(name){
			 console.log("Hello diagnose");
			  
				$state.go('index.diagnosis',{id:name});
			

	}
	


}])
.controller('loginCtrl',['$scope','ref','$state','db',"$sessionStorage","$rootScope" 
	,function(scope,ref,state,db,storage,root) {
	scope.login={};
	scope.data={};
	var user=db.user();
	if(user)
	{
		storage.uid=user.uid;
					storage.log="yes";
					ref.child("practioners").child(user.uid).once("value",function(snap){
						//details
						var data=snap.val();
						storage.occupation=data.occupation;
						console.log(data);
						root.occupation=data.occupation;

						if(data.occupation =="Doctor")
						{
							state.go("index.patients");
						}else if(data.occupation== "Nurse")
						{
							state.go("index.home");
						}
						else if(data.occupation == "Government")
						{
							state.go("index.report");
						}
						else if(data.occupation == "Admin")
						{
							state.go("index.home");
						}
						
					})
	
	}
	scope.login=function(){
	console.log("loggin");
	console.log(scope.data)
	if(scope.data.email == "" || scope.data.email == undefined)
	{
	console.log("username and password must be provided");
	}
	else
	{
		
		
		ref.authWithPassword(scope.data,function(error,data){

				if(error)
				{
					console.log("Erro "+error);

				}else
				{

					storage.uid=data.uid;
					storage.log="yes";
					ref.child("practioners").child(data.uid).once("value",function(snap){
						//details
						var data=snap.val();
						storage.occupation=data.occupation;
						console.log(data);
						root.occupation=data.occupation;

						if(data.occupation =="Doctor")
						{
							state.go("index.patients");
						}else if(data.occupation== "Nurse")
						{
							state.go("index.home");
						}
						else if(data.occupation == "Government")
						{
							state.go("index.report")
						}
						else if(data.occupation == "Admin")
						{
							state.go("index.home");
						}
						
						
						
					})
					// state.go("menu.home");

				}


		});
	}

	};

	}
])

.controller('diagnosisCtrl',["$scope",'$stateParams','$window','ref','db','$state',"$sessionStorage",
	function(scope,params,$window,ref,db,$state,storage,not){
		

		scope.results = {};
		scope.diagnosis = {};
		var labkey=params.id;
		scope.weights=[];
		scope.lbps=[];
		scope.hbps=[];
		scope.time=[];
		ref.child("weight").child(labkey).on("value",function(data){

			angular.forEach(data.val(),function(data,key){
			//	console.log("each",data);
				scope.weights.push([new Date(data.birthda).getTime(),data.wtvalue]);
			});	
			scope.$apply();
		});
		ref.child("bp").child(labkey).on("value",function(data){
			console.log("bps",data.val());
			angular.forEach(data.val(),function(data,key){
				scope.lbps.push(data.read);
				scope.hbps.push(data.reading);
				scope.time.push(new Date(data.birthda).toString());
			});
		});
		if ($state.current.name==='index.diagnosis'){
			console.log("Hi diagnosis"); 

			
			console.log("results");
			
			ref.child("lab").child(labkey).once("value",function(snap){
				var labs=[];
				var lab={};
				scope.g=false;
				scope.messa="";
				scope.type="danger";
				//console.log(lab);
				angular.forEach(snap.val(),function(data,key){
					//console.log(data);
					labs.push(data);
				});
				lab=labs[labs.length-1];
				scope.results=lab;
				if(lab.highbp >129 || lab.urine =="present")
				{
					console.log("bp alarming");
					scope.g=true;

				}
				else{
					console.log("bp good");
					
				}
				scope.$apply();
				console.log(lab);
			});
				  scope.diagnosissubmit = function() {
	  // 	var user=db.user();
			// // if(!user)
			// // 	{
			// // 		state.go("login");
			// // 	}
			// if(user)
			// {
				console.log("Hello diagnosis");
				var ref = new Firebase("https://jikimu.firebaseio.com/");
				console.log(scope.diagnosis);
				 	
				var childRef = ref.child("diagnosis").child(labkey).push(scope.diagnosis,function(er,dat)
				{
				if(!er)
				{
					console.log("diagnosis  successful");
					$state.go('index.patients')
				}
				else
				{
					console.log("Failed to update");
				}
				});
				scope.patientId = "test";
			    // console.log("typeof :" + scope.match(scope.patient.name))
			    
		    
		}

			// var ref = new Firebase("https://jikimu.firebaseio.com/user/");
			// ref.orderByChild("id").equalTo(scope.patientId).on("child_added", function(snapshot) {
			// 	    console.log(snapshot.val());
	  // 		})
				
		
		}
		else{
			console.log("Nothing");
		}
		

			 scope.highchartsNG = {
        options: {
            chart: {
                type: 'spline',
                  zoomType: 'x'
            },
             xAxis: {
               type: 'datetime'
            },
            plotOptions: {
            series: {
                dataLabels: {
                    enabled: false,
                    format: '{point.name}: {point.y} Kg',
                   
                },
                  color:"green"
            }
        },
            tooltip: {

            pointFormat: '<b>{series.name}</b>: <b>{point.y} Kg</b>'
        }
        },
        series: [{
        	name:"<b>Weight</b>",
            data: scope.weights
        }],
        title: {
            text: 'Weight'
        },
        loading: false
    }
    scope.highchartsbp = {
        options: {
            chart: {
                type: 'spline',
                  zoomType: 'x'
            },
             xAxis: {
               categories:scope.time,
               type:"datetime"

            },
            plotOptions: {
            series: {
                dataLabels: {
                    enabled: false,
                    format: '{point.name}: {point.y} mm Hg',
                   
                },
                  color:"green"
            }
        },
            tooltip: {

            pointFormat: '<b>{series.name}</b>: <b>{point.y} mm Hg</b>'
        }
        },
        series: [{
        	name:"<b>systolic</b>",
            data: scope.hbps
        },{
        	name:"<b>Dystolic</b>",
            data: scope.lbps
        }],
        title: {
            text: 'Blood Pressure'
        },
        loading: false
    }
	


}])
.controller('registerCtrl',["$scope",'$location','$window','ref','$stateParams','$state',function(scope,$location,$window,ref,$stateParams,state){
	
	scope.register = {};
	scope.registera={};

	  scope.register = function() {
	  	//alert("hello");
	
	 // 	console.log("betty");
	   if(scope.register.password != scope.cpassword)
	   {
		scope.er("Password Dont Match");
	   }
	   else
	   {
  	console.log("Registrating");

	    ref.createUser(scope.register

	    ,function(error,data){
	    	if(error)
	    	{
	    		console.log(error);
	    		scope.er(error.code);
	    	}else{
	  
	    		


	    		ref.child("practioners").child(data.uid).set(
	    			scope.registera
	    		);
	    		ref.authWithPassword(scope.register,function(er,data){
				if(er)
						{
							scope.er(er.code);

						}else
						{

							//scope.show("Logge");
							state.go('login');

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
	 					
	
	        };
    scope.er=function(data){

    }

	 
 				
	
}])
.controller("logoutCtrl",['$scope','ref','$state',"db",
	function(scope,ref,state,db){
	console.log("Logging out");
	ref.unauth();
	var user=db.user();
	if(user)
	{
		console.log(user);
		ref.unauth();

	}
	else
	{
		state.go("login");
	}
	
	}
])
.controller("navCtrl",["$scope","$sessionStorage","ref",
	function(scope,storage,re)
	{
		console.log("navCtrl connected ...********");
		console.log("occupation",storage.occupation);
		scope.oc=storage.occupation;
	}

])

.controller('reportCtrl',["$scope",'$location','$window','ref','$stateParams','db','$state',
	function(scope, $location, $window, ref, $stateParams,db,state){
			console.log("helllooooooo");
		
		scope.patients=function() {
				console.log("youuuuuu");
				var ref =new Firebase('https://jikimu.firebaseio.com/lab/').on('value', function(snapshot) {
					console.log("weweeeeee")
   				//console.log('I fetched a user!', JSON.stringify(snap.val()));
   				scope.patientno = snapshot.numChildren();
   				console.log(scope.patientno);

				})
				var ref = new Firebase("https://jikimu.firebaseio.com/practioners/");
				ref.orderByChild("occupation").equalTo("Doctor").on("child_added", function(snap) {
					// console.log(snapshot.key());
				    scope.docno = snap.numChildren();
				    console.log(scope.docno);
				})

			 // scope.ratio= parseInt((scope.patientNo(0))/(scope.docNo(0)));
			 // ratio = Math.abs(ratio);

			 // console.log(ratio);
			var ref = new Firebase("https://jikimu.firebaseio.com/srisk/");
				console.log("wallah");
				ref.orderByChild("hyper").equalTo("true").on('value', function(snap) {
					// console.log(snapshot.key());
				    scope.hyp = snap.numChildren();
				    console.log(scope.hyp);
				    // if(scope.hyp===true)
				    // {
				    // 	console.log(er);
				    // }
				    // else{
				    // 		var ref =new Firebase('https://jikimu.firebaseio.com/srisk/').on('value', function(snap)
				    // 		ref.orderByChild("age").on("child_added", function(snap)  {
				    // 			scope.age1= snap.val();
				    // 			console.log(scope.age1);
				    // 		})
				    // }
				}) 

				var ref = new Firebase("https://jikimu.firebaseio.com/users/");
				console.log("wallah1");
				ref.orderByChild("risk").equalTo("high").on('value', function(snap) {
					// console.log(snapshot.key());
				    scope.high = snap.numChildren();
				    console.log(scope.high);
				})
				var ref = new Firebase("https://jikimu.firebaseio.com/users/");
				console.log("wallah1");
				ref.orderByChild("risk").equalTo("low").on('value', function(snap) {
					// console.log(snapshot.key());
				    scope.low = snap.numChildren();
				    console.log(scope.low);
				})
				var ref = new Firebase("https://jikimu.firebaseio.com/users/");
				console.log("wallah1");
				ref.orderByChild("risk").equalTo("medium").on('value', function(snap) {
					// console.log(snapshot.key());
				    scope.medium = snap.numChildren();
				    console.log(scope.medium);
				})
			
		}
		scope.patients();	

		 scope.highchartsratio = {
        options: {
            chart: {chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Number of Doctors and Patients '
            },
            tooltip: {

            pointFormat: '<b>{series.name}</b>: <b>{point.percentage:.1f} Number</b>'
        }
        },
        plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
        series: [{
        	name:"<b>High</b>",
            data: [{
    			name:'patients',
            	y:scope.patientno
            },
            {
            	name: 'Doctors',
            	y:scope.docno

            }]
        }],
     }
	}
	 scope.highchartsrisk = {
        options: {
            chart: {chart: {
                
                type: 'spline'
            },
            title: {
                text: 'Risk Level '
            },
             xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
         yAxis: {
            title: {
                text: 'Snow depth (m)'
            },
            min: 0
        },
            tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} risk Level'
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },

        series: [{
        	name:"<b>High Risk Level</b>",
        	
            data: [scope.high]
        },{
        	name:"<b>medium Risk Level</b>",
        	
            data: [scope.medium]
        },{
        	name:"<b> Low Risk Level</b>",
        	
            data: [scope.low]
        }

        ],
     }
	}
}
    
	}])