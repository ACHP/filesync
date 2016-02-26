'use strict';
angular
  .module('FileSync')
  .controller('MessageCtrl', ['$scope','MessageService','SocketIOService',function($scope, MessageService, SocketIOService) {

    this.listMessages = MessageService.listMessages;
    this.message;

    function onMessage(messages){
          this.listMessages = messages;
          $scope.$apply();
      };

    this.sendMessage = function(){
      MessageService.sendMessage(this.message);
      this.message = "";
    }

    SocketIOService.onMessage(onMessage.bind(this));
  }]);
