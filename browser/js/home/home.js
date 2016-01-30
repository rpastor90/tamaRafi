app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function($scope, $http, user) {
        	console.log("in controller")
        	$scope.testing = function() {

        		var obj = {
        					startTime: '10:00',
        					duration: 30000000,
        					date: '2016-01-20'
        		};
        		console.log(user, "USER")
        		$http.post('/api/users/' + user._id + '/sleep/timeseries', obj)
        		.then(res => {console.log("res")})

        	}
        },
        resolve: {
        	user: function (AuthService) {
                   return AuthService.getLoggedInUser()
                    .then(function (user) {
                            return user;
                        })
        		}
    	}
    });
});
