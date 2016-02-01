app.config(function ($stateProvider) {
    $stateProvider.state('rewards', {
    	url: '/rewards',
    	templateUrl: 'js/rewards/rewards.html',
    	controller: function($scope, swags, AnimalFactory, user){
    		console.log(swags)
    		console.log(user, "USER")
    		$scope.swags = swags;
    		$scope.purchase = function(swag) {
    			if (AnimalFactory.purchase(user, swag) === 'unsuccessful purchase') {
    				$scope.insufficientFunds = true;
    			} 
    		}
    		
    	},
    	resolve: {
    		swags: function(AnimalFactory) {
    			return AnimalFactory.fetchSwag()
    		},
    		user : function (AuthService) {
                return AuthService.getLoggedInUser()  
               } 
    	}
    })
})