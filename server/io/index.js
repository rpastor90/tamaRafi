'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {


    if (io) return io;

    io = socketio(server);

    // var movesHistory = {};
    var users = [];

    // console.log(io);

    io.on('connection', function (socket) {

      // var room;

      socket.on('disconnect', function () {
        console.log("I'm Out...");
        socket.disconnect();
      });

      socket.on('captureUser', function (capturedUser) {
        users.push(capturedUser);
        console.log("This is the captured user arr", users);
        socket.emit('getSomeUsers', users)
      })
      // console.log("this is the room", io.sockets)
      // socket.on('wantToJoinRoom', function (roomName) {
      //   room = roomName;
      //   socket.join(room);

      //   if(!movesHistory[room]) movesHistory[room] = [];

      //   socket.emit('movesHistory', movesHistory[room]);
      // });

      socket.on('moveLeft', function () {
        socket.emit('toTheLeftToTheLeft');
        socket.broadcast.emit('toTheLeftToTheLeft');
      });

      socket.on('moveRight', function () {
        socket.emit('toTheRightToTheRight');
        socket.broadcast.emit('toTheRightToTheRight');
      });

      socket.on('gameOver', function () {
        socket.destroy();
      })
       
        // Now have access to socket, wowzers!
    });
    
    return io;

};
