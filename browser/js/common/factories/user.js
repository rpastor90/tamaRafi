app.factory('UserFactory', function($http, AuthService) {
    var userFactory = {};
    var cachedUser = {};

    userFactory.getUser = function() {
        return AuthService.getLoggedInUser()
        .then(function(user) {
            if (user) {
                return $http.get('/api/users/' + user._id)
                .then(function(foundUser) {
                    angular.copy(foundUser.data[0], cachedUser);
                    return cachedUser;
                });
            }
        });
    }

    userFactory.updateUser = function (user) {
        console.log("this is the user in update user", user);
        return $http.put('/api/users/' + user._id, user)
        .then(function (updatedUser) {
            angular.copy(updatedUser.data[0], cachedUser);
            return cachedUser;
        });
    }

    userFactory.makeAPurchase = function(user, swag) {
        if (user.animal.money >= swag.price) {
            return $http.put('/api/users/' + user._id + '/getSwag/' + swag._id)
                .then(function(purchase) {
                    angular.copy(purchase.data, cachedUser);
                    return cachedUser;
                })
        }
    };

    userFactory.addFriend = function(user, nameOfFriendToAdd) {
        return $http.put('/api/users/' + user._id + '/addFriend', nameOfFriendToAdd)
            .then(function(res) {

                console.log(res, "RES IN FACTORY", "should have friends on animal now")
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
