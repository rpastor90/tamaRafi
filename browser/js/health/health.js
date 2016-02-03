app.config(function ($stateProvider) {
  $stateProvider.state('health', {
    url: '/health',
    templateUrl: 'js/health/health.html',
    controller: 'HealthCtrl',
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

app.controller('HealthCtrl', function ($scope, $state, user, AuthService) {
    
    $scope.user = user;

    $scope.logout = function() {
        AuthService.logout()
        .then(function() {
            $state.go('home');
        });
    };

});