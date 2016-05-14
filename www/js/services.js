angular.module('starter.services', []).factory('ref', [function(){
	
return new Firebase("https://jikimu.firebaseio.com/");
}])
.factory('db',function(){
	return{
		get:function(url){
			return new Firebase(url);
		},
		user:function()
		{
		return new Firebase("https://jikimu.firebaseio.com/").getAuth();

		}
	}
})

.service('BlankService', [function(){

}]);