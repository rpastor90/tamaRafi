app.config(function ($stateProvider) {
  $stateProvider.state('health', {
    url: '/health',
    templateUrl: 'js/health/health.html',
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

app.controller('HealthCtrl', function (user) {
})

