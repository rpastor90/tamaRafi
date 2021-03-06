app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, UserFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                return UserFactory.getUser()
                .then(() => {
                    scope.user = UserFactory.getCachedUser();
                })
            };

            var removeUser = function () {
                scope.user = null;
            };
            
            // tooltip for navbar
            $('[data-toggle="tooltip"]').tooltip(); 

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});

app.filter('roundDown', function(){
    return function(input) {
        return Math.floor(input);
    }
});
