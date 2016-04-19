app.config(function ($stateProvider) {
    $stateProvider.state('store', {
    	url: '/store',
    	templateUrl: 'js/store/store.html',
    	controller: 'StoreCtrl',
        data : { authenticate: true },
    	resolve: {
    		swags: function(SwagFactory) {
                if (SwagFactory.getSwagCache().background) return SwagFactory.getSwagCache();
    			else return SwagFactory.fetchSwag()
    		},
    		user : function (AuthService, UserFactory) {
                return UserFactory.getUser();
            } 
    	}
    })
})

app.controller('StoreCtrl', function ($scope, $state, user, swags, AuthService) {
    $scope.user = user;
    $scope.swags = swags;

    $scope.logout = function () {
        AuthService.logout()
        .then(function () {
           $state.go('home');
        });
    };
});