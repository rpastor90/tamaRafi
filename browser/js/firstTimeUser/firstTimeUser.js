app.config(function ($stateProvider) {
    $stateProvider.state('firstTimeUser', {
        url: '/welcome',
        templateUrl: 'js/firstTimeUser/firstTimeUser.html',
        controller: function (FirstTimeUserFactory, $scope) {
          $scope.update = FirstTimeUserFactory.update;
        }
    });
});
app.factory('FirstTimeUserFactory', function ($http, AuthService) {
  var FirstTimeUserFactory = {};

  FirstTimeUserFactory.update = function (animal) {
    return AuthService.getLoggedInUser()
        .then(function(user) {
            return user;
        })
        .then(function (user) {
          $http.put('/api/users/' + user._id, animal)
          .then(function (updatedUser) {
            console.log("THIS is the updated updatedUser from the frontend", updatedUser);
            return updatedUser;
          });
        });
  };

  return FirstTimeUserFactory;
});
