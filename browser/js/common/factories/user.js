app.factory('UserFactory', function($http, AuthService, $rootScope) {
    var userFactory = {};
    var cachedUser = {};

    userFactory.getCachedUser = function () {
        return cachedUser;
    };

    userFactory.getUser = function() {
        return AuthService.getLoggedInUser()
        .then(function(user) {
            if (user) {
                return $http.get('/api/users/' + user._id)
                .then(function(foundUser) {
                    $rootScope.cardsLoading = false; 
                    angular.copy(foundUser.data[0], cachedUser);
                    return cachedUser;
                });
            }
        });
    };

    userFactory.updateUser = function (user) {
        return $http.put('/api/users/' + user._id, user)
        .then(function (updatedUser) {
            angular.copy(updatedUser.data[0], cachedUser);
            return cachedUser;
        });
    };

    userFactory.makeAPurchase = function(user, swag) {
        if (user.animal.money >= swag.price) {
            return $http.put('/api/users/' + user._id + '/getSwag/' + swag._id, swag)
            .then(function(purchase) {
                angular.copy(purchase.data, cachedUser);
                return cachedUser;
            })
        } else {
            alert("You don't got the green for this!");
        }
    };

    userFactory.addFriend = function(user, nameOfFriendToAdd) {
        return $http.put('/api/users/' + user._id + '/addFriend', nameOfFriendToAdd)
        .then(function(res) {
            return res.data;
        })
    };
    userFactory.addPost = function(user, post, friend) {
        var toSend = {};
        toSend.user = user;
        toSend.post = post;
        toSend.friend = friend;
        return $http.put('/api/users/' + user._id + '/addPost', toSend)
        .then(res => res.data)
    }

    return userFactory;
});
