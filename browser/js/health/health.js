app.config(function ($stateProvider) {
  $stateProvider.state('health', {
    url: '/health',
    templateUrl: 'js/health/health.html',
    controller: 'HealthCtrl',
    data : { authenticate: true },
    resolve: {
      user: function (AuthService) {
          return AuthService.getLoggedInUser()
          .then(function (user) {
              return user;
          });
      }
    },
    controller: function ($scope, $state, user, AuthService) {
      $scope.user = user;
      $scope.steps = 1000;
      $scope.goalSteps = 10000;
      var difference = ($scope.goalSteps - $scope.steps);
      $scope.percentDiff = ($scope.steps/$scope.goalSteps) * 100;

      $scope.logout = function() {
          AuthService.logout()
          .then(function() {
              $state.go('home');
          });
      };
      $scope.labels = ["Progress To Goal", "Difference to Goal"];
      $scope.data = [$scope.steps, difference];
      // document.body.className = "health-state";
    }

  });
});