app.config(function ($stateProvider) {

    $stateProvider.state('crib', {
        url: '/crib',
        templateUrl: 'js/crib/crib.html',
        resolve: {
            user: function (AuthService, $state) {
                return AuthService.getLoggedInUser()
                .then(function (user) {
                    return user;
                });
            }
        }
    });

});

app.factory('CribFactory', function ($http, AuthService) {
    var CribFactoryFactory = {};
    return CribFactory;
});