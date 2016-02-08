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
  // socket.removeListener('connect');
  socket.on('connect', function () {
    var room = 'room';

    // socket.emit('wantToJoinRoom', room)

    socket.emit('connection');
    socket.emit('captureUser', user)
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

    socket.on('getSomeUsers', function (users) {
      console.log(users);
      leftChar.css('background-image', "url('" + users[0].animal.picture + "')");
      leftChar.css('height', users[0].animal.animateStyle.height);
      leftChar.css('width', users[0].animal.animateStyle.width);
    })

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
  console.log("this is the frontend Socket", socket)
});
