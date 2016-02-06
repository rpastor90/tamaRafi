app.config(function ($stateProvider) {
  $stateProvider.state('game', {
    url: '/game',
    templateUrl: 'js/game/game.html',
    controller: 'GameCtrl',
    resolve: {
      user: function (UserFactory) {
        return UserFactory.getUser();
      }
    }
  });
})
.controller('GameCtrl', function ($scope, socket, user) {

  // Socket listeners
  // ================
  socket.on('connection', function () {
    socket.emit('connection');
  })

});
