app.config(function ($stateProvider) {
  $stateProvider.state('game', {
    url: '/game',
    templateUrl: 'js/game/game.html',
    // controller: 'GameCtrl',
    resolve: {
      user: function (UserFactory) {
        return UserFactory.getUser();
      }
    }

  });
})
.controller('GameCtrl', function (user, $scope) {
  $scope.user = user;
  console.log("this is the game state user", user);
})