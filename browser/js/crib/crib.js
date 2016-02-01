app.config(function ($stateProvider) {

    $stateProvider.state('crib', {
        url: '/crib',
        templateUrl: 'js/crib/crib.html',
        controller: 'CribCtrl',
        resolve: {
            user: function (AuthService, $state) {
                return AuthService.getLoggedInUser()
                .then(function (user) {
                    if (user) {
                        return user;
                    } else {
                        $state.go('home');
                    }
                });
            }
        }
    });

});

app.factory('CribFactory', function () {
    var CribFactory = {};

    return CribFactory;
});

app.controller('CribCtrl', function ($scope, $state, user, AuthService) {
    $scope.user = user;

    if (!user) {

    }

    $scope.logout = function () {
        AuthService.logout()
        .then(function () {
           $state.go('home');
        });
    };
});