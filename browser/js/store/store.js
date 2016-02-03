app.config(function ($stateProvider) {
    $stateProvider.state('store', {
    	url: '/store',
    	templateUrl: 'js/store/store.html',
    	controller: 'StoreCtrl',
        data : { authenticate: true },
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

app.controller('StoreCtrl', function ($scope, $state, user, swags, SwagFactory, AuthService) {
    $scope.user = user;
    $scope.swags = swags;
    $scope.purchase = function(swag) {
        if (SwagFactory.purchase(user, swag) === 'unsuccessful purchase') {
            $scope.insufficientFunds = true;
        } 
    }
    $scope.logout = function () {
        AuthService.logout()
        .then(function () {
           $state.go('home');
        });
    };
});