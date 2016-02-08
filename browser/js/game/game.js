app.config(function ($stateProvider) {
  $stateProvider.state('game', {
    url: '/game',
    templateUrl: 'js/game/game.html',
    controller: 'GameCtrl',
    resolve: {
      user: function (UserFactory) {
        return UserFactory.getUser();
      }
    },
  });
})
.controller('GameCtrl', function ($scope, socket, user) {
  // Socket listeners
  // ================
  socket.on('connect', function () {
    var room = 'room';

    // socket.emit('wantToJoinRoom', room)

    socket.emit('connection');
    var leftChar = $('.left-char');
    var rightChar = $('.right-char');
    var gameContainer = $('.gameContainer');

    $('body').keydown(function (e) {
        if (e.keyCode === 37) {
          socket.emit('moveLeft');
        }
        if (e.keyCode === 39) {
          socket.emit('moveRight');
        }
    });

    socket.on('toTheLeftToTheLeft', function () {
      var pos = gameContainer.css('left');
      var change = (+pos.slice(0, -2) - 5).toString() + "px";
      gameContainer.css('left', change);
    });
    socket.on('toTheRightToTheRight', function () {
      var pos = gameContainer.css('left');
      console.log(pos);
      var change = (+pos.slice(0, -2) + 5).toString() + "px";
      gameContainer.css('left', change);
    });
  });
});
