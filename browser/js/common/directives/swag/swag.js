app.directive('swag', function() {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/swag/swag.html',
        link: function($scope) {
            $scope.moreInfo = false;
            $scope.showMoreInfo = function() {
                $scope.moreInfo = $scope.moreInfo ? false : true;
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


    SwagFactory.purchase = function(user, swag) {
        if (user.animal.money >= swag.price) {
            return $http.put('/api/users/' + user._id + '/getSwag/' + swag._id)
            .then(function(purchase) {
                if (purchase === 'User not found!') return 'You must be logged in to make a purchase.'
                return purchase.data;
            })
        } else {
            return 'unsuccessful purchase';
        }
    }
    return SwagFactory;
});
