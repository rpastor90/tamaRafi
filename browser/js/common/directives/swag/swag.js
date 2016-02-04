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
                console.log("SWAG PURCHSE FUNCTION RAN");
                UserFactory.makeAPurchase(user, swag)
                    .then(function (purchase) {
                        console.log("THIS IS A PURCHASE IN SWAG DIRECTIVE", purchase);
                    });
            }
        }
    };
});

app.factory('SwagFactory', function ($http, UserFactory) {
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
        console.log("SwagFactory.updateSwagPositions")
        return $http.put('/api/users/' + user._id + '/updateCrib', swagPositions)
            .then(res => res.data)
    };

     SwagFactory.updateSwagSizes = function(swagSizes, user) {
        console.log("SwagFactory.updateSwagSizes", swagSizes)
        return $http.put('/api/users/' + user._id + '/updateCribSizes', swagSizes)
            .then(res => {
                console.log("res.data:", res.data)
                return res.data
            });
    };

    return SwagFactory;
});
