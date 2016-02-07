app.factory('UserFactory', function ($http, AuthService) {
	var userFactory = {};
	var cachedUser = {};

	userFactory.getUser = function () {
		return AuthService.getLoggedInUser()
    .then(function (user) {
      if (user){
        return $http.get('/api/users/' + user._id)
    		.then(function (foundUser) {
    			angular.copy(foundUser.data[0], cachedUser);
    			return cachedUser;
    		});
      }
    });
	}

	userFactory.makeAPurchase = function (user, swag) {
        if (user.animal.money >= swag.price) {
            return $http.put('/api/users/' + user._id + '/getSwag/' + swag._id)
            .then(function (purchase) {
            	angular.copy(purchase.data, cachedUser);
                return cachedUser;
            })
        }
    };

    userFactory.addFriend = function(user, nameOfFriendToAdd) {
    	return $http.put('/api/users/' + user._id + '/addFriend', nameOfFriendToAdd)
    	.then(function(res) {
    		console.log(res, "RES IN FACTORY")
    	})
    }

	return userFactory;
});

