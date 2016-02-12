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
            return shelves;
        })
    };

    SwagFactory.fetchSwagByUser = function(user) {
        return $http.get('/api/users/' + user._id + '/getSwag')
        .then(function (res) {
            return res.data.animal.swags;
        });
    };

    SwagFactory.updateSwagPositions = function(swagPositions, user) {
        return $http.put('/api/users/' + user._id + '/updateCrib', swagPositions)
        .then(res => res.data)
    };

     SwagFactory.updateSwagSizes = function(swagSizes, user) {
        return $http.put('/api/users/' + user._id + '/updateCribSizes', swagSizes)
        .then(res => {
            return res.data
        });
    };

    return SwagFactory;
});
