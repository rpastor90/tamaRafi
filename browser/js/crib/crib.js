app.config(function ($stateProvider) {

    $stateProvider.state('crib', {
        url: '/crib',
        templateUrl: 'js/crib/crib.html',
        controller: 'CribCtrl',
        data : { authenticate: true },
        resolve: {
            user: function (AuthService, $state) {
                return AuthService.getLoggedInUser();
            },
            swags: function(AnimalFactory, AuthService) {
                return AuthService.getLoggedInUser()
                .then(function(user) {
                    return AnimalFactory.fetchSwagByUser(user)
                })  
            }
        }
    });

});

app.factory('CribFactory', function () {
    var CribFactory = {};

    return CribFactory;
});

app.controller('CribCtrl', function ($scope, $state, user, AuthService, swags, AnimalFactory) {
    $scope.user = user;

    $scope.swags = swags;
    console.log(swags)
    $scope.logout = function () {
        AuthService.logout()
        .then(function () {
           $state.go('home');
        });
    };

    $scope.startCallback = function() {
        console.log("hello");
    };
    
   
});