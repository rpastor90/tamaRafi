app.config(function ($stateProvider) {

    $stateProvider.state('crib', {
        url: '/crib',
        templateUrl: 'js/crib/crib.html',
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser()
                .then(function (user) {
                    return user;
                });
            }
        }
    });

});

app.factory('CribFactory', function () {
    var CribFactory = {};
    return CribFactory;
});