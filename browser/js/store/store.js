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
    		user : function (AuthService, UserFactory) {
                return AuthService.getLoggedInUser()
                    .then(function (user) {
                        return UserFactory.getUser(user);
                    })  
            } 
    	}
    })
})

app.controller('StoreCtrl', function ($scope, $state, user, swags, SwagFactory, AuthService, UserFactory) {
    $scope.user = user;
    $scope.swags = swags;

    $scope.logout = function () {
        AuthService.logout()
        .then(function () {
           $state.go('home');
        });
    };
});