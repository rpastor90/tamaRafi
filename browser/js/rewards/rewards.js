app.config(function ($stateProvider) {
    $stateProvider.state('rewards', {
    	url: '/rewards',
    	templateUrl: 'js/rewards/rewards.html',
    	controller: function($scope, swags, UserFactory, user){
    		$scope.swags = swags;
    		UserFactory.makeAPurchase = function(swag) {
    			if (UserFactory.makeAPurchase(user, swag) === 'unsuccessful purchase') {
    				$scope.insufficientFunds = true;
    			} 
    		}
    		
    	},
    	resolve: {
    		swags: function(SwagFactory) {
    			return SwagFactory.fetchSwag()
    		},
    		user : function (AuthService) {
                return AuthService.getLoggedInUser()  
               } 
    	}
    })
})