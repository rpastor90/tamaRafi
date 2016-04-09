app.directive('swag', function(UserFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/swag/swag.html',
        link: function ($scope) {
            $scope.moreInfo = false;
            $scope.showMoreInfo = function() {
                $scope.moreInfo = $scope.moreInfo ? false : true;
            };
            $scope.purchase = function (user, swag) {
                UserFactory.makeAPurchase(user, swag)
                .then(function () {
                    console.log("User has made a purchase!");
                })
            }
        }
    };
});

app.factory('SwagFactory', function ($http) {
    var SwagFactory = {};
    var swagCache = {};
    var userSwagCache = [];

    SwagFactory.getSwagCache = () => {
        return swagCache;
    };

    SwagFactory.getUserSwagCache = () => {
        return userSwagCache;
    }

    SwagFactory.fetchSwag = function() {
        var shelves = {};
        return $http.get('/api/swags')
        .then(function(swags) {
            swags.data.forEach(function(swag) {
                if (!shelves[swag.category]) {
                    shelves[swag.category] = [];
                    shelves[swag.category].push(swag);
                } else {
                    shelves[swag.category].push(swag);
                }
            });
            angular.copy(shelves, swagCache);
            return swagCache;
        })
    };

    SwagFactory.fetchSwagByUser = function(user) {
        return $http.get('/api/users/' + user._id + '/getSwag')
        .then(res => {
            console.log("from the resolve block", res.data.animal.swags);
            angular.copy(res.data.animal.swags, userSwagCache);
            return userSwagCache;
        });
    };

    SwagFactory.updateCrib = function(swags, user) {
        return $http.put('/api/users/' + user._id + '/updateCrib', swags)
        .then(res => {
            console.log("we're updating the crib", res.data);
            userSwagCache = res.data;
            return userSwagCache;
        });
    };

    return SwagFactory;
});
