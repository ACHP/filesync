'use strict';
angular.module('FileSync')
  .factory('SocketIOService', ['io', '_', '$timeout', function(io, _, $timeout) {
    var socket = io();
    var _onFileChanged = _.noop;
    var _onVisibilityStatesChanged = _.noop;

    socket.on('connect', function() {
      console.log('connected');
      var nickname = prompt('Nickname?');
      var color = "#" + Math.random().toString(16).slice(2, 8);
      socket.emit('viewer:new', {'nickname':nickname, 'color':color});
    });



    socket.on('file:changed', function(filename, timestamp, content, comments) {
      $timeout(function() {
        _onFileChanged(filename, timestamp, content, comments);
      });
    });

    socket.on('users:visibility-states', function(states) {
      $timeout(function() {
        _onVisibilityStatesChanged(states);
      });
    });



    socket.on('error:auth', function(err) {
      // @todo yeurk
      alert(err);
    });

    return {

      sendComment: function(edit, newComment){
        console.log("socketIoService sendComment");
        socket.emit('comment:newComment', {edit, newComment});
      },
      sendMessage : function(message){
        socket.emit('newMessage', message);
      },

      onComment: function(f){
        socket.on('comments:updated', f);
      },

      onMessage: function(f){
        socket.on('messages:updated', f);
      },

      onViewersUpdated: function(f) {
        socket.on('viewers:updated', f);
      },

      onFileChanged: function(f) {
        _onFileChanged = f;
      },

      onVisibilityStatesChanged: function(f) {
        _onVisibilityStatesChanged = f;
      },

      userChangedState: function(state) {
        socket.emit('user-visibility:changed', state);
      }
    };
  }]);
