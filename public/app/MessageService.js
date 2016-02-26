'use strict';
angular.module('FileSync')
  .factory('MessageService', function (SocketIOService, _) {
    var listMessages = [];

    return {
      listMessages: listMessages,
      sendMessage : function sendMessage(message){
        console.log("sendMessage : " + message);
        SocketIOService.sendMessage(message);
      }
    };
  });
